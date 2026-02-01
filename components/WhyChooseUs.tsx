'use client'

import { motion } from 'framer-motion'
import { Check, Trophy, Building2 } from 'lucide-react'
import { GlowingHexagon, HexagonCluster, AmbientHexagon } from './NetworkDecor'

const comparisonData = [
  {
    feature: 'Response Time',
    pennTech: 'Same-day, often within hours',
    bigIT: '24-48 hours (if you\'re lucky)',
  },
  {
    feature: 'Pricing',
    pennTech: 'Transparent, small-business friendly',
    bigIT: 'Enterprise pricing, long contracts',
  },
  {
    feature: 'Personal Service',
    pennTech: 'Know your name & your business',
    bigIT: 'Different tech every time',
  },
  {
    feature: 'Local Support',
    pennTech: 'Philly-based, on-site when needed',
    bigIT: 'Remote call centers',
  },
  {
    feature: 'Contract Terms',
    pennTech: 'Flexible, no long-term lock-in',
    bigIT: 'Multi-year commitments',
  },
  {
    feature: 'Right-Sized Solutions',
    pennTech: 'Built for your actual needs',
    bigIT: 'One-size-fits-all packages',
  },
]

const highlights = [
  { icon: Trophy, text: 'No long-term contracts required', color: 'text-yellow-400' },
  { icon: Building2, text: 'Built specifically for small businesses', color: 'text-primary-400' },
  { icon: Check, text: 'Real humans who answer the phone', color: 'text-green-400' },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900/50" />

        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] bg-primary-500/15 rounded-full blur-[100px]"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full hidden lg:block"
            style={{
              left: `${10 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Hexagon patterns */}
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[5%] left-[3%] hidden lg:block"
        >
          <AmbientHexagon size={300} color="blue" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-[10%] right-[2%] hidden lg:block"
        >
          <AmbientHexagon size={260} color="cyan" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[8%] hidden lg:block"
        >
          <HexagonCluster scale={0.8} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -1.5, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[20%] left-[5%] hidden lg:block"
        >
          <HexagonCluster scale={0.7} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[18%] hidden md:block"
        >
          <GlowingHexagon size={42} color="cyan" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[35%] right-[15%] hidden md:block"
        >
          <GlowingHexagon size={35} color="blue" filled />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[30%] left-[25%] hidden lg:block"
        >
          <GlowingHexagon size={38} color="purple" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[25%] right-[20%] hidden md:block"
        >
          <GlowingHexagon size={45} color="mixed" filled />
        </motion.div>

        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-[50%] left-[10%] hidden lg:block"
        >
          <GlowingHexagon size={30} color="cyan" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[60%] right-[12%] hidden md:block"
        >
          <GlowingHexagon size={48} color="blue" />
        </motion.div>
      </div>

      <div className="container-width relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4"
          >
            <Trophy className="w-4 h-4" />
            The Penn Tech Difference
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Small Businesses{' '}
            <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-lg text-dark-300">
            See how we compare to the big guys.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-dark-800/50">
              <div className="p-4 md:p-6">
                <span className="text-dark-400 font-medium text-sm md:text-base">Feature</span>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-dark-700">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 mb-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm md:text-base">Penn Tech</span>
                </div>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-dark-700">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 rounded-lg bg-dark-600 mb-1">
                    <Building2 className="w-4 h-4 text-dark-400" />
                  </div>
                  <span className="text-dark-300 font-medium text-sm md:text-base">Big IT Firms</span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className={`grid grid-cols-3 cursor-default transition-colors ${index % 2 === 0 ? 'bg-dark-800/20' : ''}`}
              >
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-white font-medium text-sm md:text-base">{row.feature}</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center text-center border-l border-dark-700/50">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    className="text-primary-400 text-sm md:text-base font-medium"
                  >
                    {row.pennTech}
                  </motion.span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center text-center border-l border-dark-700/50">
                  <span className="text-dark-500 text-sm md:text-base">{row.bigIT}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 px-5 py-3 glass rounded-full cursor-default border border-transparent hover:border-primary-500/20 transition-colors"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </motion.div>
              <span className="text-dark-200 text-sm md:text-base">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
