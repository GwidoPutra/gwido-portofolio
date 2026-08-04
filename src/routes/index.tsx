import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn } from '../components/ui/animations/FadeIn'
import { TextReveal } from '../components/ui/animations/TextReveal'
import { ProfileCard } from '../components/ui/animations/ProfileCard'
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
    cardClass: 'brutal-card-yellow',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Pembuatan aplikasi lintas platform (cross-platform) untuk iOS dan Android yang mulus, stabil, dan intuitif menggunakan teknologi terdepan.',
    cardClass: 'brutal-card-blue',
  },
  {
    icon: Database,
    title: 'System Architecture',
    description: 'Perancangan basis data dan infrastruktur backend (API, Cloud) yang aman, efisien, serta siap melayani beban trafik yang masif.',
    cardClass: 'brutal-card-purple',
  },
]

// Data Nilai Perusahaan (Values)
const values = [
  {
    icon: CheckCircle2,
    title: 'Inovasi Berkelanjutan',
    description: 'Saya terus mengadopsi tumpukan teknologi terbaru untuk memastikan produk Anda tidak tertinggal zaman.',
    cardClass: 'bg-brutal-yellow',
  },
  {
    icon: BarChart,
    title: 'Berorientasi Bisnis',
    description: 'Solusi yang saya bangun berfokus penuh pada penyelesaian masalah dan pencapaian target bisnis Anda.',
    cardClass: 'bg-brutal-cyan',
  },
  {
    icon: Code2,
    title: 'Kualitas Kode Industri',
    description: 'Setiap baris kode ditulis dengan standar industri terbaik demi keamanan dan kemudahan pemeliharaan.',
    cardClass: 'bg-brutal-green',
  },
]

