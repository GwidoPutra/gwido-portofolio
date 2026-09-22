import { createRootRoute, useLocation, Outlet } from '@tanstack/react-router'
import { Toaster } from "sonner"
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()
  
  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      
      <ThemedToaster />
    </ThemeProvider>
  )
}

// Toaster mengikuti tema aktif dan memakai warna surface/border yang sama.
function ThemedToaster() {
  const { theme } = useTheme()
  return (
    <Toaster
      position="top-right"
      theme={theme}
      toastOptions={{
        style: {
          background: 'var(--surface)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
        },
      }}
    />
  )
}
