'use client'

import { motion } from 'framer-motion'

// Single glowing hexagon with customizable properties
export function GlowingHexagon({
  size = 60,
  strokeWidth = 1,
  filled = false,
  color = 'blue',
  className = ''
}: {
  size?: number
  strokeWidth?: number
  filled?: boolean
  color?: 'blue' | 'cyan' | 'purple' | 'mixed'
  className?: string
}) {
  const colors = {
    blue: { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.08)', glow: 'rgba(59, 130, 246, 0.4)' },
    cyan: { stroke: '#06b6d4', fill: 'rgba(6, 182, 212, 0.08)', glow: 'rgba(6, 182, 212, 0.4)' },
    purple: { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.08)', glow: 'rgba(139, 92, 246, 0.4)' },
    mixed: { stroke: 'url(#hexGradient)', fill: 'rgba(59, 130, 246, 0.05)', glow: 'rgba(6, 182, 212, 0.3)' },
  }
  const c = colors[color]

  // Hexagon path (pointy-top orientation)
  const hexPath = "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"

  return (
    <div
      className={`pointer-events-none opacity-50 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        style={{ filter: `drop-shadow(0 0 ${size / 6}px ${c.glow})` }}
      >
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          d={hexPath}
          stroke={c.stroke}
          strokeWidth={strokeWidth}
          fill={filled ? c.fill : 'none'}
        />
      </svg>
    </div>
  )
}

// Hexagon grid cluster - interconnected honeycomb pattern
export function HexagonCluster({
  className = '',
  scale = 1,
}: {
  className?: string
  scale?: number
}) {
  const baseSize = 100 * scale

  return (
    <div
      className={`pointer-events-none opacity-30 ${className}`}
    >
      <svg
        width={baseSize * 2.5}
        height={baseSize * 2.2}
        viewBox="0 0 250 220"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 30px rgba(6, 182, 212, 0.15))' }}
      >
        <defs>
          <linearGradient id="clusterGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="clusterGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Center hexagon */}
        <path
          d="M125 60 L155 77.5 L155 112.5 L125 130 L95 112.5 L95 77.5 Z"
          stroke="url(#clusterGrad1)"
          strokeWidth="1"
          fill="rgba(59, 130, 246, 0.03)"
          opacity="0.7"
        />

        {/* Top hexagon */}
        <path
          d="M125 10 L150 25 L150 55 L125 70 L100 55 L100 25 Z"
          stroke="url(#clusterGrad2)"
          strokeWidth="0.75"
          fill="none"
          opacity="0.5"
        />

        {/* Top-right hexagon */}
        <path
          d="M175 35 L200 50 L200 80 L175 95 L150 80 L150 50 Z"
          stroke="url(#clusterGrad1)"
          strokeWidth="0.75"
          fill="none"
          opacity="0.6"
        />

        {/* Bottom-right hexagon */}
        <path
          d="M175 105 L200 120 L200 150 L175 165 L150 150 L150 120 Z"
          stroke="url(#clusterGrad2)"
          strokeWidth="0.75"
          fill="rgba(6, 182, 212, 0.02)"
          opacity="0.55"
        />

        {/* Bottom hexagon */}
        <path
          d="M125 140 L150 155 L150 185 L125 200 L100 185 L100 155 Z"
          stroke="url(#clusterGrad1)"
          strokeWidth="0.75"
          fill="none"
          opacity="0.45"
        />

        {/* Bottom-left hexagon */}
        <path
          d="M75 105 L100 120 L100 150 L75 165 L50 150 L50 120 Z"
          stroke="url(#clusterGrad2)"
          strokeWidth="0.75"
          fill="none"
          opacity="0.55"
        />

        {/* Top-left hexagon */}
        <path
          d="M75 35 L100 50 L100 80 L75 95 L50 80 L50 50 Z"
          stroke="url(#clusterGrad1)"
          strokeWidth="0.75"
          fill="rgba(139, 92, 246, 0.02)"
          opacity="0.5"
        />

        {/* Connecting dots */}
        <g opacity="0.6">
          <circle cx="125" cy="70" r="2" fill="#3b82f6" />
          <circle cx="150" cy="80" r="1.5" fill="#06b6d4" />
          <circle cx="150" cy="120" r="1.5" fill="#06b6d4" />
          <circle cx="125" cy="130" r="2" fill="#3b82f6" />
          <circle cx="100" cy="120" r="1.5" fill="#8b5cf6" />
          <circle cx="100" cy="80" r="1.5" fill="#8b5cf6" />
        </g>
      </svg>
    </div>
  )
}

// Large ambient hexagon for background depth
export function AmbientHexagon({
  className = '',
  size = 300,
  color = 'blue'
}: {
  className?: string
  size?: number
  color?: 'blue' | 'cyan' | 'purple'
}) {
  const colors = {
    blue: { stroke: 'rgba(59, 130, 246, 0.15)', glow: 'rgba(59, 130, 246, 0.1)' },
    cyan: { stroke: 'rgba(6, 182, 212, 0.15)', glow: 'rgba(6, 182, 212, 0.1)' },
    purple: { stroke: 'rgba(139, 92, 246, 0.12)', glow: 'rgba(139, 92, 246, 0.08)' },
  }
  const c = colors[color]

  return (
    <div
      className={`pointer-events-none opacity-40 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        style={{ filter: `drop-shadow(0 0 40px ${c.glow})` }}
      >
        <path
          d="M50 2 L95 27 L95 73 L50 98 L5 73 L5 27 Z"
          stroke={c.stroke}
          strokeWidth="0.3"
          fill="none"
        />
        <path
          d="M50 15 L82 32 L82 68 L50 85 L18 68 L18 32 Z"
          stroke={c.stroke}
          strokeWidth="0.2"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default function NetworkDecor() {
  return null
}
