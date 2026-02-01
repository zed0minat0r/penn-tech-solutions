'use client'

import { motion } from 'framer-motion'

interface WaveDividerProps {
  fromColor?: string
  toColor?: string
  flip?: boolean
  className?: string
}

export default function WaveDivider({
  fromColor = 'fill-dark-900',
  toColor = 'fill-dark-950',
  flip = false,
  className = ''
}: WaveDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      {/* Wave SVG */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`w-full h-16 md:h-20 ${toColor}`}
      >
        <motion.path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          className={fromColor}
          animate={{
            d: [
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              "M0,80 C240,20 480,100 720,40 C960,80 1200,20 1440,80 L1440,120 L0,120 Z",
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Floating particles on the divider */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              left: `${15 + i * 18}%`,
              top: '50%',
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
