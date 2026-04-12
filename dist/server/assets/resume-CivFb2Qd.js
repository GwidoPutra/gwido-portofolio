import { jsxs, jsx } from "react/jsx-runtime";
import { marked } from "marked";
import { useNavigate } from "@tanstack/react-router";
import { a as allExperiences } from "./allExperiences-Q4mL4pxv.js";
import { B as Badge } from "./badge-BxI9hQBx.js";
import { ArrowLeft, FileDown, Sparkles, MapPin, Github, Linkedin, Layers, Wrench, Lightbulb, Cpu, GraduationCap } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const allEducations = [
  {
    "school": "Politeknik Negeri Malang",
    "summary": "D-IV Teknik Informatika - Jurusan Teknologi Informasi",
    "startDate": "2023",
    "endDate": "Present",
    "tags": [
      "Programming",
      "Software Engineering",
      "Database"
    ],
    "content": "Menempuh pendidikan di bidang Teknik Informatika dengan fokus pada pengembangan perangkat lunak, sistem informasi, dan teknologi berbasis web.",
    "_meta": {
      "filePath": "polinema.md",
      "fileName": "polinema.md",
      "directory": ".",
      "extension": "md",
      "path": "polinema"
    }
  },
  {
    "school": "SMA Negeri 20 Surabaya",
    "summary": "Jurusan IPS",
    "startDate": "2019",
    "endDate": "2023",
    "tags": [
      "Social Science",
      "Economics",
      "Management"
    ],
    "content": "",
    "_meta": {
      "filePath": "sma-20.md",
      "fileName": "sma-20.md",
      "directory": ".",
      "extension": "md",
      "path": "sma-20"
    }
  }
];
const skillCategories = [{
  title: "Technical Skills",
  icon: Wrench,
  skills: ["React", "TypeScript", "Node.js", "Laravel", "Flutter", "Tailwind CSS", "SQL", "Python"]
}, {
  title: "Soft Skills",
  icon: Lightbulb,
  skills: ["Leadership", "Team Management", "Public Speaking", "Problem Solving", "Strategic Planning", "Collaboration", "Event Coordination"]
}, {
  title: "Interests & Focus",
  icon: Cpu,
  skills: ["Full-stack Development", "Mobile App Development", "AI/ML Exploration", "IoT Integration", "UI/UX Design"]
}];
function App() {
  const navigate = useNavigate();
  const handleDownloadCV = () => {
    const cvUrl = "/CV_Gwido_Putra_Wijaya.pdf";
    window.open(cvUrl, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#fafafa] dark:bg-[#020617] text-foreground font-sans selection:bg-blue-500/10 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed top-6 inset-x-0 z-50 flex justify-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-2xl justify-between", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate({
        to: ".."
      }), className: "group flex items-center gap-2 px-3 py-1.5 text-sm font-bold transition-all rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Kembali" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" }),
        /* @__PURE__ */ jsxs("button", { onClick: handleDownloadCV, className: "flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95", children: [
          /* @__PURE__ */ jsx(FileDown, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: "Unduh CV" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-16", children: [
      /* @__PURE__ */ jsx("header", { className: "relative space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 text-[10px] font-black tracking-widest uppercase", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 12 }),
            " Available for Work"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 leading-tight", children: "Gwido Putra Wijaya" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed", children: [
            "Full-stack Developer ",
            /* @__PURE__ */ jsx("span", { className: "text-slate-300 mx-2", children: "|" }),
            " Web, Mobile & AI Enthusiast"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2 text-slate-400", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold tracking-wide uppercase italic", children: "Malang, Jawa Timur" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "https://github.com/GwidoPutra", target: "_blank", className: "p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-all shadow-sm", children: /* @__PURE__ */ jsx(Github, { size: 20 }) }),
          /* @__PURE__ */ jsx("a", { href: "https://linkedin.com/in/gwido-putra-wijaya", target: "_blank", className: "p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-all shadow-sm", children: /* @__PURE__ */ jsx(Linkedin, { size: 20 }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "group relative p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row items-center gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600", children: [
              /* @__PURE__ */ jsx(Layers, { size: 20 }),
              /* @__PURE__ */ jsx("h2", { className: "font-black uppercase tracking-widest text-xs", children: "Career Summary" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-lg text-slate-600 dark:text-slate-400 font-medium text-justify", children: "Saya merupakan mahasiswa D-IV Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan aplikasi web dan mobile secara Full-stack. Berpengalaman di HMTI Polinema untuk mengasah kepemimpinan sambil tetap berfokus pada teknologi AI dan sistem cerdas." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-600/20 blur-2xl rounded-full group-hover:scale-110 transition-transform duration-700" }),
            /* @__PURE__ */ jsx("img", { src: "/profile.JPG", alt: "Gwido Putra Wijaya", className: "relative w-40 h-40 md:w-48 md:h-48 rounded-[2rem] object-cover border-4 border-white dark:border-slate-800 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 dark:text-white", children: "Toolkit & Skills" }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: skillCategories.map((category) => /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600", children: [
            /* @__PURE__ */ jsx(category.icon, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: category.title })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: category.skills.map((skill) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none px-3 py-1 rounded-lg text-[10px] font-bold", children: skill }, skill)) })
        ] }, category.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 dark:text-white", children: "Experience" }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-8", children: allExperiences.map((exp) => /* @__PURE__ */ jsxs("div", { className: "group relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800 hover:before:bg-blue-500 transition-all duration-500", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 group-hover:scale-150 transition-all shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#020617]" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors", children: exp.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-400 uppercase tracking-wider", children: exp.organization })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full uppercase self-start sm:self-center leading-none", children: exp.period })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 leading-relaxed font-medium", children: exp.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: exp.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md uppercase", children: tag }, tag)) }),
            exp.content && /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 prose prose-sm dark:prose-invert max-w-none italic text-slate-500", dangerouslySetInnerHTML: {
              __html: marked(exp.content)
            } })
          ] })
        ] }, exp.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 dark:text-white", children: "Education" }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: allEducations.map((education) => /* @__PURE__ */ jsx("div", { className: "p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-500 transition-all", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 group-hover:rotate-6 transition-transform", children: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-900 dark:text-white", children: education.school }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 leading-relaxed font-medium", children: education.summary }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400 leading-relaxed font-medium", children: [
              education.startDate,
              "-",
              education.endDate
            ] }),
            education.content && /* @__PURE__ */ jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50", dangerouslySetInnerHTML: {
              __html: marked(education.content)
            } })
          ] })
        ] }) }, education.school)) })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "text-center pt-16 border-t border-slate-100 dark:border-slate-800", children: /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-400", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Gwido Putra Wijaya · Built with Precision"
      ] }) })
    ] })
  ] });
}
export {
  App as component
};
