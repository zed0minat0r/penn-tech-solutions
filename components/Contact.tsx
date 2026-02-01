'use client'

import { useState, useRef, memo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, AlertCircle, Sparkles, Brain, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { useAssessment } from '@/contexts/AssessmentContext'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@penntechsolutions.com',
    href: 'mailto:info@penntechsolutions.com',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(215) 555-1234',
    href: 'tel:+12155551234',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'Greater Philadelphia Area\nMontgomery, Bucks, Chester & Delaware Counties',
    href: '#',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clock,
    label: 'Support Hours',
    value: 'Emergency Support Available\nBusiness Hours: M-F 8am-6pm ET',
    href: '#',
    gradient: 'from-orange-500 to-amber-500',
  },
]

// 3D Contact Card Component - Memoized to prevent unnecessary re-renders
const ContactCard = memo(function ContactCard({ item, index }: { item: typeof contactInfo[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <motion.a
      ref={ref}
      href={item.href}
      initial={{ opacity: 0, x: -30, rotateY: -15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="block perspective-1000 group"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex gap-4 p-4 glass rounded-xl relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Floating icon */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${item.gradient} shadow-lg relative z-10`}
          style={{ transform: 'translateZ(20px)' }}
        >
          <item.icon className="w-5 h-5 text-white" />
        </motion.div>

        <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
          <p className="text-dark-400 text-sm mb-1">{item.label}</p>
          <p className="text-white whitespace-pre-line group-hover:text-primary-400 transition-colors">
            {item.value}
          </p>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        />
      </motion.div>
    </motion.a>
  )
})

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [expandedAssessment, setExpandedAssessment] = useState<'ai' | 'it' | null>(null)

  const { assessments, clearAssessments } = useAssessment()

  // Form card 3D tilt
  const formRef = useRef<HTMLFormElement>(null)
  const formX = useMotionValue(0)
  const formY = useMotionValue(0)
  const formXSpring = useSpring(formX, { damping: 30, stiffness: 150 })
  const formYSpring = useSpring(formY, { damping: 30, stiffness: 150 })
  const formRotateX = useTransform(formYSpring, [-0.5, 0.5], ['3deg', '-3deg'])
  const formRotateY = useTransform(formXSpring, [-0.5, 0.5], ['-3deg', '3deg'])

  const handleFormMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    formX.set(mouseX)
    formY.set(mouseY)
  }

  const handleFormMouseLeave = () => {
    formX.set(0)
    formY.set(0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Include assessment data in the submission
      const submissionData = {
        ...formData,
        assessments: assessments.map(a => ({
          type: a.type,
          title: a.title,
          resultLevel: a.resultLevel,
          answers: a.answers
        }))
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
      clearAssessments()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Gradient blend at top - fades from IT Assessment (dark-925) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-925 to-transparent pointer-events-none z-[1]" />

      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-[120px]"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Get In Touch
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your{' '}
            <span className="gradient-text">IT Infrastructure?</span>
          </h2>
          <p className="text-lg text-dark-300">
            Get a free consultation and discover how Penn Tech Solutions can help your business
            thrive. No obligation, no pressure—just expert advice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item, index) => (
              <ContactCard key={item.label} item={item} index={index} />
            ))}

            {/* Free Assessment CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, rotateY: 3 }}
              className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-cyan-500/10 border border-primary-500/20 relative overflow-hidden group"
            >
              {/* Animated glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-[1px] bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl -z-10 blur-sm"
              />

              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯
                </motion.span>
                Free IT Assessment
              </h3>
              <p className="text-dark-400 text-sm mb-4">
                Get a comprehensive review of your current IT infrastructure and discover
                opportunities for improvement.
              </p>
              <div className="flex items-center gap-2 text-primary-400 text-sm font-medium">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle className="w-4 h-4" />
                </motion.div>
                No obligation consultation
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 perspective-2000"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              onMouseMove={handleFormMouseMove}
              onMouseLeave={handleFormMouseLeave}
              style={{
                rotateX: formRotateX,
                rotateY: formRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="glass rounded-2xl p-6 lg:p-8 relative overflow-hidden"
            >
              {/* Animated border */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-[1px] bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl -z-10 blur-sm"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full min-w-0 px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                    placeholder="John Smith"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full min-w-0 px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                    placeholder="john@company.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <label htmlFor="company" className="block text-white font-medium mb-2">
                  Company Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  placeholder="Your Company Inc."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  How can we help? *
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                  placeholder="Tell us about your IT challenges or what you're looking for..."
                />
              </motion.div>

              {/* Completed Assessments Display */}
              {assessments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-cyan-500/5 border border-primary-500/20">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Completed Assessments
                      <span className="text-xs text-dark-400 font-normal">(will be included with your message)</span>
                    </h4>
                    <div className="space-y-3">
                      {assessments.map((assessment) => (
                        <div
                          key={assessment.type}
                          className="bg-dark-800/50 rounded-lg overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedAssessment(
                              expandedAssessment === assessment.type ? null : assessment.type
                            )}
                            className="w-full flex items-center justify-between p-3 hover:bg-dark-700/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {assessment.type === 'ai' ? (
                                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                  <Brain className="w-4 h-4 text-purple-400" />
                                </div>
                              ) : (
                                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-cyan-500/20">
                                  <Shield className="w-4 h-4 text-primary-400" />
                                </div>
                              )}
                              <div className="text-left">
                                <p className="text-white text-sm font-medium">{assessment.title}</p>
                                <p className="text-dark-400 text-xs">
                                  Result: <span className={
                                    assessment.resultLevel === 'high' || assessment.resultLevel === 'critical'
                                      ? 'text-red-400'
                                      : assessment.resultLevel === 'medium' || assessment.resultLevel === 'moderate'
                                      ? 'text-yellow-400'
                                      : 'text-green-400'
                                  }>
                                    {assessment.resultLevel.charAt(0).toUpperCase() + assessment.resultLevel.slice(1)}
                                  </span>
                                </p>
                              </div>
                            </div>
                            {expandedAssessment === assessment.type ? (
                              <ChevronUp className="w-4 h-4 text-dark-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-dark-400" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedAssessment === assessment.type && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-3 pb-3 space-y-2">
                                  {assessment.answers.map((answer, idx) => (
                                    <div key={idx} className="text-xs">
                                      <p className="text-dark-400">{answer.question}</p>
                                      <p className="text-dark-200 pl-2 border-l border-dark-600 mt-1">
                                        {answer.answer}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <>
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </motion.svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                  </>
                )}

                {/* Button hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                  <p className="text-green-400">
                    Thank you! We&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-400">{error}</p>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
