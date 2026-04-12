import { marked } from 'marked'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { allEducations, allExperiences } from 'content-collections'
import { Badge } from '@/components/ui/badge'
import { 
  Github, 
  Linkedin, 
  MapPin,  
  GraduationCap, 
  Layers,
  ArrowLeft,
  Wrench,
  Cpu,
  Lightbulb,
  FileDown,
  Sparkles
} from "lucide-react"

export const Route = createFileRoute('/resume')({
  component: App,
})

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

function App() {
  const navigate = useNavigate()

  const handleDownloadCV = () => {
    // Ganti URL ini dengan path file PDF CV Anda yang sebenarnya di folder public
    const cvUrl = '/CV_Gwido_Putra_Wijaya.pdf'
    window.open(cvUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020617] text-foreground font-sans selection:bg-blue-500/10 transition-colors duration-300">
      
      {/* --- MODERN FLOATING NAVBAR --- */}
      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-2xl justify-between">
          <button 
            onClick={() => navigate({ to: '..' })} 
            className="group flex items-center gap-2 px-3 py-1.5 text-sm font-bold transition-all rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="flex items-center gap-2">
             <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
             <button 
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                <FileDown size={16} />
                <span>Unduh CV</span>
              </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-16">
        
        {/* SECTION 1: HEADER */}
        <header className="relative space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 text-[10px] font-black tracking-widest uppercase">
                <Sparkles size={12} /> Available for Work
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 leading-tight">
                Gwido Putra Wijaya
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Full-stack Developer <span className="text-slate-300 mx-2">|</span> Web, Mobile & AI Enthusiast
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase italic">Malang, Jawa Timur</span>
              </div>
            </div>

            <div className="flex gap-3">
               <a href="https://github.com/GwidoPutra" target="_blank" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-all shadow-sm">
                  <Github size={20} />
               </a>
               <a href="https://linkedin.com/in/gwido-putra-wijaya" target="_blank" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-all shadow-sm">
                  <Linkedin size={20} />
               </a>
            </div>
          </div>
        </header>

        {/* SECTION 2: SUMMARY */}
        <section className="group relative p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 text-blue-600">
                <Layers size={20} />
                <h2 className="font-black uppercase tracking-widest text-xs">Career Summary</h2>
              </div>
              <p className="leading-relaxed text-lg text-slate-600 dark:text-slate-400 font-medium text-justify">
                Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas.
              </p>
            </div>
            <div className="relative shrink-0">
               <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full group-hover:scale-110 transition-transform duration-700" />
               <img
                src="/profile.JPG"
                alt="Gwido Putra Wijaya"
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-[2rem] object-cover border-4 border-white dark:border-slate-800 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500"
               />
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Toolkit & Skills</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div key={category.title} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-blue-600">
                  <category.icon className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none px-3 py-1 rounded-lg text-[10px] font-bold">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: EXPERIENCE */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Experience</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
          </div>

          <div className="space-y-8">
            {allExperiences.map((exp) => (
              <div key={exp.title} className="group relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800 hover:before:bg-blue-500 transition-all duration-500">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 group-hover:scale-150 transition-all shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#020617]" />
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{exp.title}</h3>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{exp.organization}</p>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full uppercase self-start sm:self-center leading-none">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-black text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.content && (
                    <div
                      className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 prose prose-sm dark:prose-invert max-w-none italic text-slate-500"
                      dangerouslySetInnerHTML={{ __html: marked(exp.content) }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: EDUCATION */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Education</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
          </div>

          <div className="grid gap-6">
            {allEducations.map((education) => (
              <div key={education.school} className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-500 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 group-hover:rotate-6 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{education.school}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{education.summary}</p>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{education.startDate}-{education.endDate}</p>

                    
                    {education.content && (
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50"
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
        <footer className="text-center pt-16 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            © {new Date().getFullYear()} Gwido Putra Wijaya · Built with Precision
          </p>
        </footer>
      </div>
    </div>
  )
}