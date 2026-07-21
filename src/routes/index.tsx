import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn } from '../components/ui/animations/FadeIn'
import { TextReveal } from '../components/ui/animations/TextReveal'
import { ProfileCard } from '../components/ui/animations/ProfileCard'
import { Lightfall } from '../components/ui/animations/Lightfall'
import { CLITerminal } from '../components/CLITerminal'
import { TechStackGrid } from '../components/BouncingTechStack'
import { ResumeModal } from '../components/ResumeModal'
import {
  Smartphone,
  Globe,
  Database,
  CheckCircle2,
  BarChart,
  Code2,
  X,
  FolderOpen,
  Github,
  ExternalLink,
  FileText,
  Layers,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Linkedin,
  Menu,
  Sun,
  Moon,
  MessageCircle,
  Send,
  Hash,
  Quote,
  AtSign,
} from 'lucide-react'
import { toast } from 'sonner'
import { useTheme } from '../contexts/ThemeContext'

// 1. Registrasi Rute ke TanStack Router
export const Route = createFileRoute('/')({
  component: CompanyProfile,
})

// Data Layanan Utama (Services)
const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Pengembangan aplikasi web responsif berkinerja tinggi dengan arsitektur modern (React, Next.js, Node.js) yang dirancang untuk skalabilitas dan pengalaman pengguna maksimal.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Pembuatan aplikasi lintas platform (cross-platform) untuk iOS dan Android yang mulus, stabil, dan intuitif menggunakan teknologi terdepan.',
  },
  {
    icon: Database,
    title: 'System Architecture',
    description: 'Perancangan basis data dan infrastruktur backend (API, Cloud) yang aman, efisien, serta siap melayani beban trafik yang masif.',
  },
]

// Data Nilai Perusahaan (Values)
const values = [
  {
    icon: CheckCircle2,
    title: 'Inovasi Berkelanjutan',
    description: 'Saya terus mengadopsi tumpukan teknologi terbaru untuk memastikan produk Anda tidak tertinggal zaman.',
  },
  {
    icon: BarChart,
    title: 'Berorientasi Bisnis',
    description: 'Solusi yang saya bangun berfokus penuh pada penyelesaian masalah dan pencapaian target bisnis Anda.',
  },
  {
    icon: Code2,
    title: 'Kualitas Kode Industri',
    description: 'Setiap baris kode ditulis dengan standar industri terbaik demi keamanan dan kemudahan pemeliharaan.',
  },
]

