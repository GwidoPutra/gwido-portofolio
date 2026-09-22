import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Send, ArrowLeft, Sparkles, Github, Linkedin, MapPin } from 'lucide-react'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />

        <div className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="surface-card-base text-center max-w-md mx-auto p-10">
            <div className="w-16 h-16 bg-accent text-accent-foreground border border-border rounded-lg flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-3 text-foreground">
              Pesan Terkirim!
            </h2>
            <p className="mb-8 leading-relaxed font-normal text-muted-foreground">
              Terima kasih telah menghubungi saya. Saya akan segera kembali kepada Anda.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-solid w-full"
            >
              Kirim Pesan Lagi
            </button>
          </div>
        </div>
      </div>
    )
  }

  const inputClass = `w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all font-normal`

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-36 pb-20">
        {/* Back Button & Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <div className="space-y-4 mt-8">
            <div className="mono-label border-accent/50 text-accent">
              <Sparkles size={12} />
              Hubungi Saya
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold tracking-tight text-foreground`}>
              Mari Berkolaborasi<span className="text-accent">.</span>
            </h1>
            <p className={`text-lg font-normal leading-relaxed max-w-2xl text-muted-foreground`}>
              Punya ide proyek atau ingin bekerja sama? Isi formulir di bawah ini atau hubungi saya melalui media sosial.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="surface-card-base p-8">
            <h2 className="text-xl font-bold tracking-tight mb-6 text-foreground">Kirim Pesan</h2>
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
                  className="block text-sm font-medium tracking-tight mb-2 text-foreground"
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
                  className="block text-sm font-medium tracking-tight mb-2 text-foreground"
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
                  className="block text-sm font-medium tracking-tight mb-2 text-foreground"
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
                className="btn-solid w-full !py-4"
              >
                <Send size={18} />
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="surface-card-base p-8">
              <h2 className="text-xl font-bold tracking-tight mb-6 text-foreground">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg border border-border bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold tracking-tight mb-1 text-foreground">Email</h3>
                    <a href="mailto:gwidoputra@gmail.com" className="text-muted-foreground hover:text-accent transition-colors font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md">
                      gwidoputra@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg border border-border bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold tracking-tight mb-1 text-foreground">Lokasi</h3>
                    <p className="text-muted-foreground font-normal">Malang, Jawa Timur</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card-base p-8">
              <h2 className="text-xl font-bold tracking-tight mb-6 text-foreground">Terhubung</h2>
              <div className="flex gap-4">
                <a
                  href="https://github.com/GwidoPutra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Github size={24} />
                  <span className="font-medium">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/gwido-putra-wijaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Linkedin size={24} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
