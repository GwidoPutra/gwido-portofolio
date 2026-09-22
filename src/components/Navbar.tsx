import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { ResumeModal } from './ResumeModal'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-base">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Gwido<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</Link>
          <Link to="/#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
          <button onClick={() => setResumeOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">Resume</button>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="mailto:gwidoputra@gmail.com" className="btn-solid">
            Let's Talk
          </a>
        </div>

        {/* Mobile toggles */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border overflow-hidden bg-background/95 backdrop-blur"
          >
            <div className="px-6 py-4 space-y-1">
              <Link to="/#about" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/#skills" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Skills</Link>
              <Link to="/#projects" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <button onClick={() => { setMobileMenuOpen(false); setResumeOpen(true) }} className="block w-full text-left py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resume</button>
              <Link to="/contact" className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <a href="mailto:gwidoputra@gmail.com" className="btn-solid w-full mt-4">Let's Talk</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
    </nav>
  )
}