// 2. Komponen Modal Portofolio
function ProjectsModal({ onClose }: { onClose: () => void }) {
  const handleUnderDevelopment = (type: string) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: 'Fitur ini masih dalam tahap pengerjaan.',
      duration: 3000
    })
  }

  const { theme } = useTheme()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    
    return () => { 
      document.body.style.overflow = '' 
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`flex items-start justify-between p-8 pb-6 border-b shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-blue-600 text-[10px] font-black tracking-widest uppercase transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
              <Sparkles size={12} /> Portofolio Karya
            </div>
            <h2 className={`text-3xl font-black transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Projects<span className="text-blue-600">.</span>
            </h2>
            <p className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Eksplorasi solusi digital melalui kode.</p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'}`}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((project) => (
              <div
                key={project._meta.path}
                className={`group flex flex-col rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl transition-all shadow-sm ${theme === 'dark' ? 'bg-slate-800 text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400' : 'bg-white text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50'}`}>
                      <FolderOpen size={20} />
                    </div>
                    {/* Indikator Status Proyek */}
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse`}></span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Available</span>
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed line-clamp-2 mb-4 font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400 bg-slate-800 border border-slate-700' : 'text-slate-500 bg-white border border-slate-200'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={`pt-4 border-t flex gap-5 transition-colors duration-300 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-[10px] font-black transition-colors tracking-widest uppercase ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    <button onClick={() => handleUnderDevelopment('Live Demo')}
                      className={`flex items-center gap-1.5 text-[10px] font-black transition-colors tracking-widest uppercase ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}>
                      <ExternalLink size={14} /> Live Demo
                    </button>
                    <button onClick={() => handleUnderDevelopment('Dokumentasi')}
                      className={`flex items-center gap-1.5 text-[10px] font-black transition-colors tracking-widest uppercase ${theme === 'dark' ? 'text-slate-400 hover:text-green-400' : 'text-slate-400 hover:text-green-600'}`}>
                      <FileText size={14} /> Docs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className={`text-center text-xs font-bold uppercase tracking-widest mt-8 pt-8 border-t transition-colors duration-300 ${theme === 'dark' ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-100'}`}>
            Total {allProjects.length} Proyek Terdaftar
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface Note {
  id: string
  name: string
  message: string
  formattedDate: string
}

// 3. Komponen Utama Halaman Utama
function CompanyProfile() {
  const featuredProjects = allProjects.slice(0, 3);
  const [showProjects, setShowProjects] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const [notes, setNotes] = useState<Note[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/guestbook')
      .then((res) => res.json())
      .then((data) => {
        if (data.notes && data.notes.length > 0) {
          setNotes(data.notes)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleGuestbookSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    if (!trimmedName || !trimmedMessage) {
      toast.error('Harap isi nama dan pesan')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setNotes((prev) => [data.note, ...prev])
      setName('')
      setMessage('')
      toast.success('Catatanmu berhasil ditambahkan!')
    } catch {
      setNotes((prev) => [{
        id: Date.now().toString(),
        name: trimmedName,
        message: trimmedMessage,
        formattedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      }, ...prev])
      setName('')
      setMessage('')
      toast.success('Catatanmu berhasil ditambahkan!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'} selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-500/20 dark:selection:text-blue-200`}>

      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${theme === 'dark' ? 'bg-[#020617]/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Layers className="text-white w-5 h-5" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>gwidoputra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Layanan</a>
            <a href="#expertise" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>TechStack</a>
            <a href="#portfolio" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Portofolio</a>
            <button onClick={() => setShowResume(true)} className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Short Resume</button>
            <Link to="/contact" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Kontak</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="mailto:gwidoputra@gmail.com" className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md dark:bg-slate-800 dark:hover:bg-blue-600">
              Hubungi Saya
            </a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b overflow-hidden ${theme === 'dark' ? 'bg-[#020617] border-slate-800' : 'bg-white border-slate-100'}`}
            >
              <div className="px-6 py-4 space-y-3">
                <a 
                  href="#services" 
                  className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Layanan
                </a>
                <a 
                  href="#expertise" 
                  className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  TechStack
                </a>
                <a 
                  href="#portfolio" 
                  className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portofolio
                </a>
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowResume(true) }}
                  className={`block w-full text-left py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  Short Resume
                </button>
                <Link 
                  to="/contact" 
                  className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontak
                </Link>
                <a 
                  href="mailto:gwidoputra@gmail.com" 
                  className={`block w-full text-center px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md mt-4 ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600 text-white' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}
                >
                  Hubungi Saya
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 md:pt-52 md:pb-32 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none dark:bg-blue-600/10" />

        {/* Animasi Kanvas Efek Lightfall */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Lightfall
            beamCount={16}
            beamColor="37,99,235"
            speed={0.3}
            className="opacity-40"
          />
        </div>

        {/* Konten Utama di atas Kanvas */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <FadeIn delay={0.2}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 rounded-full border text-blue-600 text-[10px] md:text-xs font-semibold tracking-wide shadow-sm uppercase transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                  Digital Transformation Partner
                </div>
              </FadeIn>

              <h1 className={`text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <TextReveal text="Saya Membangun" /> <br />
                <TextReveal text="Masa Depan Digital." className="text-blue-600 dark:text-blue-400" />
              </h1>

              <FadeIn delay={0.4}>
                <p className={`text-base md:text-lg leading-relaxed max-w-xl font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Sebagai konsultan dan pengembang perangkat lunak independen, saya mentransformasi visi bisnis Anda menjadi produk digital yang kuat, terukur, dan berpusat pada pengguna.
                </p>
              </FadeIn>

              <FadeIn delay={0.6} className="flex flex-col sm:flex-row gap-3 pt-4">
                <a href="mailto:gwidoputra@gmail.com" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold shadow-lg shadow-blue-600/20">
                  Jadwalkan Diskusi <ArrowRight size={16} />
                </a>
                <a href="#portfolio" className={`flex items-center justify-center gap-2 transition-colors px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold border shadow-sm ${theme === 'dark' ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}>
                  Lihat Karya Saya
                </a>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="hidden md:flex lg:flex justify-center items-center">
              <ProfileCard
                name="Gwido Putra Wijaya"
                title="Software Engineer"
                location="Malang, Jawa Timur"
                imageSrc="/profile.JPG"
                githubUrl="https://github.com/GwidoPutra"
                linkedinUrl="https://linkedin.com/in/gwido-putra-wijaya"
                badge="Available for Work"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className={`border-y py-12 relative z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617] border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Proyek Selesai', value: '6+' },
              { label: 'Tahun Berinovasi', value: '2+' },
              { label: 'Teknologi Dikuasai', value: '15+' },
              { label: 'Dukungan Teknis', value: '24/7' },
            ].map((metric, idx) => (
              <FadeIn key={metric.label} delay={idx * 0.1} className="text-center px-4">
                <p className={`text-3xl md:text-4xl font-extrabold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{metric.value}</p>
                <p className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{metric.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-32 relative z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Layanan Utama</h2>
            <h3 className={`text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Solusi End-to-End untuk Kebutuhan IT Anda</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <FadeIn key={service.title} delay={idx * 0.2} direction="up" className={`p-10 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow group transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <service.icon size={28} />
                </div>
                <h4 className={`text-xl font-bold mb-4 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{service.title}</h4>
                <p className={`leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{service.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="expertise" className={`py-32 overflow-hidden relative z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left" className="space-y-8">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Kenapa Memilih Saya</h2>
              <h3 className={`text-4xl font-bold leading-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Mendorong Pertumbuhan Melalui Arsitektur Berkinerja Tinggi
              </h3>
              <p className={`text-lg leading-relaxed font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Saya tidak sekadar menulis kode. Saya merancang arsitektur sistem yang selaras dengan tujuan operasional Anda, memastikan setiap aplikasi dapat ditingkatkan skalanya seiring berkembangnya bisnis Anda.
              </p>
              <div className="space-y-6 pt-4">
                {values.map((value, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 text-blue-600 bg-blue-50 dark:bg-blue-500/10 p-1 rounded-full"><value.icon size={16} /></div>
                    <div>
                      <h4 className={`font-bold mb-1 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{value.title}</h4>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-teal-50 blur-3xl -z-10 rounded-full opacity-50 dark:from-blue-600/10 dark:to-cyan-600/10" />
              <FadeIn delay={0.2} direction="up" className="space-y-4 pt-12">
                <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-white border dark:border-slate-700">
                  <Database className="w-10 h-10 text-blue-400 mb-6" />
                  <h4 className="font-bold mb-2">Data Security</h4>
                  <p className="text-sm text-slate-400">Penerapan standar keamanan tertinggi pada infrastruktur cloud.</p>
                </div>
                <div className={`p-8 rounded-2xl shadow-xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <Code2 className="w-10 h-10 text-blue-600 mb-6" />
                  <h4 className={`font-bold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Modern Stack</h4>
                  <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Teknologi mutakhir untuk performa aplikasi maksimal.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4} direction="up" className="space-y-4">
                <div className={`p-8 rounded-2xl shadow-xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <Smartphone className="w-10 h-10 text-blue-600 mb-6" />
                  <h4 className={`font-bold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Mobile First</h4>
                  <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Pengalaman antarmuka yang optimal di segala jenis perangkat.</p>
                </div>
                <div className="bg-blue-600 p-8 rounded-2xl shadow-xl text-white">
                  <BarChart className="w-10 h-10 text-white/80 mb-6" />
                  <h4 className="font-bold mb-2">Analytics</h4>
                  <p className="text-sm text-blue-100">Integrasi dasbor dan pelaporan data secara real-time.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className={`py-32 relative z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Tech Stack</h2>
            <h3 className={`text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Technology I Work With
            </h3>
            <p className={`text-lg leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Check out the tools and technologies I use (click around for fun!)
            </p>
          </div>

          <TechStackGrid />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-slate-900 text-white relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm">Studi Kasus</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Proyek Terbaru</h3>
            </div>
            <button onClick={() => setShowProjects(true)} className="flex items-center gap-2 text-white hover:text-blue-400 font-semibold transition-colors pb-2 border-b border-white/20 hover:border-blue-400">
              Lihat Semua Portofolio <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <FadeIn key={project.title} delay={idx * 0.1} direction="up" className="group flex flex-col h-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-colors">
                <div className="p-8 pb-6 flex-1">
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-slate-300 bg-slate-700/50 px-3 py-1.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" className={`py-32 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Guestbook</h2>
            <h3 className={`text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Tinggalkan Jejak<span className="text-blue-600">.</span>
            </h3>
            <p className={`text-lg leading-relaxed font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Tulis pesan, salam, atau roast — semua orang bisa baca.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`rounded-3xl shadow-lg border overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className={`px-8 py-6 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <MessageCircle size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Guestbook</h2>
                      <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                        {notes.length} notes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`animate-pulse rounded-2xl p-5 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                        <div className={`h-3 w-20 rounded mb-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />
                        <div className={`h-4 w-3/4 rounded mb-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />
                        <div className={`h-3 w-24 rounded ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />
                      </div>
                    ))}
                  </div>
                ) : notes.length === 0 ? (
                  <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    <MessageCircle size={40} className="mx-auto mb-4 opacity-40" />
                    <p className="text-sm font-semibold">Belum ada catatan</p>
                    <p className="text-xs mt-1">Jadilah yang pertama!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className={`group rounded-2xl p-5 border transition-all hover:shadow-md ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black uppercase shrink-0 ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                              {note.name.charAt(0)}
                            </div>
                            <span className={`text-sm font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{note.name}</span>
                          </div>
                          <span className={`text-[10px] font-semibold shrink-0 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{note.formattedDate}</span>
                        </div>
                        <p className={`mt-3 text-sm leading-relaxed font-medium pl-10.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{note.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={`rounded-3xl shadow-lg border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className={`px-8 py-6 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <Hash size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Leave a Note</h2>
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Katakan sesuatu...</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleGuestbookSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="gb-name" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      YOUR NAME <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <AtSign size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                      <input id="gb-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Rivera" maxLength={50}
                        className={`w-full pl-9 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gb-message" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      YOUR NOTE <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Quote size={14} className={`absolute left-3.5 top-3.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                      <textarea id="gb-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice... or roast me 😄" maxLength={500} rows={4}
                        className={`w-full pl-9 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`} />
                    </div>
                    <p className={`text-[10px] font-medium mt-1.5 text-right ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{message.length}/500</p>
                  </div>

                  <button type="submit" disabled={submitting}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg text-sm ${submitting ? 'opacity-60 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600 text-white' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}>
                    <Send size={16} />
                    {submitting ? 'Mengirim...' : 'Post Note'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-32 bg-blue-600 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Siap untuk mendigitalisasi bisnis Anda?
          </h2>
          <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto">
            Jadwalkan konsultasi gratis hari ini. Saya akan membantu Anda merumuskan teknologi yang tepat untuk eskalasi bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:gwidoputra@gmail.com" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 text-lg">
              Hubungi Saya
            </a>
            <button onClick={() => setShowResume(true)} className="bg-transparent text-white border-2 border-blue-400 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition-all text-lg">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Layers className="text-blue-500 w-6 h-6" />
                <span className="text-xl font-bold tracking-tight text-white">gwidoputra</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed">
                Menyediakan layanan pengembangan perangkat lunak inovatif dan solusi IT khusus untuk bisnis di era digital.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigasi</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Layanan Utama</a></li>
                <li><a href="#expertise" className="hover:text-blue-400 transition-colors">TechStack</a></li>
                <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Studi Kasus</a></li>
                <li><button onClick={() => setShowResume(true)} className="hover:text-blue-400 transition-colors">Short Resume</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Kontak</h4>
              <ul className="space-y-4 text-sm">
                <li>Email: gwidoputra@gmail.com</li>
                <li>Lokasi: Malang, Jawa Timur</li>
                <li className="pt-4 flex gap-4">
                  <a href="https://linkedin.com/in/gwido-putra-wijaya" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                  <a href="https://github.com/GwidoPutra" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
            <p>© {new Date().getFullYear()} GP (Gwido Putra Wijaya). All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Render */}
      <AnimatePresence>
        {showProjects && <ProjectsModal onClose={() => setShowProjects(false)} />}
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>
      
      {/* Interactive Components */}
      <CLITerminal />

    </div>
  )
}