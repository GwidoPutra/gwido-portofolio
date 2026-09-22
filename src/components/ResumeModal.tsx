import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { marked } from 'marked'
import { allEducations, allExperiences } from 'content-collections'
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
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-border bg-surface w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border shrink-0 bg-surface">
          <div className="space-y-1">
            <div className="mono-label text-accent">
              <Sparkles size={12} /> Available for Work
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Short Resume<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCV}
              className="rounded-lg border border-border bg-surface p-2 text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              title="Download CV"
            >
              <FileDown size={20} />
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-border bg-accent p-2 text-accent-foreground hover:brightness-110 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 flex-1 space-y-8 bg-background">
          {/* Header */}
          <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Gwido Putra Wijaya
              </h1>
              <p className="text-lg font-medium tracking-wide text-muted-foreground">
                Full-stack Developer <span className="mx-2 text-accent">|</span> Web, Mobile & AI Enthusiast
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium tracking-wide italic">Malang, Jawa Timur</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/GwidoPutra" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Linkedin size={18} />
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="surface-card-base p-6">
            <div className="flex items-center gap-2 text-foreground mb-3">
              <Layers size={16} />
              <h3 className="font-semibold tracking-widest text-xs uppercase">Career Summary</h3>
            </div>
            <p className="leading-relaxed font-normal text-justify text-muted-foreground">
              Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas.
            </p>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-bold tracking-tight mb-4 text-foreground">Toolkit & Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skillCategories.map((category) => (
                <div key={category.title} className="surface-card-base p-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <category.icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-semibold uppercase tracking-widest">{category.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {category.skills.map((skill) => (
                      <span key={skill} className="bg-background border border-border rounded-md px-2.5 py-0.5 text-[9px] font-medium text-foreground">
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
            <h3 className="text-lg font-bold tracking-tight mb-4 text-foreground">Experience</h3>
            <div className="space-y-6">
              {allExperiences.map((exp) => (
                <div key={exp.title} className="relative pl-6 border-l border-dashed border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent-secondary border border-border" />
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-base font-bold tracking-tight text-foreground">{exp.title}</h4>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{exp.organization}</p>
                      </div>
                      <span className="text-[9px] font-medium rounded-md bg-accent/10 text-accent border border-border px-2 py-0.5 uppercase self-start sm:self-center leading-none">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed font-normal text-muted-foreground">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-medium text-foreground border border-border bg-background rounded-md px-1.5 py-0.5 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {exp.content && (
                      <div
                        className="mt-2 p-3 border border-border rounded-lg bg-muted prose prose-sm max-w-none italic font-normal text-muted-foreground"
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
            <h3 className="text-lg font-bold tracking-tight mb-4 text-foreground">Education</h3>
            <div className="grid gap-4">
              {allEducations.map((education) => (
                <div key={education.school} className="surface-card-base p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg border border-border bg-accent/10 text-accent">
                      <GraduationCap size={18} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold tracking-tight text-foreground">{education.school}</h4>
                      <p className="text-sm leading-relaxed font-normal text-muted-foreground">{education.summary}</p>
                      <p className="text-sm font-medium text-muted-foreground">{education.startDate}-{education.endDate}</p>
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
