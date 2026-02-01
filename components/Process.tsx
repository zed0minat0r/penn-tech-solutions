'use client'

import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PhoneCall,
  ClipboardCheck,
  FileText,
  Rocket,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: PhoneCall,
    title: 'Free Consultation',
    shortDesc: 'Tell us about your business and challenges',
    description: 'Give us a call or fill out our contact form. We\'ll have a quick chat to understand your business, your current tech setup, and what problems you\'re trying to solve. No sales pressure—just a genuine conversation.',
    details: [
      'No-obligation discovery call',
      'Understand your business needs',
      'Identify pain points & priorities',
      'Answer all your questions'
    ],
    duration: 'Same day response',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Assessment',
    shortDesc: 'We evaluate your current IT environment',
    description: 'We\'ll take a thorough look at your current setup—network infrastructure, security posture, hardware condition, and workflows. This helps us understand exactly what\'s working and what needs attention.',
    details: [
      'Network & infrastructure review',
      'Security vulnerability scan',
      'Hardware inventory & health check',
      'Workflow efficiency analysis'
    ],
    duration: 'On-site or remote',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Custom Proposal',
    shortDesc: 'Clear recommendations with transparent pricing',
    description: 'You\'ll receive a detailed but easy-to-understand proposal outlining exactly what we recommend and why. Pricing is transparent with no hidden fees or surprise charges down the road.',
    details: [
      'Prioritized recommendations',
      'Multiple solution options',
      'Transparent, itemized pricing',
      'Clear timeline & milestones'
    ],
    duration: 'Within 48 hours',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Implementation',
    shortDesc: 'We handle everything with minimal disruption',
    description: 'Once you give the green light, our team gets to work. We coordinate everything, communicate clearly throughout the process, and schedule work to minimize any disruption to your daily operations.',
    details: [
      'Dedicated project manager',
      'After-hours work available',
      'Progress updates throughout',
      'Testing & quality assurance'
    ],
    duration: 'Scheduled around you',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
  },
  {
    number: '05',
    icon: HeartHandshake,
    title: 'Ongoing Support',
    shortDesc: 'We\'re always here when you need us',
    description: 'We don\'t disappear after the project\'s done. You\'ll have a direct line to our team for questions, issues, or future needs. Think of us as your outsourced IT department—without the overhead.',
    details: [
      'Direct phone & email support',
      'Remote troubleshooting',
      'Proactive monitoring available',
      'Regular check-ins & reviews'
    ],
    duration: 'Always here for you',
    gradient: 'from-primary-500 to-cyan-500',
    bgGradient: 'from-primary-500/20 via-cyan-500/10 to-transparent',
  },
]

// Step Card Component - Memoized to prevent unnecessary re-renders
const StepCard = memo(function StepCard({
  step,
  index,
  isExpanded,
  onToggle
}: {
  step: typeof steps[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div
        onClick={onToggle}
        className={`relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ${
          isExpanded
            ? 'bg-dark-800/80 ring-1 ring-white/10'
            : 'bg-dark-800/40 hover:bg-dark-800/60'
        }`}
      >
        {/* Animated gradient border */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ${
            isExpanded ? 'opacity-100' : 'group-hover:opacity-100'
          }`}
          style={{
            background: `linear-gradient(135deg, ${step.gradient.split(' ')[0].replace('from-', '')}40, transparent 50%, ${step.gradient.split(' ')[1].replace('to-', '')}40)`,
            padding: '1px',
          }}
        >
          <div className="absolute inset-[1px] rounded-2xl bg-dark-800/95" />
        </div>

        {/* Background gradient glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 transition-opacity duration-500 ${
            isExpanded ? 'opacity-100' : 'group-hover:opacity-60'
          }`}
        />

        {/* Content */}
        <div className="relative z-10 p-5">
          {/* Header Row */}
          <div className="flex items-center gap-4">
            {/* Animated Icon Container */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative"
            >
              {/* Icon glow effect */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`relative p-3 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
              >
                <step.icon className="w-6 h-6 text-white" />
              </div>

              {/* Step number badge */}
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-900 border-2 border-dark-600 flex items-center justify-center text-[10px] font-bold text-white">
                {step.number}
              </span>
            </motion.div>

            {/* Title & Short Description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors truncate">
                {step.title}
              </h3>
              <p className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors truncate">
                {step.shortDesc}
              </p>
            </div>

            {/* Duration Badge */}
            <span className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent border border-dark-600`}>
              {step.duration}
            </span>

            {/* Expand Arrow */}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isExpanded
                  ? `bg-gradient-to-br ${step.gradient}`
                  : 'bg-dark-700/50 group-hover:bg-dark-700'
              }`}
            >
              <ChevronRight className={`w-5 h-5 transition-colors ${isExpanded ? 'text-white' : 'text-dark-400'}`} />
            </motion.div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-dark-700/50">
                  {/* Duration on mobile */}
                  <div className="sm:hidden mb-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent border border-dark-600`}>
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-dark-300 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Animated Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.15 + detailIndex * 0.08,
                          ease: "easeOut"
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-dark-900/50 group/detail hover:bg-dark-900/80 transition-colors"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.2 + detailIndex * 0.08,
                            type: "spring",
                            stiffness: 500,
                            damping: 25
                          }}
                          className={`p-1 rounded-md bg-gradient-to-br ${step.gradient}`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                        <span className="text-sm text-dark-300 group-hover/detail:text-dark-200 transition-colors">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shimmer effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  )
})

export default function Process() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="process" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 -right-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="container-width relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            How We Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Getting Started Is{' '}
            <span className="gradient-text">Simple</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-dark-300"
          >
            No complicated onboarding. No confusing processes.
            <span className="text-dark-400 block mt-1">Click each step to learn more.</span>
          </motion.p>
        </motion.div>

        {/* Steps List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleExpanded(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-dark-300 mb-6">
            Ready to get started? Let&apos;s talk.
          </p>
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Schedule Your Free Consultation
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
