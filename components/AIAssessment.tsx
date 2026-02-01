'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, RotateCcw, ChevronDown, X, FileCheck } from 'lucide-react'
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
    question: 'How much time does your team spend on repetitive tasks each week?',
    subtext: 'Think about data entry, scheduling, responding to common questions, etc.',
    options: [
      { text: 'Less than 5 hours', score: 1 },
      { text: '5-15 hours', score: 2 },
      { text: '15-30 hours', score: 3 },
      { text: 'More than 30 hours', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'How do you currently handle customer inquiries outside business hours?',
    subtext: 'Emails, phone calls, website messages, etc.',
    options: [
      { text: 'We don\'t - they wait until we\'re open', score: 4 },
      { text: 'Voicemail and email auto-replies', score: 3 },
      { text: 'Basic chatbot or FAQ page', score: 2 },
      { text: 'We have 24/7 staff coverage', score: 1 },
    ],
  },
  {
    id: 4,
    question: 'How organized is your business data (invoices, customer info, inventory)?',
    subtext: 'Consider spreadsheets, filing systems, software, etc.',
    options: [
      { text: 'Mostly paper or scattered files', score: 4 },
      { text: 'Basic spreadsheets, some duplicates', score: 3 },
      { text: 'Organized digital systems', score: 2 },
      { text: 'Fully integrated software suite', score: 1 },
    ],
  },
  {
    id: 5,
    question: 'How comfortable is your team with learning new technology?',
    subtext: 'Be honest - this helps us recommend the right level of support.',
    options: [
      { text: 'Very hesitant - we stick to what we know', score: 1 },
      { text: 'Cautious but willing with good training', score: 2 },
      { text: 'Generally open to new tools', score: 3 },
      { text: 'We love trying new tech', score: 4 },
    ],
  },
  {
    id: 6,
    question: 'What\'s your biggest pain point right now?',
    subtext: 'Select the one that resonates most.',
    options: [
      { text: 'Can\'t keep up with customer inquiries', score: 3, category: 'customer' },
      { text: 'Too much manual data entry', score: 3, category: 'data' },
      { text: 'Difficulty getting insights from our data', score: 3, category: 'insights' },
      { text: 'Staff overwhelmed with routine tasks', score: 3, category: 'automation' },
    ],
  },
]

const results = {
  high: {
    title: 'High AI Opportunity',
    description: 'Your business has significant potential to benefit from AI integration. You\'re spending considerable time on tasks that AI could handle, and there are clear opportunities to improve efficiency.',
    recommendations: [
      'AI-powered chatbot for 24/7 customer service',
      'Automated document processing and data entry',
      'Workflow automation for repetitive tasks',
      'Business intelligence dashboards',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  medium: {
    title: 'Moderate AI Opportunity',
    description: 'You have some processes that could benefit from AI, but you\'re not drowning in manual work. Strategic AI implementation in key areas could give you a competitive edge.',
    recommendations: [
      'Targeted chatbot for common questions',
      'Automated scheduling and follow-ups',
      'Data organization and insights tools',
      'Team training on AI productivity tools',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  low: {
    title: 'Foundation Building',
    description: 'Your current setup is working reasonably well, but there are still opportunities to future-proof your business with AI. We\'d recommend starting with foundational improvements.',
    recommendations: [
      'Data organization and digitization',
      'Basic automation for scheduling',
      'AI awareness training for your team',
      'Strategic planning for future AI adoption',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
}

export default function AIAssessment() {
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
      let resultLevel = 'low'
      if (percentage >= 0.65) resultLevel = 'high'
      else if (percentage >= 0.4) resultLevel = 'medium'

      addAssessment({
        type: 'ai',
        title: 'AI Readiness Assessment',
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

    if (percentage >= 0.65) return results.high
    if (percentage >= 0.4) return results.medium
    return results.low
  }

  const progress = ((currentQuestion + (selectedOption !== null ? 0.5 : 0)) / questions.length) * 100

  return (
    <section id="ai-assessment" className="pt-16 pb-8 bg-dark-925 relative">
      {/* Gradient blend at top - fades from Testimonials (dark-950) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-950 to-transparent pointer-events-none" />

      {/* Animated Background - Always visible */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs - using shared purple/blue tones */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-primary-500/8 rounded-full blur-[100px]"
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full hidden lg:block"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-[250px] h-[250px] border border-purple-500/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-16 -left-16 w-[200px] h-[200px] border border-pink-500/10 rounded-full hidden lg:block"
        />

        {/* Animated grid pattern */}
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Shared hexagon elements - connecting visual */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[8%] hidden lg:block"
        >
          <GlowingHexagon size={40} color="purple" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[25%] right-[10%] hidden lg:block"
        >
          <GlowingHexagon size={35} color="mixed" filled />
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[20%] left-[12%] hidden lg:block"
        >
          <HexagonCluster scale={0.6} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[15%] right-[8%] hidden lg:block"
        >
          <GlowingHexagon size={45} color="blue" />
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
                className="w-full glass rounded-2xl p-6 text-left group relative overflow-hidden border border-purple-500/10 hover:border-purple-500/30 transition-colors"
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />

                <div className="flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow flex-shrink-0"
                    >
                      <Brain className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                        Free AI Readiness Assessment
                      </h3>
                      <p className="text-dark-400 text-sm mt-1 group-hover:text-dark-300 transition-colors">
                        Discover how AI could transform your business in 2 minutes
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 flex-shrink-0"
                  >
                    <span className="hidden md:inline font-medium">Start</span>
                    <div className="p-2 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
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
                  className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4"
                >
                  <Brain className="w-4 h-4" />
                  AI Readiness Assessment
                </motion.span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Is Your Business Ready for{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI?</span>
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
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
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
                                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500'
                                  : 'bg-dark-800/50 border-2 border-transparent hover:border-dark-600'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-purple-500 bg-purple-500'
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
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
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
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          Recommended AI Solutions
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
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/25"
                        >
                          Get Your Free AI Consultation
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
                  className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl -z-10 blur-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
