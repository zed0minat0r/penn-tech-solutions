'use client'

import { useRef, useState, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltAmount?: number
  glareOpacity?: number
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 10,
  glareOpacity = 0.1,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig)

  // Glare position
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((event.clientX - centerX) / rect.width)
    y.set((event.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}

      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden"
        style={{ opacity: isHovered ? glareOpacity : 0 }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-radial from-white/30 to-transparent"
          style={{
            left: glareX,
            top: glareY,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
