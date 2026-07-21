import { defineConfig, type Plugin } from 'vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { config as loadDotenv } from 'dotenv'

function apiPlugin(): Plugin {
  return {
    name: 'vite-api',
    configureServer(server) {
      loadDotenv()

      // Dynamic paths so Vite/esbuild does not resolve server modules during `vite build`
      const guestbookModuleUrl = pathToFileURL(
        path.resolve(import.meta.dirname, 'api/guestbook.ts'),
      ).href
      const chatModuleUrl = pathToFileURL(
        path.resolve(import.meta.dirname, 'api/chat.ts'),
      ).href

      const mountApi = (route: string, moduleUrl: string) => {
        server.middlewares.use(route, async (req, res) => {
          try {
            const { default: handler } = await import(`${moduleUrl}?t=${Date.now()}`)

            if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
              let body = ''
              for await (const chunk of req) body += chunk
              try {
                ;(req as any).body = body ? JSON.parse(body) : {}
              } catch {
                ;(req as any).body = {}
              }
            }

            const url = new URL(req.url!, `http://${req.headers.host}`)
            req.url = url.pathname + url.search
            ;(req as any).query = Object.fromEntries(url.searchParams)

            await handler(req, res)
          } catch (err) {
            console.error(`API ${route} error:`, err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
        })
      }

      mountApi('/api/guestbook', guestbookModuleUrl)
      mountApi('/api/chat', chatModuleUrl)
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
