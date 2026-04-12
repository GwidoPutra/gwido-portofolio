import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Toaster } from "sonner"

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Gwido Putra — Profil',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <Toaster position="top-right" richColors />

        <Scripts />
      </body>
    </html>
  )
}