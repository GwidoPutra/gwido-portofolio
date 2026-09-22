import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn } from '../components/ui/animations/FadeIn'
import { TextReveal } from '../components/ui/animations/TextReveal'
import { CLITerminal } from '../components/CLITerminal'
import { TechStackGrid } from '../components/BouncingTechStack'
import { ResumeModal } from '../components/ResumeModal'
import { CharacterVideo } from '../components/CharacterVideo'
import {
  Smartphone,
  Globe,
  Database,
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
  BrainCircuit,
  Cpu,
} from 'lucide-react'
import { toast } from 'sonner'
import { useTheme } from '../contexts/ThemeContext'

// 1. Registrasi Rute ke TanStack Router
export const Route = createFileRoute('/')({
  component: CompanyProfile,
})

// 2. Komponen Modal Portofolio
function ProjectsModal({ onClose }: { onClose: () => void }) {
  const handleUnderDevelopment = (type: string) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: 'Fitur ini masih dalam tahap pengerjaan.',
      duration: 3000
    })
  }

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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-8 pb-6 border-b border-border shrink-0 bg-surface">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-md bg-accent/10 text-accent px-3 py-1 text-[10px] font-medium tracking-widest uppercase">
              <Sparkles size={12} /> Portofolio Karya
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Projects<span className="text-accent">.</span>
            </h2>
            <p className="text-sm font-normal text-muted-foreground">Eksplorasi solusi digital melalui kode.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-background text-muted-foreground p-2 transition-colors hover:text-foreground hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-8 flex-1 bg-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((project) => (
              <div
                key={project._meta.path}
                className="group surface-card-base surface-card-hover flex flex-col overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg border border-border bg-accent/10 text-accent">
                      <FolderOpen size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="status-dot" />
                      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Available</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2 mb-4 font-normal text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tech-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border flex gap-5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-medium transition-colors tracking-widest uppercase text-muted-foreground hover:text-foreground">
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    <button onClick={() => handleUnderDevelopment('Live Demo')}
                      className="flex items-center gap-1.5 text-[10px] font-medium transition-colors tracking-widest uppercase text-muted-foreground hover:text-accent">
                      <ExternalLink size={14} /> Live Demo
                    </button>
                    <button onClick={() => handleUnderDevelopment('Dokumentasi')}
                      className="flex items-center gap-1.5 text-[10px] font-medium transition-colors tracking-widest uppercase text-muted-foreground hover:text-accent">
                      <FileText size={14} /> Docs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-medium uppercase tracking-widest mt-8 pt-8 border-t border-border text-muted-foreground">
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

// Skill categories from the actual profile stack
const skillGroups = [
  {
    title: 'Frontend',
    icon: Globe,
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
  },
  {
    title: 'Backend',
    icon: Database,
    skills: ['ASP.NET', 'Node.js', 'FastAPI', 'Swagger'],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Expo', 'Flutter', 'Dart'],
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL'],
  },
  {
    title: 'AI / Data',
    icon: BrainCircuit,
    skills: ['Python', 'Machine Learning Basics'],
  },
]

// 3. Komponen Utama Halaman Utama
function CompanyProfile() {
  const featuredProjects = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ].slice(0, 6)
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

  const inputClass = `w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all text-sm font-normal`

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-foreground">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-base">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Gwido<span className="text-accent">.</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <button onClick={() => setShowResume(true)} className="text-muted-foreground hover:text-foreground transition-colors">Resume</button>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="mailto:gwidoputra@gmail.com" className="btn-solid">
              Let's Talk
            </a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
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
              className="md:hidden border-t border-border overflow-hidden bg-background/95 backdrop-blur"
            >
              <div className="px-6 py-4 space-y-1">
                <a href="#about" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#skills" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                <a href="#projects" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                <button onClick={() => { setMobileMenuOpen(false); setShowResume(true) }} className="block w-full text-left py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resume</button>
                <Link to="/contact" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <a href="mailto:gwidoputra@gmail.com" className="btn-solid w-full mt-4">Let's Talk</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

{/* ================= HERO SECTION (visual: mascot + marquee) ================= */}
{/* pt-[84px] = tinggi navbar fixed (h-20 = 80px + border-b = 1px), supaya bagian atas
    (rambut) tidak tertutup navbar. */}
<section className="relative overflow-hidden bg-background pt-[84px] border-b border-border">
  {/* Tekstur grid sangat halus */}
  <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
  <div className="relative flex w-full items-center justify-center">
    {/* Glow aksen di belakang mascot agar siluet hoodie hitam tetap terbaca */}
    <div className="absolute inset-0 mascot-glow pointer-events-none" aria-hidden="true" />

    {/* Layer 1 — marquee di belakang mascot, kontras rendah sebagai dekorasi */}
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 overflow-hidden pointer-events-none select-none">
      <div className="ticker-track">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="inline-flex items-center whitespace-nowrap text-[clamp(1.75rem,6vw,4.5rem)] font-semibold tracking-tight leading-none"
          >
            {Array.from({ length: 4 }).map((_, j) => (
              <span key={j} className="inline-flex items-center whitespace-nowrap">
                <span className="text-foreground/10">GWIDO&nbsp;PUTRA&nbsp;</span>
                <span className="text-accent/40">WIJAYA.</span>
                <span>&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>

    {/* Layer 2 — mascot di atas marquee. object-contain menjaga seluruh frame tetap utuh. */}
    <CharacterVideo className="relative z-20 block h-auto w-full max-h-[calc(100svh-84px)] object-contain" />
  </div>
</section>

      {/* ================= HERO TEXT CONTENT (below visual) ================= */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <span className="mono-label">
                <span className="status-dot" /> &lt;INFORMATICS_STUDENT /&gt;
              </span>
            </FadeIn>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.98] text-foreground">
              <TextReveal text="Hello, I'm" /> <br />
              <TextReveal text="Gwido Putra" /> <br />
              <TextReveal text="Wijaya." className="text-accent" />
            </h1>

            <FadeIn delay={0.35}>
              <p className="text-base md:text-lg leading-relaxed max-w-xl font-normal text-muted-foreground">
                Informatics student who loves turning ideas into clean, functional web &amp; mobile apps.
                Exploring AI and always building.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} className="flex flex-wrap gap-2">
              <span className="tech-chip">Web</span>
              <span className="tech-chip">Mobile</span>
              <span className="tech-chip">AI</span>
              <span className="tech-chip">Software Eng.</span>
            </FadeIn>

            <FadeIn delay={0.55} className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#projects" className="btn-solid">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="mailto:gwidoputra@gmail.com" className="btn-outline">
                Contact Me
              </a>
            </FadeIn>

            <FadeIn delay={0.65} className="flex flex-wrap items-center gap-3 pt-2">
              <a href="https://github.com/GwidoPutra" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Linkedin size={18} />
              </a>
              <span className="mono-label">
                <span className="status-dot" /> STATUS: AVAILABLE
              </span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-24 md:py-32 border-b border-border bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: code snippet identity */}
            <FadeIn direction="left" className="space-y-8">
              <div>
                <span className="mono-label">&lt;ABOUT_ME /&gt;</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-5">
                  Informatics student,<br /><span className="text-accent">always building.</span>
                </h2>
              </div>

              <p className="text-lg leading-relaxed font-normal text-muted-foreground">
                Mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang. Saya fokus pada pengembangan
                web &amp; mobile, dengan minat yang terus berkembang di bidang AI dan software engineering.
              </p>

              {/* Code snippet decorative card */}
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <div className="px-4 py-3 border-b border-border bg-surface flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent/60" />
                  <span className="w-3 h-3 rounded-full bg-border" />
                  <span className="text-muted-foreground text-xs font-mono ml-2">developer.ts</span>
                </div>
                <pre className="p-5 text-sm font-mono text-foreground overflow-x-auto leading-relaxed">
{`const developer = {
  name: "Gwido",
  focus: [
    "Web Development",
    "Mobile Development",
    "AI"
  ],
  learning: true,
  status: "available",
};`}
                </pre>
              </div>
            </FadeIn>

            {/* Right: interest cards */}
            <div className="grid grid-cols-2 gap-5">
              <FadeIn delay={0.1} className="surface-card-base surface-card-hover p-6">
                <Globe className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold tracking-tight mb-1 text-foreground">Web Dev</h4>
                <p className="text-sm font-normal text-muted-foreground">React · TypeScript · REST API</p>
              </FadeIn>
              <FadeIn delay={0.2} className="surface-card-base surface-card-hover p-6">
                <Smartphone className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold tracking-tight mb-1 text-foreground">Mobile</h4>
                <p className="text-sm font-normal text-muted-foreground">React Native · Expo · Flutter</p>
              </FadeIn>
              <FadeIn delay={0.3} className="surface-card-base surface-card-hover p-6">
                <Cpu className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold tracking-tight mb-1 text-foreground">AI / Data</h4>
                <p className="text-sm font-normal text-muted-foreground">Python · Machine Learning</p>
              </FadeIn>
              <FadeIn delay={0.4} className="surface-card-base surface-card-hover p-6">
                <Code2 className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold tracking-tight mb-1 text-foreground">Backend</h4>
                <p className="text-sm font-normal text-muted-foreground">ASP.NET · Node.js · FastAPI</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="py-24 md:py-32 border-b border-border bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <span className="mono-label">&lt;TECH_STACK /&gt;</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Skills &amp; Tools
            </h2>
            <p className="text-lg leading-relaxed font-normal text-muted-foreground">
              Teknologi yang saya gunakan dan terus pelajari dalam membangun proyek.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => (
              <FadeIn key={group.title} delay={idx * 0.08} className="surface-card-base surface-card-hover p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <group.icon size={16} />
                  </div>
                  <span className="font-semibold tracking-wide text-xs text-accent">{group.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tech-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}

            {/* Tech icons card */}
            <FadeIn delay={0.4} className="sm:col-span-2 lg:col-span-3 surface-card-base surface-card-hover p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Layers size={16} />
                </div>
                <span className="font-semibold tracking-wide text-xs text-accent">More Tools</span>
              </div>
              <TechStackGrid />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="py-24 md:py-32 border-b border-border bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="mono-label">&lt;PROJECTS /&gt;</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Featured Work
              </h2>
            </div>
            <button onClick={() => setShowProjects(true)} className="btn-outline">
              All Projects <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <FadeIn key={project.title} delay={idx * 0.08} direction="up" className="group flex flex-col h-full surface-card-base surface-card-hover overflow-hidden">
                <div className="p-7 pb-5 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg border border-border bg-accent/10 text-accent">
                      <FolderOpen size={20} />
                    </div>
                    <span className="text-[10px] font-medium tracking-widest text-muted-foreground font-mono">
                      {`0${idx + 1}`}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="leading-relaxed font-normal text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div className="p-7 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tech-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground hover:text-accent transition-colors">
                      <Github size={14} /> GitHub <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GUESTBOOK SECTION ================= */}
      <section id="guestbook" className="py-24 md:py-32 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="mono-label">&lt;GUESTBOOK /&gt;</span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Leave a Note<span className="text-accent">.</span>
            </h3>
            <p className="text-lg leading-relaxed font-normal text-muted-foreground">
              Tulis pesan, salam, atau roast — semua orang bisa baca.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              <div className="px-8 py-6 border-b border-border bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent border border-border">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight text-foreground">Guestbook</h2>
                      <p className="text-xs font-normal text-muted-foreground">{notes.length} notes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse rounded-lg border border-border p-5 bg-background">
                        <div className="h-3 w-20 mb-3 rounded bg-foreground/20" />
                        <div className="h-4 w-3/4 mb-2 rounded bg-foreground/20" />
                        <div className="h-3 w-24 rounded bg-foreground/20" />
                      </div>
                    ))}
                  </div>
                ) : notes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle size={40} className="mx-auto mb-4 opacity-40" />
                    <p className="text-sm font-medium">Belum ada catatan</p>
                    <p className="text-xs font-normal mt-1">Jadilah yang pertama!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="group rounded-lg border border-border p-5 bg-background hover:bg-accent/10 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 flex items-center justify-center text-[11px] font-semibold uppercase shrink-0 rounded-full ${colorFor(note.name)}`}>
                              {note.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium truncate text-foreground">{note.name}</span>
                          </div>
                          <span className="text-[10px] font-normal shrink-0 text-muted-foreground">{note.formattedDate}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed font-normal text-muted-foreground">{note.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              <div className="px-8 py-6 border-b border-border bg-background">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent border border-border">
                    <Hash size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">Leave a Note</h2>
                    <p className="text-xs font-normal text-muted-foreground">Katakan sesuatu...</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleGuestbookSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="gb-name" className="block text-sm font-medium mb-2 text-foreground">
                      YOUR NAME <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <AtSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input id="gb-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Rivera" maxLength={50} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gb-message" className="block text-sm font-medium mb-2 text-foreground">
                      YOUR NOTE <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <Quote size={14} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                      <textarea id="gb-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something nice... or roast me 😄" maxLength={500} rows={4} className={`${inputClass} resize-none`} />
                    </div>
                    <p className="text-[10px] font-normal mt-1.5 text-right text-muted-foreground">{message.length}/500</p>
                  </div>

                  <button type="submit" disabled={submitting} className={`btn-solid w-full ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
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
      <section className="py-24 md:py-32 bg-surface relative z-10 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent)_0%,transparent_65%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <span className="mono-label">&lt;LET'S_TALK /&gt;</span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Punya ide?<br />Ayo wujudkan bersama.
          </h2>
          <p className="text-xl text-muted-foreground font-normal max-w-2xl mx-auto">
            Terbuka untuk kolaborasi, proyek, atau sekadar bertukar pikiran soal teknologi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:gwidoputra@gmail.com" className="btn-solid !text-lg !px-10 !py-4">
              Contact Me
            </a>
            <button onClick={() => setShowResume(true)} className="btn-outline !text-lg !px-10 !py-4">
              View Resume
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-16 border-t border-border bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">Gwido<span className="text-accent">.</span></span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed font-normal text-muted-foreground">
                Portfolio mahasiswa Teknik Informatika. Membangun web, mobile, dan eksplorasi AI dengan pendekatan yang rapi dan berkarakter.
              </p>
            </div>
            <div>
              <h4 className="font-semibold tracking-tight mb-6 text-foreground">Navigasi</h4>
              <ul className="space-y-4 text-sm font-normal">
                <li><a href="#about" className="hover:text-accent transition-colors text-muted-foreground">About</a></li>
                <li><a href="#skills" className="hover:text-accent transition-colors text-muted-foreground">Skills</a></li>
                <li><a href="#projects" className="hover:text-accent transition-colors text-muted-foreground">Projects</a></li>
                <li><button onClick={() => setShowResume(true)} className="hover:text-accent transition-colors text-muted-foreground">Resume</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold tracking-tight mb-6 text-foreground">Kontak</h4>
              <ul className="space-y-4 text-sm font-normal text-muted-foreground">
                <li>Email: gwidoputra@gmail.com</li>
                <li>Lokasi: Malang, Jawa Timur</li>
                <li className="pt-4 flex gap-4">
                  <a href="https://linkedin.com/in/gwido-putra-wijaya" aria-label="LinkedIn" className="rounded-lg border border-border p-2 bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"><Linkedin size={18} /></a>
                  <a href="https://github.com/GwidoPutra" aria-label="GitHub" className="rounded-lg border border-border p-2 bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"><Github size={18} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-normal">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Gwido Putra Wijaya. All rights reserved.</p>
            <span className="mono-label">BUILT WITH REACT + TYPESCRIPT</span>
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
const avatarColors = [
  'bg-accent text-accent-foreground',
  'bg-accent-secondary text-accent-foreground',
  'bg-slate-600/25 text-foreground',
  'bg-indigo-500/25 text-foreground',
]
function colorFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}
