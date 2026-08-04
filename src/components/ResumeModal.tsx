import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { marked } from 'marked'
import { allEducations, allExperiences } from 'content-collections'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, MapPin, GraduationCap, Layers, X, Wrench, Cpu, Lightbulb, Sparkles, FileDown } from 'lucide-react'

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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-brutal-ink/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="brutal-card w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4 border-b-2 border-foreground shrink-0 bg-brutal-cyan">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-brutal-ink text-brutal-yellow px-3 py-1 font-black text-[10px] tracking-widest uppercase">
              <Sparkles size={12} /> Available for Work
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-brutal-ink">
              Short Resume<span className="text-brutal-red">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCV}
              className="border-2 border-foreground bg-card p-2 text-foreground hover:bg-brutal-yellow transition-colors"
              title="Download CV"
            >
              <FileDown size={20} />
            </button>
            <button
              onClick={onClose}
              className="border-2 border-foreground bg-brutal-red p-2 text-white hover:bg-brutal-ink transition-colors"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 flex-1 space-y-8 bg-background">
          {/* Header */}
          <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                Gwido Putra Wijaya
              </h1>
              <p className="text-lg font-black uppercase tracking-wide text-muted-foreground">
                Full-stack Developer <span className="mx-2 text-brutal-red">|</span> Web, Mobile & AI Enthusiast
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-brutal-red" />
                <span className="text-sm font-black tracking-wide uppercase italic">Malang, Jawa Timur</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/GwidoPutra" target="_blank" rel="noopener noreferrer" className="p-2.5 border-2 border-foreground bg-card text-foreground hover:bg-brutal-ink hover:text-white transition-colors brutal-shadow-sm">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" rel="noopener noreferrer" className="p-2.5 border-2 border-foreground bg-card text-foreground hover:bg-brutal-blue hover:text-white transition-colors brutal-shadow-sm">
                <Linkedin size={18} />
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="border-2 border-foreground bg-brutal-yellow p-6 brutal-shadow">
            <div className="flex items-center gap-2 text-brutal-ink mb-3">
              <Layers size={16} />
              <h3 className="font-black uppercase tracking-widest text-xs">Career Summary</h3>
            </div>
            <p className="leading-relaxed font-bold text-justify text-brutal-ink/80">
              Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas.
            </p>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-foreground">Toolkit & Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skillCategories.map((category, idx) => (
                <div key={category.title} className={`border-2 border-foreground p-4 ${idx % 3 === 0 ? 'bg-brutal-green' : idx % 3 === 1 ? 'bg-brutal-purple' : 'bg-brutal-cyan'} brutal-shadow-sm`}>
                  <div className="flex items-center gap-2 text-brutal-ink">
                    <category.icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{category.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {category.skills.map((skill) => (
                      <span key={skill} className="bg-card border-2 border-foreground px-2.5 py-0.5 text-[9px] font-black text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-foreground">Experience</h3>
            <div className="space-y-6">
              {allExperiences.map((exp) => (
                <div key={exp.title} className="relative pl-6 border-l-2 border-dashed border-foreground">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-brutal-yellow border-2 border-foreground rotate-45" />
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-base font-black uppercase tracking-tight text-foreground">{exp.title}</h4>
                        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">{exp.organization}</p>
                      </div>
                      <span className="text-[9px] font-black text-brutal-ink bg-brutal-red border-2 border-foreground px-2 py-0.5 uppercase self-start sm:self-center leading-none brutal-shadow-sm">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed font-bold text-muted-foreground">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-black text-foreground border-2 border-foreground bg-card px-1.5 py-0.5 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {exp.content && (
                      <div
                        className="mt-2 p-3 border-2 border-foreground bg-muted prose prose-sm max-w-none italic font-bold text-muted-foreground"
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
            <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-foreground">Education</h3>
            <div className="grid gap-4">
              {allEducations.map((education, idx) => (
                <div key={education.school} className={`border-2 border-foreground p-5 ${idx % 2 === 0 ? 'bg-brutal-yellow' : 'bg-brutal-cyan'} brutal-shadow-sm`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 border-2 border-foreground bg-card text-brutal-red brutal-shadow-sm">
                      <GraduationCap size={18} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-black uppercase tracking-tight text-brutal-ink">{education.school}</h4>
                      <p className="text-sm leading-relaxed font-bold text-brutal-ink/75">{education.summary}</p>
                      <p className="text-sm font-black text-brutal-ink/75">{education.startDate}-{education.endDate}</p>
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
