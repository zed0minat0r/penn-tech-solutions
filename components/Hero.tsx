'use client'

import { useEffect, useState, memo, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, CheckCircle, Phone, Network, Wifi, Server, Cloud, Brain, Globe, Camera } from 'lucide-react'
import Image from 'next/image'

// Icons for the spinning service icon cycler
const serviceIcons = [
  { icon: Phone, color: 'from-cyan-500 to-cyan-400' },
  { icon: Network, color: 'from-green-500 to-green-400' },
  { icon: Camera, color: 'from-primary-500 to-blue-400' },
  { icon: Globe, color: 'from-purple-500 to-purple-400' },
  { icon: Brain, color: 'from-pink-500 to-pink-400' },
]

const features = [
  'Local Philadelphia Support',
  'Personalized Service',
  'Small Business Focused',
  'AI-Ready Solutions',
]

// Floating 3D shapes configuration
const floatingShapes = [
  { icon: Wifi, delay: 0, duration: 6, x: '10%', y: '20%', size: 'w-12 h-12', opacity: 0.15 },
  { icon: Server, delay: 1, duration: 7, x: '85%', y: '15%', size: 'w-10 h-10', opacity: 0.12 },
  { icon: Cloud, delay: 2, duration: 8, x: '75%', y: '70%', size: 'w-14 h-14', opacity: 0.1 },
  { icon: Network, delay: 0.5, duration: 6.5, x: '15%', y: '75%', size: 'w-8 h-8', opacity: 0.15 },
  { icon: Phone, delay: 1.5, duration: 7.5, x: '90%', y: '45%', size: 'w-10 h-10', opacity: 0.12 },
]