const tickerItems = [
  'WEB DEVELOPMENT',
  'MOBILE SOLUTIONS',
  'SYSTEM ARCHITECTURE',
  'UI/UX DESIGN',
  'AI INTEGRATION',
  'FULL-STACK ENGINEERING',
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

  const badgeBg = theme === 'dark' ? 'bg-brutal-red' : 'bg-brutal-red'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-brutal-ink/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="brutal-card w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-8 pb-6 border-b-2 border-foreground shrink-0 bg-brutal-yellow">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-brutal-ink text-brutal-yellow px-3 py-1 font-black text-[10px] tracking-widest uppercase">
              <Sparkles size={12} /> Portofolio Karya
            </div>
            <h2 className="text-3xl font-black text-brutal-ink uppercase tracking-tight">
              Projects<span className="text-brutal-red">.</span>
            </h2>
            <p className="text-sm font-bold text-brutal-ink/70">Eksplorasi solusi digital melalui kode.</p>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-foreground bg-card text-foreground p-2 font-black transition-all"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-8 flex-1 bg-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((project, idx) => (
              <div
                key={project._meta.path}
                className="group flex flex-col border-2 border-foreground bg-card hover:-translate-y-1 transition-all duration-200"
                style={{ boxShadow: idx % 3 === 0 ? '6px 6px 0 0 var(--border)' : '4px 4px 0 0 var(--border)' }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 border-2 border-foreground bg-brutal-yellow text-brutal-ink">
                      <FolderOpen size={20} />
                    </div>
                    {/* Indikator Status Proyek */}
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-brutal-green animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brutal-green">Available</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-foreground group-hover:text-brutal-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2 mb-4 font-bold text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="brutal-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={`pt-4 border-t-2 border-foreground flex gap-5 ${theme === 'dark' ? 'border-muted' : 'border-muted'}`}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-black transition-colors tracking-widest uppercase text-muted-foreground hover:text-foreground">
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    <button onClick={() => handleUnderDevelopment('Live Demo')}
                      className="flex items-center gap-1.5 text-[10px] font-black transition-colors tracking-widest uppercase text-muted-foreground hover:text-brutal-blue">
                      <ExternalLink size={14} /> Live Demo
                    </button>
                    <button onClick={() => handleUnderDevelopment('Dokumentasi')}
                      className="flex items-center gap-1.5 text-[10px] font-black transition-colors tracking-widest uppercase text-muted-foreground hover:text-brutal-green">
                      <FileText size={14} /> Docs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-black uppercase tracking-widest mt-8 pt-8 border-t-2 border-foreground text-muted-foreground">
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
  const featuredProjects = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ].slice(0, 3)
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
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load guestbook')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data.notes)) {
          setNotes(data.notes)
        }
      })
      .catch(() => {
        toast.error('Gagal memuat guestbook')
      })
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
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save note')
      }
      if (!data.note) {
        throw new Error('Invalid response from server')
      }
      setNotes((prev) => [data.note, ...prev])
      setName('')
      setMessage('')
      toast.success('Catatanmu berhasil ditambahkan!')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan catatan'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = `w-full pl-10 pr-4 py-3 border-2 border-foreground bg-card text-foreground placeholder:text-muted-foreground outline-none focus:bg-brutal-yellow/20 transition-colors text-sm font-bold`

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark text-[#f5f0e1]' : 'bg-brutal-cream text-brutal-ink'}`}>

      {/* ================= NAVBAR ================= */}
      <nav className={`fixed top-0 inset-x-0 z-50 border-b-4 border-foreground transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-brutal-yellow border-2 border-foreground flex items-center justify-center brutal-shadow-sm">
              <Layers className="text-brutal-ink w-5 h-5" />
            </div>
            <span className="text-xl font-black uppercase tracking-tight text-foreground">gwidoputra</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-black uppercase tracking-wide">
            <a href="#services" className="hover:text-brutal-blue transition-colors text-foreground">Layanan</a>
            <a href="#expertise" className="hover:text-brutal-blue transition-colors text-foreground">TechStack</a>
            <a href="#portfolio" className="hover:text-brutal-blue transition-colors text-foreground">Portofolio</a>
            <button onClick={() => setShowResume(true)} className="hover:text-brutal-blue transition-colors text-foreground">Short Resume</button>
            <Link to="/contact" className="hover:text-brutal-blue transition-colors text-foreground">Kontak</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-foreground bg-card text-foreground hover:bg-brutal-yellow transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="mailto:gwidoputra@gmail.com" className="brutal-btn-solid !py-2.5 !px-6">
              Hubungi Saya
            </a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-foreground bg-card text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 border-2 border-foreground bg-card text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              className={`md:hidden border-t-2 border-foreground overflow-hidden ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}
            >
              <div className="px-6 py-4 space-y-1">
                <a
                  href="#services"
                  className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Layanan
                </a>
                <a
                  href="#expertise"
                  className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  TechStack
                </a>
                <a
                  href="#portfolio"
                  className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portofolio
                </a>
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowResume(true) }}
                  className="block w-full text-left py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                >
                  Short Resume
                </button>
                <Link
                  to="/contact"
                  className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontak
                </Link>
                <a
                  href="mailto:gwidoputra@gmail.com"
                  className="brutal-btn-solid w-full mt-4 !px-6"
                >
                  Hubungi Saya
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className={`relative pt-36 pb-24 md:pt-52 md:pb-32 overflow-hidden border-b-4 border-foreground ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-yellow'}`}>
        {/* Halftone dots + decorative shapes */}
        <div className={`absolute inset-0 halftone opacity-10 text-brutal-ink pointer-events-none`} />
        <div className={`absolute -top-16 -right-16 w-56 h-56 border-4 border-foreground rotate-12 bg-brutal-cyan animate-brutal-float pointer-events-none`} />
        <div className={`absolute bottom-8 left-8 w-24 h-24 bg-brutal-red border-4 border-foreground rotate-6 animate-brutal-float pointer-events-none hidden md:block`} />
        <div className={`absolute top-40 right-[18%] w-10 h-10 bg-brutal-green border-2 border-foreground animate-brutal-spin pointer-events-none`} />

        {/* Konten Utama */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <FadeIn delay={0.2}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground font-black text-[10px] md:text-xs tracking-widest uppercase brutal-shadow-sm ${theme === 'dark' ? 'bg-brutal-dark text-[#f5f0e1]' : 'bg-brutal-cream text-brutal-ink'}`}>
                  <Sparkles size={13} className="text-brutal-red" /> Digital Transformation Partner
                </div>
              </FadeIn>

              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase text-foreground`}>
                <TextReveal text="Saya Membangun" /> <br />
                <TextReveal text="Masa Depan Digital." className="text-brutal-blue" />
              </h1>

              <FadeIn delay={0.4}>
                <p className={`text-base md:text-lg leading-relaxed max-w-xl font-bold ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
                  Sebagai konsultan dan pengembang perangkat lunak independen, saya mentransformasi visi bisnis Anda menjadi produk digital yang kuat, terukur, dan berpusat pada pengguna.
                </p>
              </FadeIn>

              <FadeIn delay={0.6} className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="mailto:gwidoputra@gmail.com" className="brutal-btn-solid">
                  Jadwalkan Diskusi <ArrowRight size={16} />
                </a>
                <a href="#portfolio" className="brutal-btn">
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

      {/* ================= MARQUEE TICKER ================= */}
      <div className={`relative z-10 border-b-4 border-foreground overflow-hidden ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className="flex ticker-track py-4">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
              {tickerItems.map((item) => (
                <span key={`${dup}-${item}`} className="flex items-center gap-6 px-6 text-sm font-black uppercase tracking-widest text-foreground">
                  {item}
                  <span className="text-brutal-red">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= METRICS SECTION ================= */}
      <section className={`border-b-4 border-foreground py-14 relative z-10 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Proyek Selesai', value: '6+', color: 'bg-brutal-yellow' },
              { label: 'Tahun Berinovasi', value: '2+', color: 'bg-brutal-cyan' },
              { label: 'Teknologi Dikuasai', value: '15+', color: 'bg-brutal-green' },
              { label: 'Dukungan Teknis', value: '24/7', color: 'bg-brutal-red' },
            ].map((metric, idx) => (
              <FadeIn key={metric.label} delay={idx * 0.1} className="text-center">
                <div className={`border-2 border-foreground brutal-shadow p-6 ${metric.color}`}>
                  <p className="text-3xl md:text-4xl font-black mb-1 text-brutal-ink">{metric.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brutal-ink/70">{metric.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className={`py-32 relative z-10 border-b-4 border-foreground ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="inline-block bg-brutal-red text-white px-4 py-1.5 border-2 border-foreground brutal-shadow-sm font-black uppercase tracking-widest text-sm">
              Layanan Utama
            </h2>
            <h3 className={`text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground`}>
              Solusi End-to-End untuk Kebutuhan IT Anda
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <FadeIn key={service.title} delay={idx * 0.2} direction="up" className={`${service.cardClass} border-2 border-foreground p-10 transition-transform duration-200 hover:-translate-y-1`} style={{ boxShadow: '6px 6px 0 0 var(--border)' }}>
                <div className="w-14 h-14 bg-card border-2 border-foreground flex items-center justify-center text-foreground mb-8 brutal-shadow-sm">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-brutal-ink">{service.title}</h4>
                <p className="leading-relaxed font-bold text-brutal-ink/70">{service.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION SECTION ================= */}
      <section id="expertise" className={`py-32 overflow-hidden relative z-10 border-b-4 border-foreground ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className={`absolute top-24 -left-24 w-48 h-48 bg-brutal-purple border-4 border-foreground -rotate-12 animate-brutal-float pointer-events-none`} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left" className="space-y-8">
              <h2 className="inline-block bg-brutal-purple text-white px-4 py-1.5 border-2 border-foreground brutal-shadow-sm font-black uppercase tracking-widest text-sm">
                Kenapa Memilih Saya
              </h2>
              <h3 className={`text-4xl font-black leading-tight uppercase tracking-tight text-foreground`}>
                Mendorong Pertumbuhan Melalui Arsitektur Berkinerja Tinggi
              </h3>
              <p className={`text-lg leading-relaxed font-bold ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
                Saya tidak sekadar menulis kode. Saya merancang arsitektur sistem yang selaras dengan tujuan operasional Anda, memastikan setiap aplikasi dapat ditingkatkan skalanya seiring berkembangnya bisnis Anda.
              </p>
              <div className="space-y-5 pt-4">
                {values.map((value, idx) => (
                  <div key={idx} className="flex gap-5 items-start border-2 border-foreground bg-card brutal-shadow-sm p-5">
                    <div className={`mt-1 text-brutal-ink border-2 border-foreground p-1.5 ${value.cardClass}`}>
                      <value.icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight mb-1 text-foreground">{value.title}</h4>
                      <p className="text-sm leading-relaxed font-bold text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-6 relative">
              <FadeIn delay={0.2} direction="up" className="space-y-6 pt-12">
                <div className="brutal-card-blue border-2 border-foreground p-8">
                  <Database className="w-10 h-10 text-white mb-6" />
                  <h4 className="font-black uppercase tracking-tight mb-2 text-white">Data Security</h4>
                  <p className="text-sm font-bold text-white/80">Penerapan standar keamanan tertinggi pada infrastruktur cloud.</p>
                </div>
                <div className="brutal-card border-2 border-foreground p-8">
                  <Code2 className="w-10 h-10 text-brutal-blue mb-6" />
                  <h4 className="font-black uppercase tracking-tight mb-2 text-foreground">Modern Stack</h4>
                  <p className="text-sm font-bold text-muted-foreground">Teknologi mutakhir untuk performa aplikasi maksimal.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4} direction="up" className="space-y-6">
                <div className="brutal-card border-2 border-foreground p-8">
                  <Smartphone className="w-10 h-10 text-brutal-cyan mb-6" />
                  <h4 className="font-black uppercase tracking-tight mb-2 text-foreground">Mobile First</h4>
                  <p className="text-sm font-bold text-muted-foreground">Pengalaman antarmuka yang optimal di segala jenis perangkat.</p>
                </div>
                <div className="brutal-card-red border-2 border-foreground p-8">
                  <BarChart className="w-10 h-10 text-white mb-6" />
                  <h4 className="font-black uppercase tracking-tight mb-2 text-white">Analytics</h4>
                  <p className="text-sm font-bold text-white/80">Integrasi dasbor dan pelaporan data secara real-time.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECH STACK SECTION ================= */}
      <section id="tech" className={`py-32 relative z-10 border-b-4 border-foreground ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className={`absolute top-10 right-10 w-14 h-14 bg-brutal-red border-2 border-foreground rotate-12 animate-brutal-spin pointer-events-none`} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <h2 className="inline-block bg-brutal-green text-brutal-ink px-4 py-1.5 border-2 border-foreground brutal-shadow-sm font-black uppercase tracking-widest text-sm">
              Tech Stack
            </h2>
            <h3 className={`text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground`}>
              Technology I Work With
            </h3>
            <p className={`text-lg leading-relaxed font-bold ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
              Check out the tools and technologies I use (click around for fun!)
            </p>
          </div>

          <TechStackGrid />
        </div>
      </section>

      {/* ================= PORTFOLIO SECTION ================= */}
      <section id="portfolio" className="py-32 bg-brutal-blue text-white relative overflow-hidden z-10 border-b-4 border-foreground">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brutal-yellow border-4 border-foreground rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="inline-block bg-brutal-yellow text-brutal-ink px-4 py-1.5 border-2 border-foreground brutal-shadow-sm font-black uppercase tracking-widest text-sm">
                Studi Kasus
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Proyek Terbaru</h3>
            </div>
            <button onClick={() => setShowProjects(true)} className="brutal-btn !bg-white !text-brutal-ink">
              Lihat Semua Portofolio <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <FadeIn key={project.title} delay={idx * 0.1} direction="up" className={`group flex flex-col h-full border-2 border-foreground transition-all duration-200 hover:-translate-y-1 ${idx % 3 === 0 ? 'bg-brutal-yellow text-brutal-ink' : idx % 3 === 1 ? 'bg-brutal-red text-white' : 'bg-brutal-cyan text-brutal-ink'}`} style={{ boxShadow: '6px 6px 0 0 #1a1a1a' }}>
                <div className="p-8 pb-6 flex-1">
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-4">
                    {project.title}
                  </h4>
                  <p className="leading-relaxed font-bold opacity-70">
                    {project.description}
                  </p>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-black text-foreground bg-card border-2 border-foreground px-3 py-1.5 uppercase">
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

      {/* ================= GUESTBOOK SECTION ================= */}
      <section id="guestbook" className={`py-32 border-b-4 border-foreground ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="inline-block bg-brutal-cyan text-brutal-ink px-4 py-1.5 border-2 border-foreground brutal-shadow-sm font-black uppercase tracking-widest text-sm">
              Guestbook
            </h2>
            <h3 className={`text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground`}>
              Tinggalkan Jejak<span className="text-brutal-red">.</span>
            </h3>
            <p className={`text-lg leading-relaxed font-bold ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
              Tulis pesan, salam, atau roast — semua orang bisa baca.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="brutal-card overflow-hidden">
              <div className="px-8 py-6 border-b-2 border-foreground bg-brutal-yellow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-card border-2 border-foreground brutal-shadow-sm">
                      <MessageCircle size={18} className="text-brutal-red" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-tight text-brutal-ink">Guestbook</h2>
                      <p className="text-xs font-black text-brutal-ink/60">
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
                      <div key={i} className="animate-pulse border-2 border-foreground p-5 bg-muted">
                        <div className="h-3 w-20 mb-3 bg-foreground/20" />
                        <div className="h-4 w-3/4 mb-2 bg-foreground/20" />
                        <div className="h-3 w-24 bg-foreground/20" />
                      </div>
                    ))}
                  </div>
                ) : notes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle size={40} className="mx-auto mb-4 opacity-40" />
                    <p className="text-sm font-black">Belum ada catatan</p>
                    <p className="text-xs font-bold mt-1">Jadilah yang pertama!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="group border-2 border-foreground p-5 bg-card hover:bg-brutal-yellow/20 transition-colors brutal-shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 flex items-center justify-center text-[11px] font-black uppercase shrink-0 border-2 border-foreground ${colorFor(note.name)}`}>
                              {note.name.charAt(0)}
                            </div>
                            <span className="text-sm font-black uppercase truncate text-foreground">{note.name}</span>
                          </div>
                          <span className="text-[10px] font-black shrink-0 text-muted-foreground">{note.formattedDate}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed font-bold text-muted-foreground">{note.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="brutal-card overflow-hidden">
              <div className="px-8 py-6 border-b-2 border-foreground bg-brutal-purple">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-card border-2 border-foreground brutal-shadow-sm">
                    <Hash size={18} className="text-brutal-purple" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-tight text-white">Leave a Note</h2>
                    <p className="text-xs font-black text-white/70">Katakan sesuatu...</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleGuestbookSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="gb-name" className="block text-sm font-black uppercase tracking-wide mb-2 text-foreground">
                      YOUR NAME <span className="text-brutal-red">*</span>
                    </label>
                    <div className="relative">
                      <AtSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input id="gb-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Rivera" maxLength={50}
                        className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gb-message" className="block text-sm font-black uppercase tracking-wide mb-2 text-foreground">
                      YOUR NOTE <span className="text-brutal-red">*</span>
                    </label>
                    <div className="relative">
                      <Quote size={14} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                      <textarea id="gb-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice... or roast me 😄" maxLength={500} rows={4}
                        className={`${inputClass} resize-none`} />
                    </div>
                    <p className="text-[10px] font-black mt-1.5 text-right text-muted-foreground">{message.length}/500</p>
                  </div>

                  <button type="submit" disabled={submitting}
                    className={`brutal-btn-solid w-full ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <Send size={16} />
                    {submitting ? 'Mengirim...' : 'Post Note'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-32 bg-brutal-red relative z-10 border-b-4 border-foreground">
        <div className={`absolute -top-10 left-10 w-16 h-16 bg-brutal-yellow border-2 border-foreground rotate-12 animate-brutal-spin pointer-events-none`} />
        <div className={`absolute bottom-10 right-10 w-20 h-20 bg-brutal-cyan border-2 border-foreground -rotate-6 animate-brutal-float pointer-events-none`} />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            Siap untuk mendigitalisasi bisnis Anda?
          </h2>
          <p className="text-xl text-white/90 font-bold max-w-2xl mx-auto">
            Jadwalkan konsultasi gratis hari ini. Saya akan membantu Anda merumuskan teknologi yang tepat untuk eskalasi bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:gwidoputra@gmail.com" className="brutal-btn !bg-brutal-yellow !text-brutal-ink !text-lg !px-10 !py-4">
              Hubungi Saya
            </a>
            <button onClick={() => setShowResume(true)} className="brutal-btn !bg-white !text-brutal-ink !text-lg !px-10 !py-4">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={`py-16 border-t-4 border-foreground relative z-10 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-brutal-yellow border-2 border-foreground flex items-center justify-center brutal-shadow-sm">
                  <Layers className="text-brutal-ink w-5 h-5" />
                </div>
                <span className="text-xl font-black uppercase tracking-tight text-foreground">gwidoputra</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed font-bold text-muted-foreground">
                Menyediakan layanan pengembangan perangkat lunak inovatif dan solusi IT khusus untuk bisnis di era digital.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-tight mb-6 text-foreground">Navigasi</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="#services" className="hover:text-brutal-blue transition-colors text-muted-foreground">Layanan Utama</a></li>
                <li><a href="#expertise" className="hover:text-brutal-blue transition-colors text-muted-foreground">TechStack</a></li>
                <li><a href="#portfolio" className="hover:text-brutal-blue transition-colors text-muted-foreground">Studi Kasus</a></li>
                <li><button onClick={() => setShowResume(true)} className="hover:text-brutal-blue transition-colors text-muted-foreground">Short Resume</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-tight mb-6 text-foreground">Kontak</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li>Email: gwidoputra@gmail.com</li>
                <li>Lokasi: Malang, Jawa Timur</li>
                <li className="pt-4 flex gap-4">
                  <a href="https://linkedin.com/in/gwido-putra-wijaya" className="border-2 border-foreground p-2 bg-card text-foreground hover:bg-brutal-blue hover:text-white transition-colors"><Linkedin size={18} /></a>
                  <a href="https://github.com/GwidoPutra" className="border-2 border-foreground p-2 bg-card text-foreground hover:bg-brutal-ink hover:text-white transition-colors"><Github size={18} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-foreground pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black tracking-wide">
            <p className="text-muted-foreground">© {new Date().getFullYear()} GP (Gwido Putra Wijaya). All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
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

// Helper untuk warna avatar guestbook yang stabil per nama
const avatarColors = ['bg-brutal-yellow', 'bg-brutal-cyan', 'bg-brutal-green', 'bg-brutal-purple text-white', 'bg-brutal-red text-white', 'bg-brutal-blue text-white']
function colorFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}
