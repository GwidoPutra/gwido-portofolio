import { defineConfig, type Plugin } from 'vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

function apiPlugin(): Plugin {
  return {
    name: 'vite-api',
    configureServer(server) {
      server.middlewares.use('/api/guestbook', async (req, res, next) => {
        const { default: handler } = await import('./api/guestbook.ts')

        if (req.method === 'POST') {
          let body = ''
          for await (const chunk of req) body += chunk
          try { req.body = JSON.parse(body) } catch { req.body = {} }
        }

        const url = new URL(req.url!, `http://${req.headers.host}`)
        req.url = url.pathname + url.search
        ;(req as any).query = Object.fromEntries(url.searchParams)

        await handler(req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [
    contentCollections(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    viteReact(),
    apiPlugin(),
  ],
  build: {
    outDir: 'dist',
  },
})