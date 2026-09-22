import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { Github, ArrowLeft, ExternalLink, FileText, FolderOpen, Sparkles } from 'lucide-react'
import { toast } from "sonner"
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const handleUnderDevelopment = (type: string) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: "Fitur ini masih dalam tahap pengerjaan.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-foreground">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-36 space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-8">
          <Link
            to="/"
            className="btn-outline"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <div className="relative max-w-2xl">
            <div className="mono-label gap-2 px-4 py-1.5 mb-4 tracking-widest">
              <Sparkles size={12} />
              Portofolio Karya
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Projects<span className="text-accent">.</span>
            </h1>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground">
              Eksplorasi solusi digital melalui kode. Kumpulan proyek pengembangan web, mobile, dan eksperimen teknologi.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project) => (
            <div
              key={project._meta.path}
              className="surface-card-base surface-card-hover overflow-hidden group flex flex-col transition-all duration-200"
            >
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg border border-border bg-accent/10 text-accent">
                    <FolderOpen size={24} />
                  </div>
                  <div className="flex gap-2">
                    <span className="status-dot" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground">
                  {project.title}
                </h2>
              </div>

              <div className="px-8 pb-8 flex-1 flex flex-col">
                <p className="mb-8 flex-1 line-clamp-3 text-sm font-normal leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-chip"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-border flex flex-wrap gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Github size={16} />
                      GITHUB
                    </a>
                  )}

                  <button
                    onClick={() => handleUnderDevelopment('Live Demo')}
                    className="flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <ExternalLink size={16} />
                    LIVE DEMO
                  </button>

                  <button
                    onClick={() => handleUnderDevelopment('Dokumentasi')}
                    className="flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        <div className="pt-16 text-center border-t border-border">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Total {allProjects.length} Proyek Terdaftar
          </p>
        </div>
      </div>
    </div>
  )
}
