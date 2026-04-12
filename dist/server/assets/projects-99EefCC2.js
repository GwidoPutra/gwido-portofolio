import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { a as allProjects } from "./allProjects-BdxX0F8H.js";
import { c as cn, B as Badge } from "./badge-BxI9hQBx.js";
import { ArrowLeft, Sparkles, FolderOpen, Github, ExternalLink, FileText } from "lucide-react";
import { toast } from "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function Projects() {
  const navigate = useNavigate();
  const handleUnderDevelopment = (type) => {
    toast.info(`${type} Sedang Disiapkan`, {
      description: "Fitur ini masih dalam tahap pengerjaan.",
      duration: 3e3
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#fafafa] dark:bg-[#020617] font-sans selection:bg-blue-500/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate({
        to: ".."
      }), className: "group flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 hover:text-blue-600", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
        "Kembali"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 12 }),
          " Portofolio Karya"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6", children: [
          "Projects",
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed", children: "Eksplorasi solusi digital melalui kode. Kumpulan proyek pengembangan web, mobile, dan eksperimen teknologi." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8", children: allProjects.map((project) => /* @__PURE__ */ jsxs(Card, { className: "group flex flex-col bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "p-8 pb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all", children: /* @__PURE__ */ jsx(FolderOpen, { size: 24 }) }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" }) })
        ] }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-black text-slate-900 dark:text-white leading-tight", children: project.title })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "px-8 pb-8 flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 mb-8 flex-1 line-clamp-3 text-sm font-medium leading-relaxed", children: project.description }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: project.tags.map((tag) => /* @__PURE__ */ jsx(Badge, { className: "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", children: tag }, tag)) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-slate-50 dark:border-slate-800/50 flex flex-wrap gap-6", children: [
          project.github && /* @__PURE__ */ jsxs("a", { href: project.github, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors tracking-[0.15em]", children: [
            /* @__PURE__ */ jsx(Github, { size: 16 }),
            "GITHUB"
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => handleUnderDevelopment("Live Demo"), className: "flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors tracking-[0.15em]", children: [
            /* @__PURE__ */ jsx(ExternalLink, { size: 16 }),
            "LIVE DEMO"
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => handleUnderDevelopment("Dokumentasi"), className: "flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-green-600 transition-colors tracking-[0.15em]", children: [
            /* @__PURE__ */ jsx(FileText, { size: 16 }),
            "DOCS"
          ] })
        ] })
      ] })
    ] }, project._meta.path)) }),
    /* @__PURE__ */ jsx("div", { className: "pt-16 text-center border-t border-slate-100 dark:border-slate-900", children: /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-400", children: [
      "Total ",
      allProjects.length,
      " Proyek Terdaftar"
    ] }) })
  ] }) });
}
export {
  Projects as component
};
