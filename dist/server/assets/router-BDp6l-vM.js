import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { Toaster } from "sonner";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Gwido Putra — Profil"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./resume-CivFb2Qd.js");
const Route$3 = createFileRoute("/resume")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./projects-99EefCC2.js");
const Route$2 = createFileRoute("/projects")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./contact-WiKvVM2d.js");
const Route$1 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DTCnaf96.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResumeRoute = Route$3.update({
  id: "/resume",
  path: "/resume",
  getParentRoute: () => Route$4
});
const ProjectsRoute = Route$2.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$4
});
const ContactRoute = Route$1.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  ProjectsRoute,
  ResumeRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
