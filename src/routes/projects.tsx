import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { Github, ArrowLeft, ExternalLink, FileText, FolderOpen, Sparkles } from 'lucide-react'
import { toast } from "sonner"
import { useTheme } from '../contexts/ThemeContext'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const { theme } = useTheme()

  const handleUnderDevelopment = (type: string) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: "Fitur ini masih dalam tahap pengerjaan.",
      duration: 3000,
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-36 space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-wide border-2 border-foreground bg-card text-foreground brutal-shadow-sm hover:-translate-y-0.5 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-foreground bg-brutal-blue text-white brutal-shadow-sm font-black text-[10px] tracking-widest uppercase mb-4">
              <Sparkles size={12} />
              Portofolio Karya
            </div>
            <h1 className={`text-4xl md:text-6xl font-black tracking-tight uppercase ${theme === 'dark' ? 'text-[#f5f0e1]' : 'text-brutal-ink'} mb-6`}>
              Projects<span className="text-brutal-red">.</span>
            </h1>
            <p className={`text-lg md:text-xl font-bold leading-relaxed ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
              Eksplorasi solusi digital melalui kode. Kumpulan proyek pengembangan web, mobile, dan eksperimen teknologi.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project, idx) => (
            <div
              key={project._meta.path}
              className={`group flex flex-col border-[3px] border-foreground overflow-hidden transition-all duration-200 hover:-translate-y-1 ${idx % 3 === 0 ? 'bg-brutal-yellow' : idx % 3 === 1 ? 'bg-brutal-cyan' : 'bg-brutal-purple'}`}
              style={{ boxShadow: '6px 6px 0 0 var(--border)' }}
            >
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 border-2 border-foreground bg-card text-brutal-red brutal-shadow-sm">
                    <FolderOpen size={24} />
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-brutal-green animate-pulse" />
                  </div>
                </div>
                <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-brutal-ink">
                  {project.title}
                </h2>
              </div>

              <div className="px-8 pb-8 flex-1 flex flex-col">
                <p className="mb-8 flex-1 line-clamp-3 text-sm font-bold leading-relaxed text-brutal-ink/70">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] font-black uppercase tracking-wider border-2 border-foreground bg-card text-brutal-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`pt-6 border-t-2 border-brutal-ink/30 flex flex-wrap gap-6`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-black transition-colors tracking-[0.15em] text-brutal-ink hover:bg-brutal-ink hover:text-white uppercase"
                    >
                      <Github size={16} />
                      GITHUB
                    </a>
                  )}

                  <button
                    onClick={() => handleUnderDevelopment('Live Demo')}
                    className="flex items-center gap-2 text-[10px] font-black transition-colors tracking-[0.15em] text-brutal-ink hover:bg-brutal-blue hover:text-white uppercase"
                  >
                    <ExternalLink size={16} />
                    LIVE DEMO
                  </button>

                  <button
                    onClick={() => handleUnderDevelopment('Dokumentasi')}
                    className="flex items-center gap-2 text-[10px] font-black transition-colors tracking-[0.15em] text-brutal-ink hover:bg-brutal-green hover:text-brutal-ink uppercase"
                  >
                    <FileText size={16} />
                    DOKUMENTASI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-16 text-center border-t-2 border-foreground">
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-[#f5f0e1]/50' : 'text-brutal-ink/50'}`}>
            Total {allProjects.length} Proyek Terdaftar
          </p>
        </div>
      </div>
    </div>
  )
}
