'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Cloud VoIP Setup',
    description: 'Affordable cloud phone system—no expensive PBX hardware',
    price: 'From $99',
    period: '/user',
    features: [
      'Cloud-Hosted (No Hardware Costs)',
      'Soft Phones on Existing Devices',
      'Desk Phones Only Where Needed',
      'Call Routing & Voicemail',
      'User Training Included',
      'Low Monthly Service Fees',
    ],
    cta: 'Get a Quote',
    popular: false,
  },
  {
    name: 'Conference Room',
    description: 'Meeting spaces using cloud services you already pay for',
    price: 'Custom',
    period: 'quote',
    features: [
      'Leverage Existing Subscriptions',
      'Teams/Zoom/Meet Integration',
      'Display & Screen Sharing',
      'Simple, Cost-Effective Setup',
      'No Proprietary Lock-In',
      'Training & Documentation',
    ],
    cta: 'Get a Quote',
    popular: true,
  },
  {
    name: 'Lean Network Setup',
    description: 'Right-sized networks—only pay for what you need',
    price: 'Custom',
    period: 'quote',
    features: [
      'Needs Assessment First',
      'No Over-Engineering',
      'Quality Hardware at Fair Prices',
      'Firewall & WiFi Setup',
      'Structured Cabling',
      'Documentation & Support',
    ],
    cta: 'Get a Quote',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-dark-900 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950/50" />

      <div className="container-width relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Cut Costs With{' '}
            <span className="gradient-text">Cloud Solutions</span>
          </h2>
          <p className="text-lg text-dark-300">
            Stop paying for infrastructure you don&apos;t need. Our cloud-first approach
            reduces upfront costs and keeps monthly expenses low.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`h-full rounded-2xl p-6 lg:p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary-500/10 to-cyan-500/10 border-2 border-primary-500/30'
                    : 'glass'
                }`}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-dark-400 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl lg:text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period !== 'quote' && (
                      <span className="text-dark-400">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-dark-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25'
                      : 'bg-dark-700 text-white hover:bg-dark-600 border border-dark-600'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-dark-400 mb-4">
            Not sure what you need? We offer free consultations to assess your requirements.
          </p>
          <a href="#contact" className="text-primary-400 hover:text-primary-300 font-medium">
            Schedule a free consultation →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
