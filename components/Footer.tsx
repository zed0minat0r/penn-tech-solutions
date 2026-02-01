'use client'

import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'VoIP & Telecom', href: '#services' },
    { name: 'Network Infrastructure', href: '#services' },
    { name: 'Security Systems', href: '#services' },
    { name: 'Anti-Virus & Data Protection', href: '#services' },
    { name: 'Websites & Apps', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'AI Solutions', href: '#ai' },
    { name: 'AI Assessment', href: '#ai-assessment' },
    { name: 'IT Assessment', href: '#it-assessment' },
    // { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'SLA', href: '#' },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Penn Tech <span className="gradient-text">Solutions</span>
              </span>
            </a>
            <p className="text-dark-400 mb-6 max-w-sm">
              Your local IT partner for small businesses in the Greater Philadelphia area.
              From phones to networks to security—we handle it all with personal service.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@penntechsolutions.com" className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-primary-500" />
                info@penntechsolutions.com
              </a>
              <a href="tel:+12155551234" className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-primary-500" />
                (215) 555-1234
              </a>
              <div className="flex items-center gap-3 text-dark-400">
                <MapPin className="w-5 h-5 text-primary-500" />
                Greater Philadelphia Area
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-dark-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-dark-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-dark-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            &copy; {new Date().getFullYear()} Penn Tech Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="p-2 text-dark-500 hover:text-white hover:bg-dark-800 rounded-lg transition-all"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