// Expandable Service Item for Hero card - Memoized to prevent unnecessary re-renders
const ServiceItem = memo(function ServiceItem({ item, index }: {
  item: {
    name: string
    status: string
    color: string
    icon: React.ComponentType<{ className?: string }>
    delay: number
    subServices: string[]
  }
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + item.delay, duration: 0.4 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="relative"
    >
      <motion.div
        animate={{
          backgroundColor: isExpanded ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.5)',
        }}
        className="p-3 rounded-lg cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <item.icon className={`w-4 h-4 ${isExpanded ? 'text-primary-400' : 'text-dark-400'} transition-colors`} />
            <span className={`${isExpanded ? 'text-white' : 'text-dark-200'} transition-colors`}>{item.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              className={`w-2 h-2 rounded-full ${item.color}`}
            />
            <span className="text-sm text-dark-400">{item.status}</span>
          </div>
        </div>

        {/* Expandable sub-services */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-dark-700/50">
                {item.subServices.map((service, i) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-2 py-1 text-xs rounded-md bg-dark-700/50 text-dark-300 border border-dark-600/50"
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
})

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  // Cycle through service icons - synced to rotation when icon is edge-on (not visible)
  // Rotation is 8 seconds for 360°, so 90° (edge-on) happens at 2s, 6s, 10s, etc.
  useEffect(() => {
    // Initial delay of 2 seconds to sync with first 90° point
    const initialTimeout = setTimeout(() => {
      setCurrentIconIndex((prev) => (prev + 1) % serviceIcons.length)

      // Then switch every 4 seconds (at 90° and 270° points)
      const interval = setInterval(() => {
        setCurrentIconIndex((prev) => (prev + 1) % serviceIcons.length)
      }, 4000)

      return () => clearInterval(interval)
    }, 2000)

    return () => clearTimeout(initialTimeout)
  }, [])

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set(clientX / innerWidth)
      mouseY.set(clientY / innerHeight)
      setMousePosition({ x: clientX / innerWidth, y: clientY / innerHeight })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-dark-900">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-primary-500/20 rounded-full blur-[80px] sm:blur-[100px] animate-morph"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[450px] lg:w-[600px] h-[350px] sm:h-[450px] lg:h-[600px] bg-cyan-500/15 rounded-full blur-[100px] sm:blur-[120px] animate-morph"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-gradient-to-br from-primary-500/10 to-cyan-500/10 rounded-full blur-[100px] sm:blur-[150px]"
        />

        {/* Floating 3D Icons */}
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: shape.opacity,
              scale: 1,
              y: [0, -30, 0],
              rotateY: [0, 360],
            }}
            transition={{
              opacity: { duration: 1, delay: shape.delay },
              scale: { duration: 1, delay: shape.delay },
              y: { duration: shape.duration, repeat: Infinity, ease: 'easeInOut', delay: shape.delay },
              rotateY: { duration: shape.duration * 2, repeat: Infinity, ease: 'linear', delay: shape.delay },
            }}
            style={{ left: shape.x, top: shape.y }}
            className={`absolute ${shape.size} text-primary-400 hidden lg:block`}
          >
            <shape.icon className="w-full h-full" />
          </motion.div>
        ))}

        {/* Animated Grid Pattern */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* 3D Geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] border border-primary-500/10 rounded-full hidden lg:block"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] border border-cyan-500/10 rounded-full hidden lg:block"
          />

          {/* Floating cubes */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[10%] w-20 h-20 hidden lg:block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 border border-primary-500/20 bg-primary-500/5 rounded-lg"
                 style={{ transform: 'rotateY(0deg) translateZ(40px)' }} />
          </motion.div>
        </div>

        {/* Logo Background - Desktop Only */}
        <motion.div
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ rotateX, rotateY }}
          className="hidden lg:block absolute right-0 top-[38.5%] -translate-y-1/2 opacity-10"
        >
          <Image
            src="/images/Logo.jpg"
            alt=""
            width={600}
            height={600}
            className="w-[600px] h-[600px] object-contain"
          />
        </motion.div>
      </div>

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Logo - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 flex justify-center lg:hidden perspective-1000"
            >
              <Image
                src="/images/Logo.jpg"
                alt="Penn Tech Solutions Logo"
                width={224}
                height={224}
                className="w-40 h-40 xs:w-48 xs:h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-2xl object-contain shadow-2xl shadow-primary-500/20"
                priority
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Your Local IT Partner for{' '}
              <span className="gradient-text animate-gradient bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-400">Small Businesses</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-dark-300 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              From VoIP phones to security cameras, networks to websites—we handle all your tech needs
              with the personal attention only a local partner can provide. Serving the Greater Philadelphia area.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 mb-8 max-w-md mx-auto lg:mx-0"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800/50 border border-dark-700/50"
                >
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-dark-200 text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Free Consultation</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary inline-flex items-center justify-center"
              >
                View Our Services
              </motion.a>
            </motion.div>

            {/* Assessment Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-xl mx-auto lg:mx-0"
            >
              <motion.a
                href="#ai-assessment"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="p-2 rounded-lg bg-purple-500/20 mb-2 group-hover:bg-purple-500/30 transition-colors">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">AI Readiness Quiz</span>
                <span className="text-[10px] sm:text-xs text-dark-400 mt-1">See if AI can help your business</span>
              </motion.a>
              <motion.a
                href="#it-assessment"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-primary-500/10 to-cyan-500/10 border border-primary-500/20 hover:border-primary-500/40 transition-all"
              >
                <div className="p-2 rounded-lg bg-primary-500/20 mb-2 group-hover:bg-primary-500/30 transition-colors">
                  <Network className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">IT Health Check</span>
                <span className="text-[10px] sm:text-xs text-dark-400 mt-1">Evaluate your tech infrastructure</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Element - 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block perspective-2000"
          >
            <motion.div
              className="relative"
            >
              {/* Main Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8 relative shadow-2xl shadow-primary-500/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="relative w-12 h-12"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className={`absolute inset-0 p-3 rounded-xl bg-gradient-to-br ${serviceIcons[currentIconIndex].color} shadow-lg shadow-primary-500/30`}
                    >
                      {(() => {
                        const IconComponent = serviceIcons[currentIconIndex].icon
                        return <IconComponent className="w-6 h-6 text-white" />
                      })()}
                    </div>
                  </motion.div>
                  <div>
                    <p className="text-white font-semibold">Our Services</p>
                    <p className="text-dark-400 text-sm">What we can do for you</p>
                  </div>
                </div>

                {/* Service Highlights with expandable details */}
                <div className="space-y-2">
                  {[
                    {
                      name: 'VoIP & Phones',
                      status: 'Cloud-Based Systems',
                      color: 'bg-cyan-500',
                      icon: Phone,
                      delay: 0,
                      subServices: ['Hosted PBX', 'Soft Phones', 'Conference Systems']
                    },
                    {
                      name: 'Networks',
                      status: 'Setup & Support',
                      color: 'bg-green-500',
                      icon: Network,
                      delay: 0.1,
                      subServices: ['Firewalls', 'WiFi Setup', 'Structured Cabling']
                    },
                    {
                      name: 'Security',
                      status: 'Cameras & Access',
                      color: 'bg-primary-500',
                      icon: Camera,
                      delay: 0.2,
                      subServices: ['CCTV Systems', 'Access Control', 'Remote Monitoring']
                    },
                    {
                      name: 'Websites & Apps',
                      status: 'Custom Solutions',
                      color: 'bg-purple-500',
                      icon: Globe,
                      delay: 0.3,
                      subServices: ['Web Design', 'Custom Apps', 'E-Commerce']
                    },
                    {
                      name: 'AI Consulting',
                      status: 'Implementation',
                      color: 'bg-pink-500',
                      icon: Brain,
                      delay: 0.4,
                      subServices: ['AI Strategy', 'Chatbots', 'Workflow Automation']
                    },
                  ].map((item, index) => (
                    <ServiceItem key={item.name} item={item} index={index} />
                  ))}
                </div>

                {/* Animated border glow */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-[1px] bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl -z-10 blur-sm"
                />
              </motion.div>

              {/* Floating Card with 3D movement */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass rounded-xl p-4 shadow-xl shadow-cyan-500/20 z-10"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-2 rounded-lg bg-cyan-500/20"
                  >
                    <Network className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-white font-medium text-sm">Local Support</p>
                    <p className="text-2xl font-bold gradient-text">Philly Area</p>
                  </div>
                </div>
              </motion.div>

              {/* Additional floating element */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  x: [0, -5, 0],
                  rotateZ: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 glass rounded-xl p-3 shadow-xl shadow-primary-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-dark-300">Systems Online</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-dark-600 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
