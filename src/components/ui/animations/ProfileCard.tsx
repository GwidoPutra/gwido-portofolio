import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { MapPin, Briefcase, Github, Linkedin, Sparkles } from 'lucide-react'

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

  // Spring physics for smooth rotation
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateX.set(((y - centerY) / centerY) * -8)
    rotateY.set(((x - centerX) / centerX) * 8)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
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
        className={`relative w-64 border-[3px] border-foreground bg-card overflow-hidden cursor-pointer select-none ${isHovered ? 'brutal-shadow-lg' : 'brutal-shadow'}`}
      >
        {/* Photo Section */}
        <div className="relative overflow-hidden border-b-[3px] border-foreground">
          <img
            src={imageSrc}
            alt={name}
            className="w-full aspect-[4/6] object-cover object-top"
            draggable={false}
          />
          {/* Overlay solid color */}
          <div className="absolute inset-0 bg-gradient-to-t from-brutal-ink/80 via-brutal-ink/20 to-transparent" />

          {/* Badge on top */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="inline-flex items-center gap-1.5 bg-brutal-yellow border-2 border-foreground px-3 py-1.5 brutal-shadow-sm">
              <Sparkles size={10} className="text-brutal-red" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brutal-ink">{badge}</span>
            </div>
          </div>

          {/* Name overlay on photo */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-black text-xl leading-tight uppercase tracking-tight">{name}</p>
            <div className="flex items-center gap-1 mt-1">
              <Briefcase size={11} className="text-brutal-yellow" />
              <p className="text-brutal-yellow text-xs font-black">{title}</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5 space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={13} className="text-brutal-red shrink-0" />
            <span className="text-xs font-black">{location}</span>
          </div>

          {/* Divider */}
          <div className="h-[2px] border-t-2 border-dashed border-foreground" />

          {/* Social Links */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Connect</span>
            <div className="flex gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-foreground bg-brutal-cream hover:bg-brutal-ink text-brutal-ink hover:text-white transition-colors"
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
                  className="p-2 border-2 border-foreground bg-brutal-cream hover:bg-brutal-blue text-brutal-ink hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
