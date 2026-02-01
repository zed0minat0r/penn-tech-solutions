'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Star, Quote, MessageSquare } from 'lucide-react'
import { GlowingHexagon, HexagonCluster, AmbientHexagon } from './NetworkDecor'

const testimonials = [
  {
    quote:
      "Finally, an IT company that actually picks up the phone! Penn Tech set up our whole office—phones, network, security cameras—and they're always there when we need them.",
    author: 'Mike Romano',
    role: 'Owner',
    company: 'Romano\'s Auto Body',
    rating: 5,
  },
  {
    quote:
      "They built us a website that actually brings in customers, set up our point-of-sale system, and saved us money on our phone bill. Can't recommend them enough.",
    author: 'Linda Chen',
    role: 'Owner',
    company: 'Main Street Boutique',
    rating: 5,
  },
  {
    quote:
      "As a small law firm, we needed someone we could trust with our tech. Penn Tech has been professional, responsive, and they never try to sell us stuff we don't need.",
    author: 'David Foster',
    role: 'Partner',
    company: 'Foster & Klein Law',
    rating: 5,
  },
]

// 3D Testimonial Card Component
function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])
  const brightness = useTransform(mouseXSpring, [-0.5, 0.5], [0.9, 1.1])

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

  // Gradient colors for different cards
  const gradients = [
    'from-blue-500/20 to-cyan-500/20',
    'from-purple-500/20 to-pink-500/20',
    'from-green-500/20 to-emerald-500/20',
    'from-orange-500/20 to-amber-500/20',
    'from-red-500/20 to-rose-500/20',
    'from-indigo-500/20 to-violet-500/20',
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
        whileHover={{ scale: 1.03 }}
        style={{ filter: `brightness(${brightness})` }}
        className="h-full glass rounded-2xl p-6 lg:p-8 relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Quote Icon with 3D effect */}
        <motion.div
          animate={{
            rotateY: [0, 10, -10, 0],
            y: [0, -3, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
          className="mb-4 relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Quote className="w-8 h-8 text-primary-500/30" />
        </motion.div>

        {/* Rating with staggered animation */}
        <div className="flex gap-1 mb-4 relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
            >
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-dark-200 mb-6 leading-relaxed relative z-10" style={{ transform: 'translateZ(15px)' }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 relative z-10" style={{ transform: 'translateZ(25px)' }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary-500/30"
          >
            {testimonial.author
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </motion.div>
          <div>
            <p className="text-white font-semibold group-hover:text-primary-400 transition-colors">
              {testimonial.author}
            </p>
            <p className="text-dark-400 text-sm">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />

        {/* Border glow on hover */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px]"
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary-500/10 rounded-lg"
            style={{
              width: 20 + (i * 5),
              height: 20 + (i * 5),
              left: `${10 + i * 10}%`,
              top: `${10 + (i * 10)}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Hexagon patterns */}
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[2%] hidden lg:block"
      >
        <AmbientHexagon size={320} color="purple" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-[5%] right-[3%] hidden lg:block"
      >
        <AmbientHexagon size={280} color="cyan" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, 2.5, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[12%] right-[10%] hidden lg:block"
      >
        <HexagonCluster scale={0.85} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[18%] left-[6%] hidden lg:block"
      >
        <HexagonCluster scale={0.75} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[15%] hidden md:block"
      >
        <GlowingHexagon size={40} color="blue" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[30%] right-[18%] hidden md:block"
      >
        <GlowingHexagon size={36} color="cyan" filled />
      </motion.div>

      <motion.div
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[35%] left-[22%] hidden lg:block"
      >
        <GlowingHexagon size={44} color="purple" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[28%] right-[15%] hidden md:block"
      >
        <GlowingHexagon size={38} color="mixed" filled />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[45%] left-[8%] hidden lg:block"
      >
        <GlowingHexagon size={32} color="blue" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[55%] right-[10%] hidden md:block"
      >
        <GlowingHexagon size={50} color="cyan" />
      </motion.div>

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
            <MessageSquare className="w-4 h-4" />
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Local{' '}
            <span className="gradient-text">Businesses</span>
          </h2>
          <p className="text-lg text-dark-300">
            Don&apos;t just take our word for it. Here&apos;s what small business owners have to say about
            partnering with Penn Tech Solutions.
          </p>
        </motion.div>

        {/* Testimonials Grid with 3D perspective */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-2000">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Indicator with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-full glass group"
          >
            <div className="flex -space-x-3">
              {['M', 'L', 'D', 'R'].map((initial, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5, zIndex: 10 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold border-2 border-dark-800 shadow-lg relative"
                >
                  {initial}
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-dark-300"
              >
                Join <span className="text-white font-semibold">500+</span> satisfied clients
              </motion.span>
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-primary-400"
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
