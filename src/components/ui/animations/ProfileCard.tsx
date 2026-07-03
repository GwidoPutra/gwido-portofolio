import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { MapPin, Briefcase, Github, Linkedin, Sparkles } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'

interface ProfileCardProps {
  name: string
  title: string
  location: string
  imageSrc: string
  githubUrl?: string
  linkedinUrl?: string
  badge?: string
}

export function ProfileCard({
  name,
  title,
  location,
  imageSrc,
  githubUrl,
  linkedinUrl,
  badge = 'Available for Work',
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  // Spring physics for smooth rotation
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })
  const glareX = useSpring(50, { stiffness: 150, damping: 20 })
  const glareY = useSpring(50, { stiffness: 150, damping: 20 })

  // Glow opacity based on hover
  const glareOpacity = useTransform(rotateY, [-20, 0, 20], [0.15, 0.05, 0.15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateX.set(((y - centerY) / centerY) * -12)
    rotateY.set(((x - centerX) / centerX) * 12)

    // Glare position as percentage
    glareX.set((x / rect.width) * 100)
    glareY.set((y / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
    setIsHovered(false)
  }

  return (
    <div style={{ perspective: '1000px' }} className="w-full flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-64 rounded-3xl overflow-hidden cursor-pointer select-none"
      >
        {/* Card Background */}
        <div className={`bg-gradient-to-br border shadow-2xl rounded-3xl overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'from-slate-900 via-slate-800 to-blue-900/30 border-slate-700 shadow-blue-900/20' : 'from-white via-slate-50 to-blue-50 border-slate-200 shadow-blue-100/50'}`}>
          
          {/* Photo Section */}
          <div className="relative overflow-hidden">
            <img
              src={imageSrc}
              alt={name}
              className="w-full aspect-[4/6] object-cover object-top"
              draggable={false}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

            {/* Badge on top */}
            <div className="absolute top-4 left-4 right-4 flex justify-center">
              <div className={`inline-flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-white/50'}`}>
                <Sparkles size={10} className="text-blue-400" />
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{badge}</span>
              </div>
            </div>

            {/* Name overlay on photo */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-black text-xl leading-tight drop-shadow-lg">{name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Briefcase size={11} className="text-blue-300" />
                <p className="text-blue-200 text-xs font-semibold">{title}</p>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className={`p-5 space-y-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            {/* Location */}
            <div className={`flex items-center gap-2 transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <MapPin size={13} className="text-blue-500 shrink-0" />
              <span className="text-xs font-semibold">{location}</span>
            </div>

            {/* Divider */}
            <div className={`h-px transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500/30 via-slate-700 to-transparent' : 'bg-gradient-to-r from-blue-100 via-slate-100 to-transparent'}`} />

            {/* Social Links */}
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Connect</span>
              <div className="flex gap-2">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl transition-colors border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 border-slate-700' : 'bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 border-slate-100'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} />
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl transition-colors border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 border-slate-700' : 'bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 border-slate-100'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Holographic Glare Overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)'} 0%, transparent 60%)`
            ),
            opacity: isHovered ? glareOpacity : 0,
          }}
        />

        {/* Edge highlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ boxShadow: theme === 'dark' ? 'inset 0 1px 0 rgba(255,255,255,0.15)' : 'inset 0 1px 0 rgba(255,255,255,0.6)' }}
        />
      </motion.div>
    </div>
  )
}
