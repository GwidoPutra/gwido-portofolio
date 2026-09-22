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
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/resume')({
  component: App,
})

const skillCategories = [
  {
    title: "Technical Skills",
    icon: Wrench,
    skills: ["React", "TypeScript", "Node.js", "Laravel", "Flutter", "Tailwind CSS", "SQL", "Python"],
    cardClass: "surface-card-base",
  },
  {
    title: "Soft Skills",
    icon: Lightbulb,
    skills: ["Leadership", "Team Management", "Public Speaking", "Problem Solving", "Strategic Planning", "Collaboration", "Event Coordination"],
    cardClass: "surface-card-base",
  },
  {
    title: "Interests & Focus",
    icon: Cpu,
    skills: ["Full-stack Development", "Mobile App Development", "AI/ML Exploration", "IoT Integration", "UI/UX Design"],
    cardClass: "surface-card-base",
  }
]

function App() {

  const handleDownloadCV = () => {
    const cvUrl = '/CV_Gwido_Putra_Wijaya.pdf'
    window.open(cvUrl, '_blank')
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-16">

        {/* Section 1: Header */}
        <header className="relative space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-accent/10 text-accent px-4 py-1.5 text-[10px] font-medium tracking-widest uppercase">
                <Sparkles size={12} /> Available for Work
              </div>
              <h1 className={`text-4xl md:text-6xl font-bold tracking-tight leading-tight text-foreground`}>
                Gwido Putra Wijaya
              </h1>
              <p className={`text-xl md:text-2xl font-bold tracking-wide leading-relaxed text-muted-foreground`}>
                Full-stack Developer <span className={`mx-2 text-accent`}>|</span> Web, Mobile & AI Enthusiast
              </p>
              <div className={`flex items-center justify-center md:justify-start gap-2 text-muted-foreground`}>
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium tracking-wide uppercase italic">Malang, Jawa Timur</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="https://github.com/GwidoPutra" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Linkedin size={20} />
              </a>
              <button onClick={handleDownloadCV} className="btn-solid p-3">
                <FileDown size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Section 2: Summary */}
        <section className="surface-card-base p-8 md:p-10">
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 text-foreground">
                <Layers size={20} />
                <h2 className="font-medium tracking-widest text-xs">Career Summary</h2>
              </div>
              <p className="leading-relaxed text-lg font-normal text-justify text-muted-foreground">
                Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas.
              </p>
            </div>
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-accent/20 border border-border rotate-6" />
              <img
                src="/profile.JPG"
                alt="Gwido Putra Wijaya"
                className="relative w-40 h-40 md:w-48 md:h-48 object-cover rounded-xl border border-border -rotate-2 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Skills */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-bold tracking-tight text-foreground`}>Toolkit & Skills</h2>
            <div className="h-[2px] flex-1 border-t border-dashed border-border"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div key={category.title} className={`${category.cardClass} p-6`}>
                <div className="flex items-center gap-2 text-foreground">
                  <category.icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium uppercase tracking-widest">{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {category.skills.map((skill) => (
                    <span key={skill} className="tech-chip text-[10px]">
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
            <h2 className={`text-3xl font-bold tracking-tight text-foreground`}>Experience</h2>
            <div className="h-[2px] flex-1 border-t border-dashed border-border"></div>
          </div>

          <div className="space-y-8">
            {allExperiences.map((exp) => (
              <div key={exp.title} className="group relative pl-8 before:absolute before:left-0 before:top-3 before:bottom-0 before:w-[2px] before:border-l-2 before:border-dashed before:border-border">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-secondary border border-border group-hover:bg-accent transition-colors" />

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={`text-xl font-bold tracking-tight group-hover:text-accent transition-colors text-foreground`}>{exp.title}</h3>
                      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{exp.organization}</p>
                    </div>
                    <span className="text-[10px] font-medium rounded-md bg-accent/10 text-accent border border-border px-3 py-1 uppercase self-start sm:self-center leading-none">
                      {exp.period}
                    </span>
                  </div>

                  <p className={`leading-relaxed font-normal text-muted-foreground`}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tech-chip text-[9px] uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.content && (
                    <div
                      className="mt-4 p-4 rounded-lg border border-border bg-muted prose prose-sm max-w-none italic font-normal text-muted-foreground"
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
            <h2 className={`text-3xl font-bold tracking-tight text-foreground`}>Education</h2>
            <div className="h-[2px] flex-1 border-t border-dashed border-border"></div>
          </div>

          <div className="grid gap-6">
            {allEducations.map((education) => (
              <div key={education.school} className={`surface-card-base surface-card-hover p-8 group transition-transform`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg border border-border bg-accent/10 text-accent group-hover:rotate-6 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{education.school}</h3>
                    <p className="leading-relaxed font-normal text-muted-foreground">{education.summary}</p>
                    <p className="leading-relaxed font-medium text-muted-foreground">{education.startDate}-{education.endDate}</p>

                    {education.content && (
                      <div
                        className="prose prose-sm max-w-none p-6 rounded-lg border border-border bg-card font-normal text-muted-foreground"
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
        <footer className={`text-center pt-16 border-t border-border`}>
          <p className={`text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/70`}>
            © {new Date().getFullYear()} Gwido Putra Wijaya · Built with Precision
          </p>
        </footer>
      </div>
    </div>
  )
}
