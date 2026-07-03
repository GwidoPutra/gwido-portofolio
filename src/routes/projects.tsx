import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, ArrowLeft, ExternalLink, FileText, FolderOpen, Sparkles } from 'lucide-react'
import { toast } from "sonner"
import { useTheme } from '../contexts/ThemeContext'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleUnderDevelopment = (type: string) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: "Fitur ini masih dalam tahap pengerjaan.",
      duration: 3000,
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#fafafa]'}`}>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-8">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl shadow-sm hover:border-blue-500 hover:text-blue-600 ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>

          <div className="relative max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
              <Sparkles size={12} />
              Portofolio Karya
            </div>
            <h1 className={`text-4xl md:text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-6`}>
              Projects<span className="text-blue-600">.</span>
            </h1>
            <p className={`text-lg md:text-xl font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Eksplorasi solusi digital melalui kode. Kumpulan proyek pengembangan web, mobile, dan eksperimen teknologi.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {allProjects.map((project) => (
            <Card
              key={project._meta.path}
              className={`group flex flex-col overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/60'}`}
              style={{ borderRadius: '2rem' }}
            >
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all ${theme === 'dark' ? 'bg-slate-800 dark:group-hover:bg-blue-500/10' : 'bg-slate-50'}`}>
                    <FolderOpen size={24} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                </div>
                <CardTitle className={`text-2xl font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <p className={`mb-8 flex-1 line-clamp-3 text-sm font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border-none ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-500'}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className={`pt-6 border-t flex flex-wrap gap-6 ${theme === 'dark' ? 'border-slate-800/50' : 'border-slate-50'}`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-[10px] font-black transition-colors tracking-[0.15em] hover:text-slate-900 dark:hover:text-white ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`}
                    >
                      <Github size={16} />
                      GITHUB
                    </a>
                  )}

                  <button
                    onClick={() => handleUnderDevelopment('Live Demo')}
                    className={`flex items-center gap-2 text-[10px] font-black transition-colors tracking-[0.15em] hover:text-blue-600 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`}
                  >
                    <ExternalLink size={16} />
                    LIVE DEMO
                  </button>

                  <button
                    onClick={() => handleUnderDevelopment('Dokumentasi')}
                    className={`flex items-center gap-2 text-[10px] font-black transition-colors tracking-[0.15em] hover:text-green-600 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`}
                  >
                    <FileText size={16} />
                    DOKUMENTASI
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className={`pt-16 text-center border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            Total {allProjects.length} Proyek Terdaftar
          </p>
        </div>
      </div>
    </div>
  )
}
