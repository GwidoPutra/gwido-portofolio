import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { marked } from 'marked'
import { allEducations, allExperiences } from 'content-collections'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, MapPin, GraduationCap, Layers, X, Wrench, Cpu, Lightbulb, Sparkles, FileDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const skillCategories = [
  {
    title: "Technical Skills",
    icon: Wrench,
    skills: ["React", "TypeScript", "Node.js", "Laravel", "Flutter", "Tailwind CSS", "SQL", "Python"]
  },
  {
    title: "Soft Skills",
    icon: Lightbulb,
    skills: ["Leadership", "Team Management", "Public Speaking", "Problem Solving", "Strategic Planning", "Collaboration", "Event Coordination"]
  },
  {
    title: "Interests & Focus",
    icon: Cpu,
    skills: ["Full-stack Development", "Mobile App Development", "AI/ML Exploration", "IoT Integration", "UI/UX Design"]
  }
]

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [onClose])

  const handleDownloadCV = () => {
    window.open('/CV_Gwido_Putra_Wijaya.pdf', '_blank')
  }

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
        className={`rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617] border border-slate-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-start justify-between p-6 pb-4 border-b shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-blue-600 text-[10px] font-black tracking-widest uppercase transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
              <Sparkles size={12} /> Available for Work
            </div>
            <h2 className={`text-2xl font-black transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Short Resume<span className="text-blue-600">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCV}
              className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'}`}
              title="Download CV"
            >
              <FileDown size={20} />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'}`}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 flex-1 space-y-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 text-center md:text-left">
            <div className="space-y-2">
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b ${theme === 'dark' ? 'from-white to-slate-400' : 'from-slate-900 to-slate-500'}`}>
                Gwido Putra Wijaya
              </h1>
              <p className={`text-lg font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Full-stack Developer <span className={`mx-2 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`}>|</span> Web, Mobile & AI Enthusiast
              </p>
              <div className={`flex items-center justify-center md:justify-start gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`}>
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase italic">Malang, Jawa Timur</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/GwidoPutra" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl border transition-all hover:border-blue-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <Github size={18} className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
              </a>
              <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl border transition-all hover:border-blue-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <Linkedin size={18} className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className={`p-6 rounded-2xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <Layers size={16} />
              <h3 className="font-black uppercase tracking-widest text-xs">Career Summary</h3>
            </div>
            <p className={`leading-relaxed font-medium text-justify ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas.
            </p>
          </section>

          {/* Skills */}
          <section>
            <h3 className={`text-lg font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Toolkit & Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skillCategories.map((category) => (
                <div key={category.title} className={`p-4 rounded-2xl border shadow-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center gap-2 text-blue-600">
                    <category.icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{category.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold border-none ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className={`text-lg font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Experience</h3>
            <div className="space-y-6">
              {allExperiences.map((exp) => (
                <div key={exp.title} className="group relative pl-6 before:absolute before:left-0 before:top-1.5 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
                  <div className={`absolute left-[-3.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-all`} />
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className={`text-base font-black group-hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{exp.title}</h4>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{exp.organization}</p>
                      </div>
                      <span className="text-[9px] font-black text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full uppercase self-start sm:self-center leading-none">
                        {exp.period}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className={`text-[8px] font-black text-slate-400 border px-1.5 py-0.5 rounded-md uppercase ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {exp.content && (
                      <div
                        className={`mt-2 p-3 rounded-xl prose prose-sm dark:prose-invert max-w-none italic bg-slate-50 dark:bg-slate-800/50 text-slate-500 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
                        dangerouslySetInnerHTML={{ __html: marked(exp.content) }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className={`text-lg font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Education</h3>
            <div className="grid gap-4">
              {allEducations.map((education) => (
                <div key={education.school} className={`p-5 rounded-2xl border group hover:border-blue-500 transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl text-blue-600 group-hover:rotate-6 transition-transform ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <GraduationCap size={18} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{education.school}</h4>
                      <p className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{education.summary}</p>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{education.startDate}-{education.endDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  )
}
