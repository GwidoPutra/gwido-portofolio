import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X, Layers, Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { ResumeModal } from './ResumeModal'

export const Navbar = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${theme === 'dark' ? 'bg-[#020617]/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Layers className="text-white w-5 h-5" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>gwidoputra</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/#services" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Layanan</Link>
          <Link to="/#expertise" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>TechStack</Link>
          <Link to="/#portfolio" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Portofolio</Link>
          <button onClick={() => setResumeOpen(true)} className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Short Resume</button>
          <Link to="/contact" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Kontak</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="mailto:gwidoputra@gmail.com" className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600 text-white' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}>
            Hubungi Saya
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b overflow-hidden ${theme === 'dark' ? 'bg-[#020617] border-slate-800' : 'bg-white border-slate-100'}`}
          >
            <div className="px-6 py-4 space-y-3">
              <Link
                to="/#services"
                className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Layanan
              </Link>
              <Link
                to="/#expertise"
                className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                TechStack
              </Link>
              <Link
                to="/#portfolio"
                className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Portofolio
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setResumeOpen(true) }}
                className={`block w-full text-left py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
              >
                Short Resume
              </button>
              <Link
                to="/contact"
                className={`block py-2 text-sm font-medium hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontak
              </Link>
              <a
                href="mailto:gwidoputra@gmail.com"
                className={`block w-full text-center px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md mt-4 ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600 text-white' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}
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
