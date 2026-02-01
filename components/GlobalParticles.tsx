'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { GlowingHexagon, HexagonCluster, AmbientHexagon } from './NetworkDecor'

// Memoized hexagon wrapper to prevent unnecessary re-renders
const FloatingHexagon = memo(function FloatingHexagon({
  children,
  className,
  duration,
  delay = 0,
  yRange = [0, 15, 0],
  xRange,
  rotate,
}: {
  children: React.ReactNode
  className: string
  duration: number
  delay?: number
  yRange?: number[]
  xRange?: number[]
  rotate?: number[]
}) {
  return (
    <motion.div
      animate={{
        y: yRange,
        ...(xRange && { x: xRange }),
        ...(rotate && { rotate }),
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
})

// Memoized particle component
const Particle = memo(function Particle({ index }: { index: number }) {
  const colors = [
    'rgba(59, 130, 246, 0.5)',
    'rgba(6, 182, 212, 0.5)',
    'rgba(139, 92, 246, 0.4)',
  ]

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: `${10 + (index * 10)}%`,
        top: '-2%',
        backgroundColor: colors[index % 3],
        willChange: 'transform, opacity',
      }}
      animate={{
        y: ['0vh', '100vh'],
        opacity: [0, 0.5, 0.5, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration: 30 + index * 3,
        repeat: Infinity,
        delay: index * 3,
        ease: 'linear',
      }}
    />
  )
})

// Main component - memoized
const GlobalParticles = memo(function GlobalParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large flowing gradient - CSS animation for better performance */}
      <div
        className="absolute top-0 left-0 w-[150vw] h-[200vh] bg-gradient-to-br from-primary-500/5 via-transparent to-cyan-500/5 blur-3xl animate-float-slow"
        style={{ willChange: 'transform' }}
      />

      {/* Reduced particles from 15 to 8 for better performance */}
      {[...Array(8)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Slow-moving large orbs - using CSS animation class */}
      <div
        className="absolute -top-20 left-1/4 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[80px] animate-float-slow"
        style={{ willChange: 'transform' }}
      />
      <div
        className="absolute -bottom-20 right-1/4 w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[80px] animate-float-reverse"
        style={{ willChange: 'transform' }}
      />

      {/* === HEXAGON PATTERNS - Reduced and optimized === */}

      {/* Large ambient hexagons - background depth elements (reduced from 4 to 3) */}
      <FloatingHexagon
        className="absolute top-[5vh] left-[5vw] hidden lg:block"
        duration={20}
        yRange={[0, 30, 0]}
        xRange={[0, 15, 0]}
      >
        <AmbientHexagon size={350} color="blue" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[30vh] right-[3vw] hidden lg:block"
        duration={25}
        delay={5}
        yRange={[0, -25, 0]}
        xRange={[0, -20, 0]}
      >
        <AmbientHexagon size={280} color="cyan" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[60vh] left-[8vw] hidden lg:block"
        duration={18}
        delay={8}
        yRange={[0, 20, 0]}
      >
        <AmbientHexagon size={250} color="purple" />
      </FloatingHexagon>

      {/* Hexagon clusters - reduced from 4 to 3 */}
      <FloatingHexagon
        className="absolute top-[12vh] right-[12vw] hidden lg:block"
        duration={12}
        yRange={[0, 15, 0]}
        rotate={[0, 2, 0]}
      >
        <HexagonCluster scale={0.9} />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[45vh] left-[6vw] hidden lg:block"
        duration={14}
        delay={3}
        yRange={[0, -18, 0]}
        rotate={[0, -2, 0]}
      >
        <HexagonCluster scale={0.75} />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[70vh] right-[8vw] hidden lg:block"
        duration={16}
        delay={6}
        yRange={[0, 12, 0]}
        rotate={[0, 1.5, 0]}
      >
        <HexagonCluster scale={0.85} />
      </FloatingHexagon>

      {/* Individual floating hexagons - reduced from 16 to 10 */}
      <FloatingHexagon
        className="absolute top-[8vh] left-[25vw] hidden md:block"
        duration={8}
        yRange={[0, 20, 0]}
        xRange={[0, 10, 0]}
        rotate={[0, 10, 0]}
      >
        <GlowingHexagon size={45} color="cyan" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[18vh] right-[25vw] hidden md:block"
        duration={10}
        delay={1}
        yRange={[0, -15, 0]}
        rotate={[0, -8, 0]}
      >
        <GlowingHexagon size={35} color="blue" filled />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[35vh] right-[35vw] hidden md:block"
        duration={11}
        delay={0.5}
        yRange={[0, -20, 0]}
        rotate={[0, 15, 0]}
      >
        <GlowingHexagon size={40} color="mixed" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[42vh] left-[20vw] hidden lg:block"
        duration={7}
        delay={3}
        yRange={[0, 15, 0]}
        xRange={[0, 12, 0]}
      >
        <GlowingHexagon size={32} color="cyan" filled />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[50vh] right-[18vw] hidden md:block"
        duration={13}
        delay={4}
        yRange={[0, -12, 0]}
        rotate={[0, -5, 0]}
      >
        <GlowingHexagon size={50} color="blue" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[62vh] left-[30vw] hidden lg:block"
        duration={10}
        delay={1.5}
        yRange={[0, 22, 0]}
        xRange={[0, -10, 0]}
      >
        <GlowingHexagon size={38} color="purple" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[68vh] right-[28vw] hidden md:block"
        duration={9}
        delay={2.5}
        yRange={[0, -18, 0]}
        rotate={[0, 12, 0]}
      >
        <GlowingHexagon size={42} color="mixed" filled />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[78vh] left-[18vw] hidden md:block"
        duration={11}
        delay={5}
        yRange={[0, 16, 0]}
      >
        <GlowingHexagon size={30} color="cyan" />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[85vh] right-[22vw] hidden lg:block"
        duration={8}
        delay={4}
        yRange={[0, -14, 0]}
        xRange={[0, 8, 0]}
      >
        <GlowingHexagon size={36} color="blue" filled />
      </FloatingHexagon>

      <FloatingHexagon
        className="absolute top-[40vh] right-[10vw] hidden lg:block"
        duration={8}
        delay={5.5}
        yRange={[0, 18, 0]}
        rotate={[0, -6, 0]}
      >
        <GlowingHexagon size={48} color="cyan" filled />
      </FloatingHexagon>
    </div>
  )
})

export default GlobalParticles
