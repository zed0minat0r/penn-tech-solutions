'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Brain,
  Sparkles,
  MessageSquareText,
  FileSearch,
  CalendarClock,
  TrendingUp,
  Zap,
  Users
} from 'lucide-react'

const aiFeatures = [
  {
    icon: MessageSquareText,
    title: 'Customer Service Automation',
    description: 'AI chatbots that answer customer questions 24/7, schedule appointments, and handle routine inquiries—so you can focus on what matters.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileSearch,
    title: 'Document & Data Processing',
    description: 'Automatically extract info from invoices, organize files, and turn messy data into actionable insights without the manual work.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: CalendarClock,
    title: 'Workflow Automation',
    description: 'Streamline repetitive tasks like scheduling, follow-ups, and reporting. Let AI handle the busywork while your team handles the real work.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Business Intelligence',
    description: 'Get plain-English insights from your business data. No spreadsheet expertise required—just ask questions and get answers.',
    gradient: 'from-orange-500 to-amber-500',
  },
]

const benefits = [
  { icon: Zap, text: 'No technical expertise needed' },
  { icon: Users, text: 'Training included for your team' },
  { icon: TrendingUp, text: 'See ROI within weeks' },
]

// 3D Feature Card
function FeatureCard({ feature, index }: { feature: typeof aiFeatures[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

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
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group perspective-1000"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-full glass rounded-2xl p-6 relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Icon */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}
          style={{ transform: 'translateZ(20px)' }}
        >
          <feature.icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors" style={{ transform: 'translateZ(15px)' }}>
          {feature.title}
        </h3>
        <p className="text-dark-400 text-sm leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
          {feature.description}
        </p>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        />

        {/* Border glow on hover */}
        <motion.div
          className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 blur-sm`}
        />
      </motion.div>
    </motion.div>
  )
}

export default function AI() {
  return (
    <section id="ai" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]"
      />

      {/* Floating AI particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-500/30" />
          </motion.div>
        ))}
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4"
          >
            <Brain className="w-4 h-4" />
            AI for Small Business
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            AI That Actually{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Makes Sense</span>
          </h2>
          <p className="text-lg text-dark-300">
            You don&apos;t need to be a tech expert to use AI. We bring powerful automation tools to small businesses
            and make them simple enough for anyone on your team to use.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Stop Hearing About AI.
              <br />
              <span className="text-purple-400">Start Using It.</span>
            </h3>
            <p className="text-dark-300 mb-6">
              Everyone&apos;s talking about AI, but most small businesses don&apos;t know where to start.
              We cut through the hype and set up practical AI tools that solve real problems—like
              answering customer questions at 2am or turning a pile of receipts into organized data.
            </p>
            <p className="text-dark-400 mb-8">
              No jargon. No complicated setup. Just AI that works for your business, with training
              so your whole team can use it confidently.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <benefit.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-dark-200">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              {/* Animated AI visualization */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-white font-semibold">AI Assistant</p>
                  <p className="text-dark-400 text-sm">Ready to help your business</p>
                </div>
              </div>

              {/* Simulated chat */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-dark-800/50 rounded-lg p-3 max-w-[80%]"
                >
                  <p className="text-dark-300 text-sm">&quot;What were our top selling items last month?&quot;</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-500/20 rounded-lg p-3 max-w-[80%] ml-auto"
                >
                  <p className="text-purple-200 text-sm">&quot;Your top 3 items were: Widget Pro ($12,400), Service Package A ($8,200), and Premium Support ($6,100).&quot;</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                  className="bg-dark-800/50 rounded-lg p-3 max-w-[80%]"
                >
                  <p className="text-dark-300 text-sm">&quot;Schedule a follow-up with customers who bought Widget Pro&quot;</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 }}
                  className="bg-purple-500/20 rounded-lg p-3 max-w-[80%] ml-auto"
                >
                  <p className="text-purple-200 text-sm">&quot;Done! I&apos;ve scheduled 23 follow-up emails for next Tuesday.&quot;</p>
                </motion.div>
              </div>

              {/* Typing indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-1 mt-4"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <div className="w-2 h-2 rounded-full bg-purple-500 animation-delay-200" />
                <div className="w-2 h-2 rounded-full bg-purple-500 animation-delay-400" />
              </motion.div>

              {/* Glow effect */}
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl -z-10 blur-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-dark-300 mb-4">
            Curious how AI could help your business? Let&apos;s talk.
          </p>
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all"
          >
            Get a Free AI Consultation
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
