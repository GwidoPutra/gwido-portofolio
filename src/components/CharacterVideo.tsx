import { useEffect, useRef, useState } from 'react'

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = vec2((a_position.x + 1.0) * 0.5, (1.0 - a_position.y) * 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_sampler;
uniform vec3 u_keyColor;
uniform float u_threshold;
uniform float u_feather;

void main() {
  vec4 color = texture2D(u_sampler, v_texCoord);

  // Keying berbasis jarak warna: background video ini gelap & netral
  // (#333B42), jadi teknik "green dominance" lama tidak bisa dipakai —
  // rambut & hoodie karakter juga gelap dan akan ikut terpotong.
  float dist = length(color.rgb - u_keyColor);

  // Soft edge: transparan di dalam radius key, opak di luar feather.
  float alpha = smoothstep(u_threshold - u_feather, u_threshold + u_feather, dist);

  gl_FragColor = vec4(color.rgb, alpha);
}
`

const compileShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Failed to create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('Shader compile failed: ' + log)
  }
  return shader
}

/**
 * Timeline arah pandang (x = kiri/kanan, y = atas/bawah, rentang -1..1).
 *
 * Video ini adalah SATU lintasan kontinu berbentuk lingkaran/oval — bukan grid
 * arah 2D penuh. Titik seperti (x = -0.9, y = -0.9) tidak ada di video, jadi
 * kita hanya mencari titik pada lintasan yang PALING DEKAT dengan arah cursor.
 * t = 9.5 hampir sama dengan t = 0.0, sehingga loop menyambung dengan mulus.
 */
const GAZE_TIMELINE: { t: number; x: number; y: number }[] = [
  { t: 0.0, x: 0.05, y: -0.3 },
  { t: 0.5, x: -0.3, y: -0.4 },
  { t: 1.0, x: -0.5, y: -0.5 },
  { t: 1.5, x: -0.6, y: -0.4 },
  { t: 2.0, x: -0.7, y: -0.2 },
  { t: 2.5, x: -0.6, y: 0.0 },
  { t: 3.0, x: -0.5, y: 0.2 },
  { t: 3.5, x: -0.3, y: 0.4 },
  { t: 4.0, x: 0.0, y: 0.5 },
  { t: 4.5, x: 0.3, y: 0.4 },
  { t: 5.0, x: 0.6, y: 0.1 },
  { t: 5.5, x: 0.6, y: -0.2 },
  { t: 6.0, x: 0.5, y: -0.4 },
  { t: 6.5, x: 0.4, y: -0.4 },
  { t: 7.0, x: 0.2, y: -0.5 },
  { t: 7.5, x: 0.0, y: -0.5 },
  { t: 8.0, x: -0.1, y: -0.4 },
  { t: 8.5, x: 0.0, y: -0.3 },
  { t: 9.0, x: 0.0, y: -0.3 },
  { t: 9.5, x: 0.0, y: -0.3 },
]

// Pose netral (senyum default) — dipakai saat cursor keluar window / touch device.
const NEUTRAL_GAZE = { x: 0.0, y: -0.3 }

// Cari titik pada timeline yang paling dekat dengan arah (nx, ny).
const nearestTimeFor = (nx: number, ny: number): number => {
  let bestTime = GAZE_TIMELINE[0].t
  let bestDist = Infinity
  for (const point of GAZE_TIMELINE) {
    const dx = point.x - nx
    const dy = point.y - ny
    const dist = dx * dx + dy * dy
    if (dist < bestDist) {
      bestDist = dist
      bestTime = point.t
    }
  }
  return bestTime
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/**
 * Mascot 3D interaktif dengan cursor-driven video scrubbing.
 *
 * `character.webm` berisi satu lintasan animasi kepala+mata menoleh yang utuh.
 * Alih-alih diputar autoplay-loop, frame dipilih manual: arah cursor dipetakan
 * ke waktu video terdekat pada GAZE_TIMELINE, lalu `video.currentTime` di-seek
 * secara halus (smoothing sirkular) di dalam rAF loop yang sama.
 *
 * Background flat solid dihilangkan lewat chroma-key WebGL berbasis jarak warna,
 * dengan warna referensi background di-sampling langsung dari frame pertama.
 */
export function CharacterVideo({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Fallback sebelum metadata video terbaca.
  const [aspect, setAspect] = useState('16 / 9')

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    })
    if (!gl) return

    // --- program setup ---
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Program link failed: ' + gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)

    // Full-screen quad.
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const samplerLocation = gl.getUniformLocation(program, 'u_sampler')
    const keyColorLocation = gl.getUniformLocation(program, 'u_keyColor')
    const thresholdLocation = gl.getUniformLocation(program, 'u_threshold')
    const featherLocation = gl.getUniformLocation(program, 'u_feather')
    gl.uniform1i(samplerLocation, 0)
    // Nilai awal; akan diperbarui presisi setelah background di-sampling.
    gl.uniform3f(keyColorLocation, 51 / 255, 59 / 255, 66 / 255)
    gl.uniform1f(thresholdLocation, 0.12)
    gl.uniform1f(featherLocation, 0.06)

    // Video texture.
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    // Samakan drawing buffer dengan resolusi asli video, lalu set rasio CSS
    // canvas mengikuti video supaya ukurannya dinamis & tidak terdistorsi.
    let duration = 0
    const syncCanvasSize = () => {
      const w = video.videoWidth
      const h = video.videoHeight
      if (!w || !h) return
      if (canvas.width !== w) canvas.width = w
      if (canvas.height !== h) canvas.height = h
      gl.viewport(0, 0, w, h)
      setAspect(`${w} / ${h}`)
    }

    // Sampling warna background presisi dari beberapa pixel pojok frame pertama.
    const sampleKeyColor = () => {
      try {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      } catch {
        return
      }
      const w = video.videoWidth
      const h = video.videoHeight
      if (!w || !h) return
      // Empat pojok, agak ke dalam supaya tidak kena artefak tepi codec.
      const points: [number, number][] = [
        [2, 2],
        [w - 3, 2],
        [2, h - 3],
        [w - 3, h - 3],
      ]
      const pixels = new Uint8Array(4)
      let r = 0
      let g = 0
      let b = 0
      for (const [px, py] of points) {
        // Buffer WebGL tidak ter-flip, jadi y dibaca dari atas.
        gl.readPixels(px, py, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
        r += pixels[0]
        g += pixels[1]
        b += pixels[2]
      }
      const n = points.length
      gl.uniform3f(keyColorLocation, r / n / 255, g / n / 255, b / n / 255)
    }

    // Persiapan scrubbing: putar sekali lalu pause agar siap di-seek manual
    // (terutama iOS Safari), lalu simpan durasi video.
    let prepared = false
    const prepareScrubbing = () => {
      if (prepared) return
      if (video.readyState < 2) return
      prepared = true
      duration = video.duration || 0
      syncCanvasSize()
      sampleKeyColor()
      const p = video.play()
      if (p && typeof p.then === 'function') {
        p.then(() => {
          video.pause()
          video.currentTime = 0
        }).catch(() => {
          /* Autoplay diblokir: frame tetap tersedia untuk di-seek. */
        })
      } else {
        video.pause()
      }
    }

    video.addEventListener('loadedmetadata', syncCanvasSize)
    video.addEventListener('loadeddata', prepareScrubbing)
    video.addEventListener('canplay', prepareScrubbing)
    // Metadata/frame bisa saja sudah termuat sebelum listener terpasang (cache).
    syncCanvasSize()
    prepareScrubbing()

    // --- Tracking cursor ---
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let targetTime = 0
    let currentSmoothedTime = 0
    let hasPointer = false

    // Posisi cursor relatif terhadap area video yang benar-benar tampil
    // (letterbox `object-contain`), dinormalisasi ke -1..1 terhadap pusat wajah
    // karakter yang kira-kira berada di sepertiga atas canvas.
    const FACE_CENTER_V = 0.34
    const updateCursorTarget = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const videoAspect = (video.videoWidth || 16) / (video.videoHeight || 9)
      const boxAspect = rect.width / rect.height
      // Area video aktual di dalam canvas (object-contain).
      let dispW = rect.width
      let dispH = rect.height
      if (boxAspect > videoAspect) {
        dispW = rect.height * videoAspect
      } else {
        dispH = rect.width / videoAspect
      }
      const offsetX = (rect.width - dispW) / 2
      const offsetY = (rect.height - dispH) / 2

      // Posisi cursor dalam 0..1 relatif area video (bisa keluar sedikit).
      const u = (clientX - rect.left - offsetX) / dispW
      const v = (clientY - rect.top - offsetY) / dispH

      const nx = clamp(u * 2 - 1, -1, 1)
      const ny = clamp((v - FACE_CENTER_V) * 2, -1, 1)

      targetTime = nearestTimeFor(nx, ny)
      hasPointer = true
    }

    const onPointerMove = (e: PointerEvent) => {
      if (reducedMotion.matches) return
      updateCursorTarget(e.clientX, e.clientY)
    }
    const onPointerLeave = () => {
      hasPointer = false
      targetTime = nearestTimeFor(NEUTRAL_GAZE.x, NEUTRAL_GAZE.y)
    }

    if (finePointer.matches && !reducedMotion.matches) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('blur', onPointerLeave)
      document.addEventListener('pointerleave', onPointerLeave)
    }

    let rafId = 0

    const render = () => {
      rafId = requestAnimationFrame(render)

      // Hanya gambar setelah video siap (minimal metadata + frame pertama).
      if (video.readyState < 2 || !prepared) return

      if (duration > 0) {
        if (reducedMotion.matches) {
          currentSmoothedTime = 0
          targetTime = 0
        } else {
          if (!hasPointer) targetTime = nearestTimeFor(NEUTRAL_GAZE.x, NEUTRAL_GAZE.y)
          // Smoothing sirkular: pilih arah terpendek melewati batas loop 0↔duration.
          let diff = targetTime - currentSmoothedTime
          if (diff > duration / 2) diff -= duration
          if (diff < -duration / 2) diff += duration
          currentSmoothedTime = (currentSmoothedTime + diff * 0.1 + duration) % duration
        }

        // Seek hanya jika perbedaannya cukup besar, agar tidak stutter.
        if (Math.abs(video.currentTime - currentSmoothedTime) > 0.015) {
          video.currentTime = currentSmoothedTime
        }
      }

      try {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      } catch {
        // Frame belum tersedia; coba lagi tick berikutnya.
        return
      }

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      video.removeEventListener('loadedmetadata', syncCanvasSize)
      video.removeEventListener('loadeddata', prepareScrubbing)
      video.removeEventListener('canplay', prepareScrubbing)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', onPointerLeave)
      document.removeEventListener('pointerleave', onPointerLeave)
      gl.deleteTexture(texture)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/character.webm" type="video/webm" />
      </video>
      <canvas
        ref={canvasRef}
        className={className}
        style={{ aspectRatio: aspect }}
        aria-label="3D animated character mascot"
      />
    </>
  )
}
