import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { a as allProjects } from "./allProjects-BdxX0F8H.js";
import { a as allExperiences } from "./allExperiences-Q4mL4pxv.js";
import { Sparkles, Mail, Github, Linkedin, ArrowDown, ExternalLink, Code2, Briefcase, GraduationCap, FolderDot } from "lucide-react";
const skills = {
  "Frontend": ["React", "TypeScript", "Tailwind CSS", "Vite", "Next.js"],
  "Backend": ["Node.js", "REST APIs", "SQL", "PostgreSQL", "Firebase", "Laravel"],
  "Alat & Platform": ["Git", "Docker", "Figma", "Vercel", "PostMan", "Android Studio"]
};
const highlights = [{
  icon: Code2,
  title: "Stack Modern",
  description: "Web ini dibuat dengan teknologi web terbaru — React 19, TypeScript, dan TanStack."
}, {
  icon: Briefcase,
  title: "Pengalaman Organisasi",
  description: "Berpengalaman mengelola departemen Ristek, Minat, dan Bakat di HMTI Polinema (2024-2026)."
}, {
  icon: GraduationCap,
  title: "Pendidikan",
  description: "Mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang."
}];
function Portfolio() {
  const featuredProjects = allProjects.slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#fafafa] text-slate-900 selection:bg-blue-500/10 selection:text-blue-600 font-sans", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-[#020617] text-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-6xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "group relative mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" }),
          /* @__PURE__ */ jsx("div", { className: "relative w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden ring-1 ring-white/20 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: "/profile.JPG", alt: "Gwido Putra", className: "w-full h-full object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-3xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 12 }),
            " Terbuka untuk Peluang Kerja"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50", children: "Gwido Putra Wijaya" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto", children: [
            "Mahasiswa ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "Teknik Informatika" }),
            " yang memiliki minat pada pembangunan solusi digital yang estetis dan berkinerja tinggi. Selalu siap untuk belajar dan berkembang."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 mt-10", children: [
          /* @__PURE__ */ jsxs("a", { href: "mailto:gwidoputra@gmail.com", className: "group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-all text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20", children: [
            /* @__PURE__ */ jsx(Mail, { size: 18, className: "group-hover:rotate-12 transition-transform" }),
            " Hubungi Saya"
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/resume", className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-all text-white px-8 py-4 rounded-2xl font-bold border border-white/10 backdrop-blur-md", children: "Short Resume" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mt-12 text-slate-500", children: [
          /* @__PURE__ */ jsx("a", { href: "https://github.com/GwidoPutra", target: "_blank", className: "hover:text-blue-400 transition-all hover:-translate-y-1", children: /* @__PURE__ */ jsx(Github, { size: 24 }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/gwido-putra-wijaya/", target: "_blank", className: "hover:text-blue-400 transition-all hover:-translate-y-1", children: /* @__PURE__ */ jsx(Linkedin, { size: 24 }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce opacity-50", children: /* @__PURE__ */ jsx(ArrowDown, { size: 20 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "max-w-5xl mx-auto px-6 -mt-12 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: [{
      label: "Proyek Selesai",
      value: "5+"
    }, {
      label: "Tahun Belajar",
      value: "2+"
    }, {
      label: "Tech Stack",
      value: "5+"
    }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "w-[calc(50%-0.75rem)] md:w-44 bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-blue-200 transition-all hover:-translate-y-1 group text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors", children: stat.value }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1", children: stat.label })
    ] }, stat.label)) }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-6xl mx-auto px-6 py-32", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-20 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-bold tracking-tight text-slate-900", children: [
          "Membangun ",
          /* @__PURE__ */ jsx("span", { className: "text-blue-600 italic font-serif", children: "Kualitas" }),
          " lewat Baris Kode."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-slate-600 leading-relaxed", children: [
          "Saya percaya bahwa teknologi harus memudahkan hidup. Melalui ekosistem ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: "Web Modern" }),
          " dan ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: "Mobile" }),
          ", saya membantu mengubah ide menjadi kenyataan."
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-2 text-blue-600 font-bold group", children: [
          "Jelajahi semua proyek ",
          /* @__PURE__ */ jsx(ExternalLink, { size: 18, className: "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: highlights.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0", children: /* @__PURE__ */ jsx(item.icon, { size: 22 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 mb-1", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm leading-relaxed", children: item.description })
        ] })
      ] }, item.title)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 py-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-16 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-blue-600 font-bold uppercase tracking-widest text-xs", children: "Timeline" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-slate-900", children: "Pengalaman Organisasi & Pekerjaan" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/resume", className: "text-blue-600 font-bold hover:underline text-sm flex items-center gap-1 group", children: [
          "Lihat detail ",
          /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1 transition-transform", children: "→" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: allExperiences.map((exp) => /* @__PURE__ */ jsxs("div", { className: "group relative p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-100 transition-all shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest ring-1 ring-slate-100", children: exp.period }),
          /* @__PURE__ */ jsx(Briefcase, { size: 20, className: "text-slate-200 group-hover:text-blue-500 transition-colors" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors", children: exp.title }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-600/70 font-semibold text-sm mb-4", children: exp.organization }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm leading-relaxed line-clamp-3", children: exp.description })
      ] }, exp.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-50 py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-blue-600 font-bold uppercase tracking-widest text-xs", children: "Featured Work" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-slate-900", children: "Proyek Unggulan" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/projects", className: "bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg", children: "Lihat Semua Proyek" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: featuredProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "group flex flex-col h-full bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-8 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all", children: /* @__PURE__ */ jsx(FolderDot, { size: 24 }) }),
            project.github && /* @__PURE__ */ jsx("a", { href: project.github, target: "_blank", className: "text-slate-400 hover:text-slate-900 transition-colors p-2", children: /* @__PURE__ */ jsx(Github, { size: 20 }) })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors", children: project.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm line-clamp-3 leading-relaxed", children: project.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto p-8 pt-0", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-md", children: tag }, tag)) }) })
      ] }, project.title)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "bg-[#020617] text-white py-32 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-20 space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold tracking-tight text-white", children: "Toolkit Teknis" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-xl mx-auto", children: "Teknologi yang saya gunakan untuk membawa konsep ke dunia digital." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-12", children: Object.entries(skills).map(([category, items]) => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-blue-400 text-xs font-black uppercase tracking-[0.2em]", children: category }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: items.map((skill) => /* @__PURE__ */ jsx("span", { className: "px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-default", children: skill }, skill)) })
        ] }, category)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "max-w-6xl mx-auto px-6 py-32", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-[3rem] bg-blue-600 p-12 md:p-24 overflow-hidden text-center shadow-2xl shadow-blue-500/20", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-2xl mx-auto space-y-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-black text-white leading-tight", children: "Mari membangun sesuatu yang hebat bersama" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-lg opacity-80 font-medium leading-relaxed", children: "Terbuka untuk kolaborasi proyek, freelance, atau peluang kerja tetap." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4 pt-4", children: [
          /* @__PURE__ */ jsxs("a", { href: "mailto:gwidoputra@gmail.com", className: "bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl", children: [
            /* @__PURE__ */ jsx(Mail, { size: 18 }),
            " Kirim Email"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://www.linkedin.com/in/gwido-putra-wijaya/", target: "_blank", className: "bg-blue-700/50 text-white hover:bg-blue-700/70 border border-blue-400/30 px-10 py-5 rounded-2xl font-bold transition-all", children: [
            /* @__PURE__ */ jsx(Linkedin, { size: 18 }),
            " LinkedIn"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-slate-100 py-16 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-xs font-bold uppercase tracking-widest", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Gwido Putra Wijaya · Dibuat dengan React & TanStack"
    ] }) })
  ] });
}
export {
  Portfolio as component
};
