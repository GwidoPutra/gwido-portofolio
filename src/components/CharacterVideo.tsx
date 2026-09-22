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

void main() {
  vec4 color = texture2D(u_sampler, v_texCoord);

  // Chroma-key out the solid #00FF00 background.
  // A pixel is "green background" when its green channel clearly dominates
  // both red and blue. The character (brown skin, dark hair, black hoodie,
  // black glasses) never has such a dominant green, so it is preserved.
  float greenDominance = color.g - max(color.r, color.b);

  // Soft edge: fully opaque below threshold, fully transparent above.
  float alpha = 1.0 - smoothstep(0.08, 0.45, greenDominance);

  // Despill: pull residual green back toward the non-green channels at edges
  // so the hair/hoodie outline does not pick up a green fringe.
  float spill = smoothstep(0.08, 0.45, greenDominance);
  vec3 despilled = vec3(
    color.r,
    mix(color.g, max(color.r, color.b), spill),
    color.b
  );

  gl_FragColor = vec4(despilled, alpha);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
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
 * 3D animated mascot.
 *
 * Renders the opaque `character-green.mp4` (solid #00FF00 background) through a
 * WebGL chroma-key shader that removes the green background in real time.
 *
 * Ukuran dinamis: rasio canvas diambil dari rasio asli video (videoWidth /
 * videoHeight), jadi tinggi elemen mengikuti lebar container (responsif) dan
 * seluruh frame video (termasuk rambut) selalu tampil utuh lewat `object-contain`.
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
    gl.uniform1i(samplerLocation, 0)

    // Video texture.
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Samakan drawing buffer dengan resolusi asli video, lalu set rasio CSS
    // canvas mengikuti video supaya ukurannya dinamis & tidak terdistorsi.
    const syncCanvasSize = () => {
      const w = video.videoWidth
      const h = video.videoHeight
      if (!w || !h) return
      if (canvas.width !== w) canvas.width = w
      if (canvas.height !== h) canvas.height = h
      gl.viewport(0, 0, w, h)
      setAspect(`${w} / ${h}`)
    }
    video.addEventListener('loadedmetadata', syncCanvasSize)
    // Metadata bisa saja sudah termuat sebelum listener terpasang (cache).
    syncCanvasSize()

    let rafId = 0

    const render = () => {
      rafId = requestAnimationFrame(render)

      // Only draw once the video has decoded a frame.
      if (video.readyState < 2) return

      try {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      } catch {
        // Frame not available yet; retry next tick.
        return
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // Autoplay retry (muted playback may be blocked until a gesture).
    let attempts = 0
    const tryPlay = () => {
      attempts += 1
      video.play().catch(() => {
        if (attempts < 5) setTimeout(tryPlay, 300 * attempts)
      })
    }
    tryPlay()

    render()

    return () => {
      cancelAnimationFrame(rafId)
      video.removeEventListener('loadedmetadata', syncCanvasSize)
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
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/character-green.mp4" type="video/mp4" />
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