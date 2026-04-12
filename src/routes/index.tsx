import { createFileRoute, Link } from '@tanstack/react-router'
import { allExperiences, allProjects } from 'content-collections'

import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowDown,
  Code2,
  Briefcase,
  GraduationCap,
  FolderDot,
  Sparkles,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

const skills = {
  'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
  'Backend': ['Node.js', 'REST APIs', 'SQL', 'PostgreSQL', 'Firebase', 'Laravel'],
  'Alat & Platform': ['Git', 'Docker', 'Figma', 'Vercel', 'PostMan', 'Android Studio'],
}

const highlights = [
  {
    icon: Code2,
    title: 'Stack Modern',
    description: 'Web ini dibuat dengan teknologi web terbaru — React 19, TypeScript, dan TanStack.',
  },
  {
    icon: Briefcase,
    title: 'Pengalaman Organisasi',
    description: 'Berpengalaman mengelola departemen Ristek, Minat, dan Bakat di HMTI Polinema (2024-2026).',
  },
  {
    icon: GraduationCap,
    title: 'Pendidikan',
    description: 'Mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang.',
  },
]

function Portfolio() {
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-blue-500/10 selection:text-blue-600 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center">
          <div className="group relative mb-8">
             <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
             <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden ring-1 ring-white/20 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <img src="/profile.JPG" alt="Gwido Putra" className="w-full h-full object-cover" />
             </div>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
              <Sparkles size={12} /> Terbuka untuk Peluang Kerja
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              Gwido Putra Wijaya
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Mahasiswa <span className="text-white">Teknik Informatika</span> yang memiliki minat pada pembangunan solusi digital yang estetis dan berkinerja tinggi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="mailto:gwidoputra@gmail.com" className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-all text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20">
              <Mail size={18} className="group-hover:rotate-12 transition-transform" /> Hubungi Saya
            </a>
            <Link to="/resume" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-all text-white px-8 py-4 rounded-2xl font-bold border border-white/10 backdrop-blur-md">
              Short Resume
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-12 text-slate-500">
            <a href="https://github.com/GwidoPutra" target="_blank" className="hover:text-blue-400 transition-all hover:-translate-y-1"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/gwido-putra-wijaya/" target="_blank" className="hover:text-blue-400 transition-all hover:-translate-y-1"><Linkedin size={24} /></a>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce opacity-50">
            <ArrowDown size={20} />
          </div>
        </div>
      </section>
            
      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-6 -mt-12 relative z-10">
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: 'Proyek Selesai', value: '5+' },
            { label: 'Tahun Belajar', value: '2+' },
            { label: 'Tech Stack', value: '5+' },
          ].map((stat) => (
            <div key={stat.label} className="w-[calc(50%-0.75rem)] md:w-44 bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-blue-200 transition-all hover:-translate-y-1 group text-center">
              <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{stat.value}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Membangun <span className="text-blue-600 italic font-serif">Kualitas</span> lewat Baris Kode.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Saya percaya bahwa teknologi harus memudahkan hidup. Melalui ekosistem <span className="font-semibold text-slate-900">Web Modern</span> dan <span className="font-semibold text-slate-900">Mobile</span>, saya membantu mengubah ide menjadi kenyataan.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-2 text-blue-600 font-bold group">
              Jelajahi semua proyek <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid gap-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0"><item.icon size={22} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - UPDATED WITH "Lihat Detail" */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="flex justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Timeline</p>
            <h2 className="text-4xl font-bold text-slate-900">Pengalaman Organisasi & Pekerjaan</h2>
          </div>
          {/* Tombol Lihat Detail yang tetap dipertahankan */}
          <Link to="/resume" className="text-blue-600 font-bold hover:underline text-sm flex items-center gap-1 group">
            Lihat detail <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {allExperiences.map((exp) => (
            <div key={exp.title} className="group relative p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-100 transition-all shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest ring-1 ring-slate-100">
                  {exp.period}
                </span>
                <Briefcase size={20} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{exp.title}</h3>
              <p className="text-blue-600/70 font-semibold text-sm mb-4">{exp.organization}</p>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-2">
              <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Featured Work</p>
              <h2 className="text-4xl font-bold text-slate-900">Proyek Unggulan</h2>
            </div>
            <Link to="/projects" className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg">
              Lihat Semua Proyek
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.title} className="group flex flex-col h-full bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
                <div className="p-8 pb-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                      <FolderDot size={24} />
                    </div>
                    {project.github && (
                      <a href={project.github} target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors p-2"><Github size={20} /></a>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="bg-[#020617] text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white">Toolkit Teknis</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Teknologi yang saya gunakan untuk membawa konsep ke dunia digital.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="relative rounded-[3rem] bg-blue-600 p-12 md:p-24 overflow-hidden text-center shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Mari membangun sesuatu yang hebat bersama
            </h2>
            <p className="text-blue-100 text-lg opacity-80 font-medium leading-relaxed">
              Terbuka untuk kolaborasi proyek, freelance, atau peluang kerja tetap.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a href="mailto:gwidoputra@gmail.com" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl">
                <Mail size={18} /> Kirim Email
              </a>
              <a href="https://www.linkedin.com/in/gwido-putra-wijaya/" target="_blank" className="bg-blue-700/50 text-white hover:bg-blue-700/70 border border-blue-400/30 px-10 py-5 rounded-2xl font-bold transition-all">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-16 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Gwido Putra Wijaya · Dibuat dengan React & TanStack
        </p>
      </footer>
    </div>
  )
}