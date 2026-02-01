'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'AI Solutions', href: '#ai' },
  { name: 'Free Assessments', href: '#ai-assessment' },
  // { name: 'Pricing', href: '#pricing' },
  // { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // Small delay to let menu close, then scroll
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container-width">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 group-hover:scale-105 transition-transform rounded-lg overflow-hidden">
              <Image
                src="/images/just logo.png"
                alt="Penn Tech Solutions Logo"
                fill
                className="object-contain mix-blend-lighten"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-cyan-500/10 mix-blend-overlay pointer-events-none" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">
              Penn Tech <span className="gradient-text">Solutions</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-dark-300 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ filter: 'blur(8px)' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button with micro-interactions */}
          <div className="hidden md:block">
            <motion.a
              href="#contact"
              className="btn-primary relative overflow-hidden group inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-dark-300 hover:text-white transition-colors relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {/* Glow effect on button */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'blur(8px)' }}
            />
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-dark-700/50 overflow-hidden"
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="container-width py-4 space-y-1 relative">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative block py-3 px-4 text-dark-300 hover:text-white rounded-lg transition-colors group"
                  onClick={(e) => handleMobileNavClick(e, link.href)}
                >
                  {/* Gradient background on hover/tap */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"
                    style={{ filter: 'blur(8px)' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"
                  />

                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gradient-to-b from-primary-500 to-cyan-500 group-hover:h-1/2 group-active:h-1/2 transition-all duration-300 rounded-full"
                  />

                  {/* Link text */}
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
                    {link.name}
                  </span>
                </motion.a>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary block text-center relative overflow-hidden group"
                  onClick={(e) => handleMobileNavClick(e, '#contact')}
                >
                  <span className="relative z-10">Get Started</span>
                  {/* Shine effect on tap */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-500"
                  />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
