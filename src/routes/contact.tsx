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
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
        <Navbar />
        
        <div className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className={`text-center max-w-md mx-auto rounded-3xl p-8 shadow-lg border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className={`text-2xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Pesan Terkirim!
            </h2>
            <p className={`mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Terima kasih telah menghubungi saya. Saya akan segera kembali kepada Anda.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-colors ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600 text-white' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}
            >
              Kirim Pesan Lagi
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Back Button & Header */}
        <div className="mb-12">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl shadow-sm hover:border-blue-500 hover:text-blue-600 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
              <Sparkles size={12} />
              Hubungi Saya
            </div>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Mari Berkolaborasi<span className="text-blue-600">.</span>
            </h1>
            <p className={`text-lg font-medium leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Punya ide proyek atau ingin bekerja sama? Isi formulir di bawah ini atau hubungi saya melalui media sosial.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`rounded-3xl p-8 shadow-lg border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Kirim Pesan</h2>
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
                  className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
                  placeholder="email@contoh.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-colors shadow-lg ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}
              >
                <Send size={18} />
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg">
              <h2 className="text-xl font-bold mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:gwidoputra@gmail.com" className="text-blue-100 hover:text-white transition-colors">
                      gwidoputra@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Lokasi</h3>
                    <p className="text-blue-100">Malang, Jawa Timur</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl border shadow-lg ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Terhubung</h2>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/GwidoPutra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border border transition-all hover:border-blue-500 hover:bg-blue-50 dark:bg-blue-500/10 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                >
                  <Github size={24} className={theme === 'dark' ? 'text-slate-400 group-hover:text-blue-600 transition-colors' : 'text-slate-600 group-hover:text-blue-600 transition-colors'} />
                  <span className={`font-semibold hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/gwido-putra-wijaya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border border transition-all hover:border-blue-500 hover:bg-blue-50 dark:bg-blue-500/10 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                >
                  <Linkedin size={24} className={`${theme === 'dark' ? 'text-slate-400 group-hover:text-blue-600 transition-colors' : 'text-slate-600 group-hover:text-blue-600 transition-colors'}`} />
                  <span className={`font-semibold hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
