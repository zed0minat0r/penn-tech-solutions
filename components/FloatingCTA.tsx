'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, Mail, Calendar, Bot, Send, ArrowLeft } from 'lucide-react'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm Penn Tech's virtual assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
]

const quickReplies = [
  "What services do you offer?",
  "I need help with my network",
  "Tell me about VoIP phones",
  "I want to schedule a consultation",
]

// Simple bot responses based on keywords
function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do you do')) {
    return "We offer a full range of IT services including Cloud VoIP & Telecom, Network Infrastructure, Security Systems, Websites, Custom App Development, and AI Integration. Would you like details on any specific service?"
  }

  if (lowerMessage.includes('voip') || lowerMessage.includes('phone') || lowerMessage.includes('telecom')) {
    return "Our Cloud VoIP solutions give small businesses enterprise-level phone features at a fraction of the cost. You can use soft phones on devices you already own, and we offer pay-per-user pricing. Want to schedule a free consultation to learn more?"
  }

  if (lowerMessage.includes('network') || lowerMessage.includes('wifi') || lowerMessage.includes('internet')) {
    return "We build lean, secure networks sized for your team—whether that's 5 employees or 50. This includes business-grade firewalls, managed switches, structured cabling, and enterprise WiFi. Would you like a free network assessment?"
  }

  if (lowerMessage.includes('security') || lowerMessage.includes('camera') || lowerMessage.includes('access control')) {
    return "We install camera systems and access control sized for small business budgets—with remote viewing so you can check in anytime. Our solutions include keycard/fob access and local or cloud storage options."
  }

  if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
    return "We build clean, professional websites that load fast, look great on phones, and help customers find you. Our approach is mobile-first with Google-friendly SEO built in. Would you like to see some examples?"
  }

  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('chatbot')) {
    return "We help small businesses harness practical AI tools—chatbots, document processing, workflow automation—without the complexity. Take our free AI Readiness Quiz on the website to see if AI can help your business!"
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return "Our pricing is transparent and right-sized for small businesses. We recommend what you actually need, not the most expensive option. Would you like to schedule a free consultation to get a custom quote?"
  }

  if (lowerMessage.includes('schedule') || lowerMessage.includes('consultation') || lowerMessage.includes('meeting') || lowerMessage.includes('call')) {
    return "Great! You can reach us at (215) 555-1234 or fill out the contact form on our website. We offer free consultations and can meet in person, by phone, or video call. What works best for you?"
  }

  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('area') || lowerMessage.includes('philly') || lowerMessage.includes('philadelphia')) {
    return "We're based in the Greater Philadelphia area and serve Montgomery, Bucks, Chester, and Delaware Counties. We provide on-site support with fast response times because we're local!"
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to Penn Tech Solutions. I can help you learn about our services, get pricing information, or schedule a consultation. What would you like to know?"
  }

  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with today?"
  }

  return "Thanks for your message! For detailed questions, I'd recommend speaking with one of our team members. Would you like to schedule a free consultation, or is there something specific about our services I can help clarify?"
}

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const openChatBot = () => {
    setIsOpen(false)
    setIsChatOpen(true)
  }

  const closeChatBot = () => {
    setIsChatOpen(false)
  }

  const contactOptions = [
    { icon: Bot, label: 'Chat Bot', action: openChatBot, color: 'from-cyan-500 to-teal-500' },
    { icon: Phone, label: 'Call Us', href: 'tel:+12155551234', color: 'from-green-500 to-emerald-500' },
    { icon: Mail, label: 'Email', href: '#contact', color: 'from-primary-500 to-blue-500' },
    { icon: Calendar, label: 'Schedule', href: '#contact', color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-4 sm:right-[10%] z-50"
    >
          {/* Chat Bot Window */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-96 bg-dark-800/95 backdrop-blur-xl rounded-2xl border border-dark-700/50 shadow-2xl shadow-primary-500/10 overflow-hidden"
              >
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-500 to-cyan-500">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Penn Tech Assistant</h3>
                      <p className="text-white/70 text-xs">Online | Typically replies instantly</p>
                    </div>
                  </div>
                  <button
                    onClick={closeChatBot}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isBot
                            ? 'bg-dark-700 text-white rounded-bl-md'
                            : 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-br-md'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-dark-700 p-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-dark-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                            className="w-2 h-2 bg-dark-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-dark-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2">
                    <p className="text-dark-400 text-xs mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSendMessage(reply)}
                          className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-200 rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-dark-700/50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 bg-dark-700 text-white placeholder-dark-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className="p-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded Contact Options */}
          <AnimatePresence>
            {isOpen && !isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
              >
                {contactOptions.map((option, index) => (
                  option.action ? (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={option.action}
                      className="flex items-center gap-3 px-4 py-3 bg-dark-800/95 backdrop-blur-lg rounded-xl border border-dark-700/50 shadow-xl hover:border-primary-500/50 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color}`}>
                        <option.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium whitespace-nowrap">{option.label}</span>
                    </motion.button>
                  ) : (
                    <motion.a
                      key={option.label}
                      href={option.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-dark-800/95 backdrop-blur-lg rounded-xl border border-dark-700/50 shadow-xl hover:border-primary-500/50 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color}`}>
                        <option.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium whitespace-nowrap">{option.label}</span>
                    </motion.a>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => {
              if (isChatOpen) {
                setIsChatOpen(false)
              } else {
                setIsOpen(!isOpen)
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-4 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
          >
            {/* Pulse ring */}
            {!isOpen && !isChatOpen && (
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary-500"
              />
            )}

            <motion.div
              animate={{ rotate: isOpen || isChatOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen || isChatOpen ? (
                <X className="w-6 h-6 relative z-10" />
              ) : (
                <MessageCircle className="w-6 h-6 relative z-10" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>
  )
}
