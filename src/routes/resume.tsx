import { marked } from 'marked'
import { createFileRoute } from '@tanstack/react-router'
import { allEducations, allExperiences } from 'content-collections'
import {
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  Layers,
  Wrench,
  Cpu,
  Lightbulb,
  FileDown,
  Sparkles
} from "lucide-react"
import { useTheme } from '../contexts/ThemeContext'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/resume')({
  component: App,
})

const skillCategories = [
  {
    title: "Technical Skills",
    icon: Wrench,
    skills: ["React", "TypeScript", "Node.js", "Laravel", "Flutter", "Tailwind CSS", "SQL", "Python"],
    cardClass: "bg-brutal-green",
  },
  {
    title: "Soft Skills",
    icon: Lightbulb,
    skills: ["Leadership", "Team Management", "Public Speaking", "Problem Solving", "Strategic Planning", "Collaboration", "Event Coordination"],
    cardClass: "bg-brutal-cyan",
  },
  {
    title: "Interests & Focus",
    icon: Cpu,
    skills: ["Full-stack Development", "Mobile App Development", "AI/ML Exploration", "IoT Integration", "UI/UX Design"],
    cardClass: "bg-brutal-purple",
  }
]

function App() {
  const { theme } = useTheme()

  const handleDownloadCV = () => {
    const cvUrl = '/CV_Gwido_Putra_Wijaya.pdf'
    window.open(cvUrl, '_blank')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-16">

        {/* Section 1: Header */}
        <header className="relative space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-foreground bg-brutal-green text-brutal-ink brutal-shadow-sm font-black text-[10px] tracking-widest uppercase">
                <Sparkles size={12} /> Available for Work
              </div>
              <h1 className={`text-4xl md:text-6xl font-black tracking-tight uppercase leading-tight text-foreground`}>
                Gwido Putra Wijaya
              </h1>
              <p className={`text-xl md:text-2xl font-black uppercase tracking-wide leading-relaxed ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
                Full-stack Developer <span className={`mx-2 text-brutal-red`}>|</span> Web, Mobile & AI Enthusiast
              </p>
              <div className={`flex items-center justify-center md:justify-start gap-2 text-muted-foreground`}>
                <MapPin className="w-4 h-4 text-brutal-red" />
                <span className="text-sm font-black tracking-wide uppercase italic">Malang, Jawa Timur</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="https://github.com/GwidoPutra" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-foreground bg-card text-foreground hover:bg-brutal-ink hover:text-white transition-colors brutal-shadow-sm">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-foreground bg-card text-foreground hover:bg-brutal-blue hover:text-white transition-colors brutal-shadow-sm">
                <Linkedin size={20} />
              </a>
              <button onClick={handleDownloadCV} className="brutal-btn-solid p-3">
                <FileDown size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Section 2: Summary */}
        <section className="border-2 border-foreground bg-brutal-yellow p-8 md:p-10 brutal-shadow-lg">
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 text-brutal-ink">
                <Layers size={20} />
                <h2 className="font-black uppercase tracking-widest text-xs">Career Summary</h2>
              </div>
              <p className="leading-relaxed text-lg font-bold text-justify text-brutal-ink/80">
                Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas.
              </p>
            </div>
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-brutal-red border-4 border-foreground rotate-6" />
              <img
                src="/profile.JPG"
                alt="Gwido Putra Wijaya"
                className="relative w-40 h-40 md:w-48 md:h-48 object-cover border-4 border-foreground brutal-shadow-lg -rotate-2 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Skills */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-[#f5f0e1]' : 'text-brutal-ink'}`}>Toolkit & Skills</h2>
            <div className="h-[2px] flex-1 border-t-2 border-dashed border-foreground"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div key={category.title} className={`${category.cardClass} border-2 border-foreground p-6 brutal-shadow`}>
                <div className="flex items-center gap-2 text-brutal-ink">
                  <category.icon className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {category.skills.map((skill) => (
                    <span key={skill} className="bg-card border-2 border-foreground px-3 py-1 text-[10px] font-black text-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Experience */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-[#f5f0e1]' : 'text-brutal-ink'}`}>Experience</h2>
            <div className="h-[2px] flex-1 border-t-2 border-dashed border-foreground"></div>
          </div>

          <div className="space-y-8">
            {allExperiences.map((exp) => (
              <div key={exp.title} className="group relative pl-8 before:absolute before:left-0 before:top-3 before:bottom-0 before:w-[2px] before:border-l-2 before:border-dashed before:border-foreground">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-brutal-yellow border-2 border-foreground rotate-45 group-hover:bg-brutal-red transition-colors" />

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={`text-xl font-black uppercase tracking-tight group-hover:text-brutal-blue transition-colors ${theme === 'dark' ? 'text-[#f5f0e1]' : 'text-brutal-ink'}`}>{exp.title}</h3>
                      <p className="text-sm font-black uppercase tracking-wider text-muted-foreground">{exp.organization}</p>
                    </div>
                    <span className="text-[10px] font-black text-brutal-ink bg-brutal-red border-2 border-foreground px-3 py-1 uppercase self-start sm:self-center leading-none brutal-shadow-sm">
                      {exp.period}
                    </span>
                  </div>

                  <p className={`leading-relaxed font-bold ${theme === 'dark' ? 'text-[#f5f0e1]/70' : 'text-brutal-ink/70'}`}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-black text-foreground border-2 border-foreground bg-card px-2 py-0.5 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.content && (
                    <div
                      className="mt-4 p-4 border-2 border-foreground bg-muted prose prose-sm max-w-none italic font-bold text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: marked(exp.content) }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Education */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-[#f5f0e1]' : 'text-brutal-ink'}`}>Education</h2>
            <div className="h-[2px] flex-1 border-t-2 border-dashed border-foreground"></div>
          </div>

          <div className="grid gap-6">
            {allEducations.map((education, idx) => (
              <div key={education.school} className={`${idx % 2 === 0 ? 'bg-brutal-cyan' : 'bg-brutal-purple'} border-2 border-foreground p-8 brutal-shadow group hover:-translate-y-0.5 transition-transform`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 border-2 border-foreground bg-card text-brutal-red brutal-shadow-sm group-hover:rotate-6 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black uppercase tracking-tight text-brutal-ink">{education.school}</h3>
                    <p className="leading-relaxed font-bold text-brutal-ink/75">{education.summary}</p>
                    <p className="leading-relaxed font-black text-brutal-ink/75">{education.startDate}-{education.endDate}</p>

                    {education.content && (
                      <div
                        className="prose prose-sm max-w-none p-6 border-2 border-foreground bg-card font-bold text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: marked(education.content) }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center pt-16 border-t-2 border-foreground`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-[#f5f0e1]/50' : 'text-brutal-ink/50'}`}>
            © {new Date().getFullYear()} Gwido Putra Wijaya · Built with Precision
          </p>
        </footer>
      </div>
    </div>
  )
}
