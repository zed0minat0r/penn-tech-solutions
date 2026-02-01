'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ArrowRight, ArrowLeft, CheckCircle2, Wrench, RotateCcw, X, FileCheck } from 'lucide-react'
import { useAssessment, AssessmentAnswer } from '@/contexts/AssessmentContext'
import { GlowingHexagon, HexagonCluster } from './NetworkDecor'

const questions = [
  {
    id: 1,
    question: 'How many employees or users does your company have?',
    subtext: 'Include full-time, part-time, and regular contractors.',
    options: [
      { text: '1-5 employees', score: 1 },
      { text: '6-15 employees', score: 2 },
      { text: '16-50 employees', score: 3 },
      { text: '50+ employees', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'How old is your current network equipment (routers, switches, etc.)?',
    subtext: 'Include your main networking hardware.',
    options: [
      { text: 'Less than 2 years old', score: 1 },
      { text: '2-5 years old', score: 2 },
      { text: '5-8 years old', score: 3 },
      { text: 'Over 8 years or unsure', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'How often do you experience IT issues that disrupt work?',
    subtext: 'Internet outages, slow computers, software problems, etc.',
    options: [
      { text: 'Rarely - maybe once a month', score: 1 },
      { text: 'Occasionally - a few times a month', score: 2 },
      { text: 'Frequently - weekly issues', score: 3 },
      { text: 'Constantly - daily problems', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'What\'s your current cybersecurity setup?',
    subtext: 'Think about antivirus, firewalls, password policies, etc.',
    options: [
      { text: 'Basic antivirus on some computers', score: 4 },
      { text: 'Antivirus on all devices, basic firewall', score: 3 },
      { text: 'Managed security suite with regular updates', score: 2 },
      { text: 'Comprehensive security with monitoring', score: 1 },
    ],
  },
  {
    id: 5,
    question: 'How do you currently back up your business data?',
    subtext: 'Customer info, financial records, important documents, etc.',
    options: [
      { text: 'We don\'t have a backup system', score: 4 },
      { text: 'Manual backups when we remember', score: 3 },
      { text: 'Automatic local backups', score: 2 },
      { text: 'Automatic cloud + local backups', score: 1 },
    ],
  },
  {
    id: 6,
    question: 'Do you have a dedicated IT person or company helping you?',
    subtext: 'Someone who proactively manages your technology.',
    options: [
      { text: 'No - we figure it out ourselves', score: 4 },
      { text: 'We call someone when things break', score: 3 },
      { text: 'Part-time IT help or occasional consultant', score: 2 },
      { text: 'Yes - dedicated IT support', score: 1 },
    ],
  },
  {
    id: 7,
    question: 'What\'s your biggest IT frustration right now?',
    subtext: 'Select the one that bothers you most.',
    options: [
      { text: 'Slow or unreliable internet/network', score: 3, category: 'network' },
      { text: 'Security concerns and vulnerabilities', score: 3, category: 'security' },
      { text: 'Outdated hardware slowing us down', score: 3, category: 'hardware' },
      { text: 'No clear IT strategy or support', score: 3, category: 'strategy' },
    ],
  },
]

const results = {
  critical: {
    title: 'Critical IT Needs',
    description: 'Your IT infrastructure needs immediate attention. You\'re likely experiencing regular disruptions and security vulnerabilities that put your business at risk. The good news? We can help you get back on track quickly.',
    recommendations: [
      'Comprehensive IT infrastructure assessment',
      'Network upgrade and optimization',
      'Security audit and remediation',
      'Reliable backup solution implementation',
      'Ongoing managed IT support',
    ],
    color: 'from-red-500 to-orange-500',
  },
  moderate: {
    title: 'Moderate IT Improvements Needed',
    description: 'Your IT setup is functional but has room for improvement. Addressing a few key areas could significantly reduce downtime, improve security, and boost productivity.',
    recommendations: [
      'Network performance optimization',
      'Security posture improvements',
      'Hardware refresh planning',
      'Backup verification and enhancement',
      'Proactive monitoring setup',
    ],
    color: 'from-yellow-500 to-amber-500',
  },
  good: {
    title: 'Solid IT Foundation',
    description: 'You\'re in good shape! Your IT infrastructure is reasonably well-maintained. Consider fine-tuning a few areas to stay ahead and prevent future issues.',
    recommendations: [
      'Periodic security assessments',
      'Technology roadmap planning',
      'Staff cybersecurity training',
      'Disaster recovery testing',
      'Performance optimization',
    ],
    color: 'from-green-500 to-emerald-500',
  },
}

export default function ITAssessment() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [answerTexts, setAnswerTexts] = useState<AssessmentAnswer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [savedToForm, setSavedToForm] = useState(false)

  const { addAssessment } = useAssessment()

  const handleAnswer = (score: number, text: string) => {
    setSelectedOption(score)
    setSelectedText(text)
  }

  const handleNext = () => {
    if (selectedOption === null || selectedText === null) return

    const newAnswers = [...answers, selectedOption]
    const newAnswerTexts = [...answerTexts, {
      question: questions[currentQuestion].question,
      answer: selectedText
    }]
    setAnswers(newAnswers)
    setAnswerTexts(newAnswerTexts)
    setSelectedOption(null)
    setSelectedText(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      // Save assessment results to context
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0)
      const maxScore = questions.length * 4
      const percentage = totalScore / maxScore
      let resultLevel = 'good'
      if (percentage >= 0.65) resultLevel = 'critical'
      else if (percentage >= 0.4) resultLevel = 'moderate'

      addAssessment({
        type: 'it',
        title: 'IT Health Check',
        answers: newAnswerTexts,
        resultLevel,
        completedAt: new Date()
      })
      setSavedToForm(true)
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1])
      setSelectedText(answerTexts[currentQuestion - 1]?.answer || null)
      setAnswers(answers.slice(0, -1))
      setAnswerTexts(answerTexts.slice(0, -1))
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setAnswerTexts([])
    setShowResults(false)
    setSelectedOption(null)
    setSelectedText(null)
    setSavedToForm(false)
  }

  const handleClose = () => {
    setIsExpanded(false)
    handleReset()
  }

  const getResult = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 4
    const percentage = totalScore / maxScore

    if (percentage >= 0.65) return results.critical
    if (percentage >= 0.4) return results.moderate
    return results.good
  }

  const progress = ((currentQuestion + (selectedOption !== null ? 0.5 : 0)) / questions.length) * 100

  return (
    <section id="it-assessment" className="pt-8 pb-16 bg-dark-925 relative">

      {/* Animated Background - Always visible */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs - matching tones with AI Assessment for cohesion */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-500/8 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-purple-500/6 rounded-full blur-[100px]"
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full hidden lg:block"
            style={{
              left: `${20 + i * 9}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-16 -left-16 w-[220px] h-[220px] border border-primary-500/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -right-20 w-[180px] h-[180px] border border-cyan-500/10 rounded-full hidden lg:block"
        />

        {/* Animated grid pattern */}
        <motion.div
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Shared hexagon elements - connecting visual with AI Assessment */}
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] right-[10%] hidden lg:block"
        >
          <GlowingHexagon size={38} color="cyan" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-[20%] left-[10%] hidden lg:block"
        >
          <GlowingHexagon size={42} color="mixed" filled />
        </motion.div>

        {/* Hexagons that flow into Contact section below */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute bottom-[-5%] right-[15%] hidden lg:block"
        >
          <HexagonCluster scale={0.65} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -18, 0], x: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
          className="absolute bottom-[-8%] left-[10%] hidden lg:block"
        >
          <GlowingHexagon size={48} color="blue" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[5%] right-[25%] hidden md:block"
        >
          <GlowingHexagon size={35} color="cyan" filled />
        </motion.div>

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-3%] left-[30%] hidden lg:block"
        >
          <GlowingHexagon size={40} color="mixed" />
        </motion.div>
      </div>

      <div className="container-width relative z-10">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Collapsed State - CTA Card */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <motion.button
                onClick={() => setIsExpanded(true)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full glass rounded-2xl p-6 text-left group relative overflow-hidden border border-primary-500/10 hover:border-primary-500/30 transition-colors"
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />

                <div className="flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow flex-shrink-0"
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
                        Free IT Health Check
                      </h3>
                      <p className="text-dark-400 text-sm mt-1 group-hover:text-dark-300 transition-colors">
                        Find out where your technology stands in 2 minutes
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-2 text-primary-400 group-hover:text-primary-300 flex-shrink-0"
                  >
                    <span className="hidden md:inline font-medium">Start</span>
                    <div className="p-2 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>

                {/* Animated border glow */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-[1px] bg-gradient-to-r from-primary-500/20 via-cyan-500/20 to-primary-500/20 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
                />
              </motion.button>
            </motion.div>
          ) : (
            /* Expanded State - Full Quiz */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4"
                >
                  <Shield className="w-4 h-4" />
                  IT Health Check
                </motion.span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  How Healthy Is Your{' '}
                  <span className="gradient-text">IT Infrastructure?</span>
                </h2>
              </div>

              {/* Quiz Container */}
              <div className="glass rounded-2xl p-8 relative overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Progress Bar */}
                {!showResults && (
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-dark-400 mb-2">
                      <span>Question {currentQuestion + 1} of {questions.length}</span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!showResults ? (
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Question */}
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        {questions[currentQuestion].question}
                      </h3>
                      <p className="text-dark-400 mb-6">
                        {questions[currentQuestion].subtext}
                      </p>

                      {/* Options */}
                      <div className="space-y-3 mb-8">
                        {questions[currentQuestion].options.map((option, index) => {
                          const isSelected = selectedText === option.text
                          return (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => handleAnswer(option.score, option.text)}
                              className={`w-full p-4 rounded-xl text-left transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-2 border-primary-500'
                                  : 'bg-dark-800/50 border-2 border-transparent hover:border-dark-600'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-primary-500 bg-primary-500'
                                      : 'border-dark-500'
                                  }`}
                                >
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-2 h-2 bg-white rounded-full"
                                    />
                                  )}
                                </div>
                                <span className={isSelected ? 'text-white' : 'text-dark-300'}>
                                  {option.text}
                                </span>
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between">
                        <button
                          onClick={handleBack}
                          disabled={currentQuestion === 0}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            currentQuestion === 0
                              ? 'text-dark-600 cursor-not-allowed'
                              : 'text-dark-300 hover:text-white hover:bg-dark-800'
                          }`}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <motion.button
                          onClick={handleNext}
                          disabled={selectedOption === null}
                          whileHover={selectedOption !== null ? { scale: 1.02 } : {}}
                          whileTap={selectedOption !== null ? { scale: 0.98 } : {}}
                          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                            selectedOption === null
                              ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-lg shadow-primary-500/25'
                          }`}
                        >
                          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      {/* Results */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${getResult().color} mb-6`}
                      >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </motion.div>

                      <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r ${getResult().color} bg-clip-text text-transparent`}>
                        {getResult().title}
                      </h3>

                      <p className="text-dark-300 mb-8 max-w-lg mx-auto">
                        {getResult().description}
                      </p>

                      <div className="text-left bg-dark-800/50 rounded-xl p-6 mb-8">
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-primary-400" />
                          Recommended Next Steps
                        </h4>
                        <ul className="space-y-3">
                          {getResult().recommendations.map((rec, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="flex items-center gap-3 text-dark-300"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getResult().color}`} />
                              {rec}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Saved to form message */}
                      {savedToForm && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                        >
                          <div className="flex items-center gap-3 text-green-400">
                            <FileCheck className="w-5 h-5" />
                            <span className="font-medium">Assessment added to contact form below!</span>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          onClick={scrollToContact}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25"
                        >
                          Schedule Your Free IT Consultation
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                        <button
                          onClick={handleReset}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Retake Assessment
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decorative glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-[1px] bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl -z-10 blur-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
