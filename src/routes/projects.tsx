import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, ArrowLeft, ExternalLink, FileText, FolderOpen, Sparkles } from 'lucide-react'
import { toast } from "sonner"

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const navigate = useNavigate()

  const handleUnderDevelopment = (type: string) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: "Fitur ini masih dalam tahap pengerjaan.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020617] font-sans selection:bg-blue-500/10">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-12">
        
        {/* Navigation & Header */}
        <div className="space-y-8">
          <button 
            onClick={() => navigate({ to: '..' })} 
            className="group flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4">
              <Sparkles size={12} /> Portofolio Karya
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Projects<span className="text-blue-600">.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Eksplorasi solusi digital melalui kode. Kumpulan proyek pengembangan web, mobile, dan eksperimen teknologi.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {allProjects.map((project) => (
            <Card
              key={project._meta.path}
              className="group flex flex-col bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500"
            >
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all">
                    <FolderOpen size={24} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1 line-clamp-3 text-sm font-medium leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50 flex flex-wrap gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors tracking-[0.15em]"
                    >
                      <Github size={16} />
                      GITHUB
                    </a>
                  )}

                  <button
                    onClick={() => handleUnderDevelopment('Live Demo')}
                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors tracking-[0.15em]"
                  >
                    <ExternalLink size={16} />
                    LIVE DEMO
                  </button>

                  <button
                    onClick={() => handleUnderDevelopment('Dokumentasi')}
                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-green-600 transition-colors tracking-[0.15em]"
                  >
                    <FileText size={16} />
                    DOCS
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-16 text-center border-t border-slate-100 dark:border-slate-900">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Total {allProjects.length} Proyek Terdaftar
          </p>
        </div>
      </div>
    </div>
  )
}