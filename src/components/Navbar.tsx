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
    <nav className="fixed top-0 inset-x-0 z-50 border-b-4 border-foreground bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brutal-ink border-2 border-foreground flex items-center justify-center brutal-shadow-sm">
            <span className="text-brutal-cream font-black text-sm">G</span>
          </div>
          <span className="text-xl font-black uppercase tracking-tight text-foreground">
            Gwido<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-black uppercase tracking-wide">
          <Link to="/#about" className="hover:text-accent transition-colors text-foreground">About</Link>
          <Link to="/#skills" className="hover:text-accent transition-colors text-foreground">Skills</Link>
          <Link to="/#projects" className="hover:text-accent transition-colors text-foreground">Projects</Link>
          <button onClick={() => setResumeOpen(true)} className="hover:text-accent transition-colors text-foreground">Resume</button>
          <Link to="/contact" className="hover:text-accent transition-colors text-foreground">Contact</Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-foreground bg-card text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="mailto:gwidoputra@gmail.com" className="brutal-btn-solid !py-2.5 !px-6">
            Let's Talk
          </a>
        </div>

        {/* Mobile toggles */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-foreground bg-card text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 border-2 border-foreground bg-card text-foreground transition-colors"
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
            className="md:hidden border-t-2 border-foreground overflow-hidden bg-background"
          >
            <div className="px-6 py-4 space-y-1">
              <Link to="/#about" className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-accent transition-colors text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/#skills" className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-accent transition-colors text-foreground" onClick={() => setMobileMenuOpen(false)}>Skills</Link>
              <Link to="/#projects" className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-accent transition-colors text-foreground" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <button onClick={() => { setMobileMenuOpen(false); setResumeOpen(true) }} className="block w-full text-left py-2.5 text-sm font-black uppercase tracking-wide hover:text-accent transition-colors text-foreground">Resume</button>
              <Link to="/contact" className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-accent transition-colors text-foreground" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <a href="mailto:gwidoputra@gmail.com" className="brutal-btn-solid w-full mt-4 !px-6">Let's Talk</a>
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
