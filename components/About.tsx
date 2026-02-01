'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Users, Clock, Award, TrendingUp, Zap } from 'lucide-react'
import Image from 'next/image'

const partners = [
  { name: 'Cisco', logo: '/images/partners/cisco.svg' },
  { name: 'Ubiquiti', logo: '/images/partners/ubiquiti.svg' },
  { name: 'SonicWall', logo: '/images/partners/sonicwall.svg' },
  { name: 'Nimble', logo: '/images/partners/nimble.svg' },
  { name: 'Netgear', logo: '/images/partners/netgear.svg' },
  { name: 'Yealink', logo: '/images/partners/yealink.svg' },
]

const stats = [
  { icon: Users, value: '100+', label: 'Local Businesses Served', color: 'from-blue-500 to-cyan-500' },
  { icon: Clock, value: 'Fast', label: 'Response Times', color: 'from-green-500 to-emerald-500' },
  { icon: Award, value: 'Local', label: 'Philly-Based Team', color: 'from-purple-500 to-pink-500' },
  { icon: TrendingUp, value: 'Fair', label: 'Transparent Pricing', color: 'from-orange-500 to-amber-500' },
]

const values = [
  {
    title: 'Local & Personal',
    description: 'We\'re your neighbors, not a distant call center. When you call, you get a real person who knows your setup.',
  },
  {
    title: 'Full-Service IT',
    description: 'Phones, networks, security, websites—we handle it all so you have one trusted partner for all your tech needs.',
  },
  {
    title: 'Right-Sized Solutions',
    description: 'We recommend what you actually need, not the most expensive option. Your budget matters to us.',
  },
]

// 3D Stat Card Component - Memoized to prevent unnecessary re-renders
const StatCard = memo(function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="perspective-1000"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="glass rounded-2xl p-6 lg:p-8 text-center relative overflow-hidden group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated background glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Floating icon */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}
          style={{ transform: 'translateZ(30px)' }}
        >
          <stat.icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Animated value */}
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: 'spring' }}
          className="text-3xl lg:text-4xl font-bold gradient-text mb-2"
          style={{ transform: 'translateZ(20px)' }}
        >
          {stat.value}
        </motion.div>

        <div className="text-dark-400 text-sm" style={{ transform: 'translateZ(10px)' }}>
          {stat.label}
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        />
      </motion.div>
    </motion.div>
  )
})

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const partnersPerView = 3

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + partnersPerView) % partners.length)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getVisiblePartners = () => {
    const visible = []
    for (let i = 0; i < partnersPerView; i++) {
      visible.push(partners[(currentIndex + i) % partners.length])
    }
    return visible
  }

  return (
    <section id="about" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
        />

        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-[200px] h-[200px] border border-primary-500/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-[150px] h-[150px] border border-cyan-500/10 rounded-full hidden lg:block"
        />

        {/* Animated grid pattern */}
        <motion.div
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full hidden lg:block"
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 4) * 20}%`,
              backgroundColor: i % 3 === 0 ? 'rgba(59, 130, 246, 0.4)' : i % 3 === 1 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(168, 85, 247, 0.4)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4"
            >
              <Zap className="w-4 h-4" />
              About Penn Tech Solutions
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Local Technology{' '}
              <span className="gradient-text">Partner</span>
            </h2>
            <p className="text-lg text-dark-300 mb-6">
              Penn Tech Solutions is your local IT partner in the Greater Philadelphia area. We provide
              the personalized service and hands-on support that only a local team can deliver—no
              call centers, no runaround, just real people who know your business.
            </p>
            <p className="text-dark-400 mb-8">
              From phone systems to security cameras, networks to websites—we handle all your tech
              needs so you can focus on running your business. We believe in right-sized solutions
              that fit your budget, not overselling equipment you don&apos;t need.
            </p>

            {/* Values with staggered animation */}
            <div className="space-y-4 text-left max-w-md mx-auto lg:mx-0 lg:max-w-none">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 group"
                >
                  <motion.div
                    animate={{
                      height: ['100%', '120%', '100%'],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="flex-shrink-0 w-1 bg-gradient-to-b from-primary-500 to-cyan-500 rounded-full group-hover:w-1.5 transition-all"
                  />
                  <div>
                    <h3 className="text-white font-semibold mb-1 group-hover:text-primary-400 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-dark-400 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid with 3D effects */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="perspective-2000"
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>

            {/* Trust Badges - Rotating Partners with 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 glass rounded-2xl p-6 pb-10 relative overflow-visible"
            >
              {/* Animated background */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(59,130,246,0.05), transparent)',
                    'linear-gradient(225deg, rgba(6,182,212,0.05), transparent)',
                    'linear-gradient(45deg, rgba(59,130,246,0.05), transparent)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0"
              />

              <p className="text-dark-400 text-sm text-center mb-4 relative z-10">Who We Work With</p>
              <div className="relative h-16 overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100, rotateY: 30 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -100, rotateY: -30 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center gap-8"
                  >
                    {getVisiblePartners().map((partner, index) => (
                      <motion.div
                        key={partner.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 2, y: -20, zIndex: 50 }}
                        className="flex flex-col items-center gap-2 relative"
                      >
                        <motion.div
                          className="w-20 h-12 relative bg-white/90 rounded-lg p-2 flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300"
                          whileHover={{ backgroundColor: 'rgba(255,255,255,1)' }}
                        >
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            width={72}
                            height={36}
                            className="object-contain w-full h-full"
                          />
                        </motion.div>
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 text-xs text-primary-400 font-medium whitespace-nowrap"
                        >
                          {partner.name}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Dots with animation */}
              <div className="flex justify-center gap-2 mt-4 relative z-10">
                {Array.from({ length: Math.ceil(partners.length / partnersPerView) }).map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentIndex(i * partnersPerView)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-2 rounded-full transition-all ${
                      Math.floor(currentIndex / partnersPerView) === i
                        ? 'bg-primary-500 w-6'
                        : 'bg-dark-600 hover:bg-dark-500 w-2'
                    }`}
                    aria-label={`Go to partner group ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
