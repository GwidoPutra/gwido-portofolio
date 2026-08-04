import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, Layers, Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { ResumeModal } from './ResumeModal'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 border-b-4 border-foreground transition-colors duration-300 ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 bg-brutal-yellow border-2 border-foreground flex items-center justify-center brutal-shadow-sm">
            <Layers className="text-brutal-ink w-5 h-5" />
          </div>
          <span className="text-xl font-black uppercase tracking-tight text-foreground">gwidoputra</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-black uppercase tracking-wide">
          <Link to="/#services" className="hover:text-brutal-blue transition-colors text-foreground">Layanan</Link>
          <Link to="/#expertise" className="hover:text-brutal-blue transition-colors text-foreground">TechStack</Link>
          <Link to="/#portfolio" className="hover:text-brutal-blue transition-colors text-foreground">Portofolio</Link>
          <button onClick={() => setResumeOpen(true)} className="hover:text-brutal-blue transition-colors text-foreground">Short Resume</button>
          <Link to="/contact" className="hover:text-brutal-blue transition-colors text-foreground">Kontak</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-foreground bg-card text-foreground hover:bg-brutal-yellow transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="mailto:gwidoputra@gmail.com" className="brutal-btn-solid !py-2.5 !px-6">
            Hubungi Saya
          </a>
        </div>

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
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t-2 border-foreground overflow-hidden ${theme === 'dark' ? 'bg-brutal-dark' : 'bg-brutal-cream'}`}
          >
            <div className="px-6 py-4 space-y-1">
              <Link
                to="/#services"
                className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Layanan
              </Link>
              <Link
                to="/#expertise"
                className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                TechStack
              </Link>
              <Link
                to="/#portfolio"
                className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portofolio
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setResumeOpen(true) }}
                className="block w-full text-left py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
              >
                Short Resume
              </button>
              <Link
                to="/contact"
                className="block py-2.5 text-sm font-black uppercase tracking-wide hover:text-brutal-blue transition-colors text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontak
              </Link>
              <a
                href="mailto:gwidoputra@gmail.com"
                className="brutal-btn-solid w-full mt-4 !px-6"
              >
                Hubungi Saya
              </a>
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
