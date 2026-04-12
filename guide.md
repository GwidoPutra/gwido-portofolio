# guide.md

Dokumen ini memberikan panduan struktur proyek bagi pengembang dan AI agent yang bekerja pada codebase portofolio ini.

## Project Overview

Sebuah aplikasi portofolio dan resume interaktif milik **Gwido Putra Wijaya**. Dibangun menggunakan TanStack Start dengan fokus pada performa tinggi dan pengalaman pengguna yang mulus.

### Tech Stack

| Layer             | Technology                                            |
| ----------------- | ----------------------------------------------------- |
| **Framework**     | TanStack Start (Full-stack React)                     |
| **Frontend**      | React 19, TanStack Router v1                          |
| **Build Tool**    | Vite 7                                                |
| **Styling**       | Tailwind CSS 4                                        |
| **UI Components** | Radix UI + Shadcn (Card, Badge, Separator, HoverCard) |
| **Icons**         | Lucide React                                          |
| **Content**       | Content Collections (Type-safe Markdown)              |
| **Deployment**    | Netlify                                               |

## Directory Structure

```text
├── content
│   ├── blog         # Artikel blog
│   ├── education    # Riwayat pendidikan
│   ├── experiences  # Pengalaman organisasi & kerja
│   └── projects     # Proyek
├── src
│   ├── components
│   │   ├── ui       # Komponen dasar
│   │   └── Header.tsx
│   ├── routes
│   │   ├── __root.tsx    # Root layout & Metadata SEO
│   │   ├── index.tsx      # Landing page / Blog index
│   │   ├── projects.tsx   # Halaman Proyek
│   │   ├── resume.tsx     # Halaman Resume
│   │   └── contact.tsx    # Halaman Kontak
│   ├── router.tsx         # Konfigurasi TanStack Router
│   └── styles.css         # Tailwind 4 & Global Styles
├── content-collections.ts  # Skema Zod untuk konten Markdown
└── vite.config.ts          # Konfigurasi Vite & Plugins
```
