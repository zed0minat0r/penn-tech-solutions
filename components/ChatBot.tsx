'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, AlertCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary-400 rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  )
})

const MessageBubble = memo(function MessageBubble({
  message,
  index,
}: {
  message: Message
  index: number
}) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
            : 'glass text-gray-100'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </motion.div>
  )
})

const WelcomeMessage = memo(function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start"
    >
      <div className="glass max-w-[80%] rounded-2xl px-4 py-2.5 text-gray-100">
        <p className="text-sm leading-relaxed">
          Hi! I&apos;m the Penn Tech Solutions assistant. How can I help you with your
          IT needs today? Feel free to ask about our services, from VoIP systems
          to network infrastructure.
        </p>
      </div>
    </motion.div>
  )
})

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasOpened, setHasOpened] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setHasOpened(true)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const trimmedInput = input.trim()
      if (!trimmedInput || isLoading) return

      setError(null)
      const userMessage: Message = { role: 'user', content: trimmedInput }
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to send message')
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error('No response body')

        const decoder = new TextDecoder()
        let assistantContent = ''

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  assistantContent += parsed.text
                  setMessages((prev) => {
                    const updated = [...prev]
                    updated[updated.length - 1] = {
                      role: 'assistant',
                      content: assistantContent,
                    }
                    return updated
                  })
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setMessages((prev) => {
          if (prev[prev.length - 1]?.role === 'assistant' && prev[prev.length - 1]?.content === '') {
            return prev.slice(0, -1)
          }
          return prev
        })
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, messages]
  )

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="fixed bottom-6 z-50 right-4 sm:right-6 lg:right-[max(2rem,calc((100vw-1280px)/2+2rem))] w-[60px] h-[60px] rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7" />
          {!hasOpened && (
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 z-50 right-4 sm:right-6 lg:right-[max(2rem,calc((100vw-1280px)/2+2rem))] w-[400px] h-[500px] flex flex-col glass rounded-2xl shadow-2xl shadow-black/30 overflow-hidden max-md:inset-4 max-md:w-auto max-md:h-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700/50 bg-dark-900/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <h3 className="font-semibold text-white">Penn Tech Solutions</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <WelcomeMessage />
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} index={index} />
              ))}
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <TypingIndicator />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mx-4 mb-2 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-dark-700/50 bg-dark-900/50"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-dark-800/80 border border-dark-700/50 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-11 h-11 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white hover:from-primary-400 hover:to-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
