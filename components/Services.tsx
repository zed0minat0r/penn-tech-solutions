'use client'

import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Network,
  CreditCard,
  Globe,
  Camera,
  Package,
  Code,
  ChevronRight,
  Sparkles,
  Brain,
  ShieldAlert,
  Check,
} from 'lucide-react'

const services = [
  {
    icon: Phone,
    title: 'Cloud VoIP & Telecom',
    shortDesc: 'Enterprise phone features at small business prices',
    description:
      'Ditch the expensive PBX hardware. Our cloud phone systems give small businesses enterprise-level features at a fraction of the cost—use your existing computers and smartphones as soft phones, and only add desk phones where they make sense.',
    features: ['No Costly PBX Hardware', 'Soft Phones on Devices You Own', 'Pay-Per-User Pricing', 'Professional Conference Solutions'],
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
  },
  {
    icon: Network,
    title: 'Network Infrastructure',
    shortDesc: 'Lean, secure networks sized for your team',
    description:
      'Small businesses don\'t need enterprise-grade complexity. We build lean, secure networks sized for your team—whether that\'s 5 employees or 50. No unnecessary hardware, no inflated costs.',
    features: ['Business-Grade Firewalls', 'Managed Switch Infrastructure', 'Structured Cabling', 'Enterprise WiFi Coverage'],
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
  },
  {
    icon: CreditCard,
    title: 'PoS Systems',
    shortDesc: 'Modern point-of-sale for retail & restaurants',
    description:
      'Get your retail shop or restaurant running smoothly with modern point-of-sale systems. We handle setup, payment integration, and training so you can serve customers from day one.',
    features: ['Quick Setup & Go-Live', 'Payment Processing Ready', 'Basic Inventory Tracking', 'Hands-On Staff Training'],
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
  },
  {
    icon: Globe,
    title: 'Websites',
    shortDesc: 'Professional web presence that works',
    description:
      'Your small business needs an online presence that works—not an overpriced agency project. We build clean, professional websites that load fast, look great on phones, and help customers find you.',
    features: ['Affordable Custom Design', 'Mobile-First Approach', 'Google-Friendly SEO', 'Easy Self-Service Updates'],
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
  },
  {
    icon: Camera,
    title: 'Security Systems',
    shortDesc: 'Cameras & access control on a budget',
    description:
      'Protect your storefront, office, or warehouse without breaking the bank. We install camera systems and access control sized for small business budgets—with remote viewing so you can check in anytime.',
    features: ['Budget-Friendly Cameras', 'Keycard & Fob Access', 'View From Your Phone', 'Local or Cloud Storage'],
    gradient: 'from-red-500 to-rose-500',
    bgGradient: 'from-red-500/20 via-rose-500/10 to-transparent',
  },
  {
    icon: ShieldAlert,
    title: 'Anti-Virus & Data Protection',
    shortDesc: 'Real protection against cyber threats',
    description:
      'Cyber attacks are at an all-time high—and hackers know small businesses are easy targets. Most small companies think "it won\'t happen to us" until it does. We set up real protection that stops ransomware, phishing, and data breaches before they devastate your business.',
    features: ['Enterprise-Grade Antivirus', 'Automated Backup Systems', 'Email & Phishing Protection', 'Security Awareness Training'],
    gradient: 'from-rose-500 to-red-600',
    bgGradient: 'from-rose-500/20 via-red-600/10 to-transparent',
  },
  {
    icon: Package,
    title: 'Equipment Procurement',
    shortDesc: 'Wholesale pricing, complete setup',
    description:
      'Skip the markup from big-box stores. We source computers, networking gear, and peripherals at competitive prices—and set everything up so it works together out of the box.',
    features: ['Wholesale Pricing Access', 'No Overselling', 'Complete Setup Included', 'Warranty Coordination'],
    gradient: 'from-indigo-500 to-violet-500',
    bgGradient: 'from-indigo-500/20 via-violet-500/10 to-transparent',
  },
  {
    icon: Code,
    title: 'Custom App Development',
    shortDesc: 'Automate the busywork',
    description:
      'Got a manual process eating up your team\'s time? We build simple custom tools to automate the busywork—inventory trackers, scheduling apps, customer portals—whatever helps your small business run smoother.',
    features: ['Workflow Automation', 'Connect Your Existing Tools', 'Simple Mobile Apps', 'Affordable Maintenance'],
    gradient: 'from-cyan-500 to-teal-500',
    bgGradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
  },
  {
    icon: Brain,
    title: 'AI Business Integration',
    shortDesc: 'Practical AI tools, no complexity',
    description:
      'AI isn\'t just for big corporations anymore. We help small businesses harness practical AI tools—chatbots, document processing, workflow automation—without the complexity. No tech expertise required.',
    features: ['24/7 AI Chatbots', 'Automated Data Entry', 'Plain-English Business Insights', 'Team Training Included'],
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    link: '#ai',
  },
]

// Service Card Component - Memoized to prevent unnecessary re-renders
const ServiceCard = memo(function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle
}: {
  service: typeof services[0]
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
      <motion.div
        layout
        onClick={onToggle}
        className={`relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ${
          isExpanded
            ? 'bg-dark-800/80 ring-1 ring-white/10'
            : 'bg-dark-800/40 hover:bg-dark-800/60'
        }`}
      >
        {/* Animated gradient border */}
        <motion.div
          className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ${
            isExpanded ? 'opacity-100' : 'group-hover:opacity-100'
          }`}
          style={{
            background: `linear-gradient(135deg, ${service.gradient.split(' ')[0].replace('from-', '')}40, transparent 50%, ${service.gradient.split(' ')[1].replace('to-', '')}40)`,
            padding: '1px',
          }}
        >
          <div className="absolute inset-[1px] rounded-2xl bg-dark-800/95" />
        </motion.div>

        {/* Background gradient glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 transition-opacity duration-500 ${
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
              <motion.div
                animate={isExpanded ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
              />

              {/* Icon */}
              <motion.div
                animate={isExpanded ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
                className={`relative p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>

            {/* Title & Short Description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-white transition-colors line-clamp-2">
                {service.title}
              </h3>
              <p className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors line-clamp-2">
                {service.shortDesc}
              </p>
            </div>

            {/* Expand Arrow */}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isExpanded
                  ? `bg-gradient-to-br ${service.gradient}`
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
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pt-5 mt-5 border-t border-dark-700/50"
                >
                  <p className="text-dark-300 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Animated Feature Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.15 + featureIndex * 0.08,
                          ease: "easeOut"
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-dark-900/50 group/feature hover:bg-dark-900/80 transition-colors"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.2 + featureIndex * 0.08,
                            type: "spring",
                            stiffness: 500,
                            damping: 25
                          }}
                          className={`p-1 rounded-md bg-gradient-to-br ${service.gradient}`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                        <span className="text-sm text-dark-300 group-hover/feature:text-dark-200 transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Link (for AI service) */}
                  {'link' in service && service.link && (
                    <motion.a
                      href={service.link}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-gradient-to-r ${service.gradient} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
                    >
                      Learn More About AI Solutions
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
      </motion.div>
    </motion.div>
  )
})

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="services" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950/50" />

      {/* Floating orbs */}
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

      <div className="container-width relative z-10">
        {/* Section Header */}
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
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Technology Solutions for{' '}
            <span className="gradient-text">Small Businesses</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-dark-300"
          >
            Cloud-first solutions that cut costs by eliminating unnecessary hardware.
            <span className="text-dark-400 block mt-1">Click any service to explore.</span>
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
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
            Need a custom solution? We&apos;ll tailor our services to your needs.
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
            Schedule a Consultation
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
