import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Send, ArrowLeft, Layers, Sparkles, Github, Linkedin, MapPin } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { theme } = useTheme()

  if (submitted) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="brutal-card text-center max-w-md mx-auto p-10">
            <div className="w-16 h-16 bg-brutal-green border-2 border-foreground flex items-center justify-center mx-auto mb-6 brutal-shadow">
              <Mail className="w-8 h-8 text-brutal-ink" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-3 text-foreground">
              Pesan Terkirim!
            </h2>
            <p className="mb-8 leading-relaxed font-bold text-muted-foreground">
              Terima kasih telah menghubungi saya. Saya akan segera kembali kepada Anda.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="brutal-btn-solid w-full"
            >
              Kirim Pesan Lagi
            </button>
          </div>
        </div>
      </div>
    )
  }

  const inputClass = `w-full px-4 py-3 border-2 border-foreground bg-card text-foreground placeholder:text-muted-foreground outline-none focus:bg-brutal-yellow/20 transition-colors font-bold`

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-36 pb-20">
        {/* Back Button & Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-wide border-2 border-foreground bg-card text-foreground brutal-shadow-sm hover:-translate-y-0.5 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <div className="space-y-4 mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-foreground bg-brutal-red text-white brutal-shadow-sm font-black text-[10px] tracking-widest uppercase">
              <Sparkles size={12} />
              Hubungi Saya
            </div>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground`}>
              Mari Berkolaborasi<span className="text-brutal-red">.</span>
            </h1>
            <p className={`text-lg font-bold leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
              Punya ide proyek atau ingin bekerja sama? Isi formulir di bawah ini atau hubungi saya melalui media sosial.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="brutal-card p-8">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-foreground">Kirim Pesan</h2>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const formData = new FormData(form)
                fetch('/contact.html', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams(
                    formData as unknown as Record<string, string>,
                  ).toString(),
                })
                  .then(() => setSubmitted(true))
              }}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-black uppercase tracking-wide mb-2 text-foreground"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={inputClass}
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-black uppercase tracking-wide mb-2 text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder="email@contoh.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-black uppercase tracking-wide mb-2 text-foreground"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                className="brutal-btn-solid w-full !py-4"
              >
                <Send size={18} />
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-brutal-purple border-2 border-foreground p-8 brutal-shadow-lg">
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-white">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border-2 border-foreground flex items-center justify-center flex-shrink-0 brutal-shadow-sm">
                    <Mail size={20} className="text-brutal-purple" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase mb-1 text-white">Email</h3>
                    <a href="mailto:gwidoputra@gmail.com" className="text-white/80 hover:text-white transition-colors font-bold">
                      gwidoputra@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border-2 border-foreground flex items-center justify-center flex-shrink-0 brutal-shadow-sm">
                    <MapPin size={20} className="text-brutal-red" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase mb-1 text-white">Lokasi</h3>
                    <p className="text-white/80 font-bold">Malang, Jawa Timur</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="brutal-card p-8">
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-foreground">Terhubung</h2>
              <div className="flex gap-4">
                <a
                  href="https://github.com/GwidoPutra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-foreground bg-card text-foreground hover:bg-brutal-ink hover:text-white transition-colors brutal-shadow-sm"
                >
                  <Github size={24} />
                  <span className="font-black uppercase">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/gwido-putra-wijaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-foreground bg-card text-foreground hover:bg-brutal-blue hover:text-white transition-colors brutal-shadow-sm"
                >
                  <Linkedin size={24} />
                  <span className="font-black uppercase">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
