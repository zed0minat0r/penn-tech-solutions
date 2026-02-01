import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { colors, sharedStyles } from '../shared/styles'
import {
  CoverPage,
  PageHeader,
  PageFooter,
  SectionHeader,
  BulletItem,
  CalloutBox,
  StatBox,
} from '../shared/components'

// Package tiers
const packages = [
  {
    name: 'Starter',
    tagline: 'Website + Hosting',
    monthlyPrice: '$99',
    term: '12 months',
    websiteValue: '$2,000',
    features: [
      'Professional 5-page website',
      'Mobile-responsive design',
      'Managed hosting & SSL certificate',
      'Monthly security updates',
      'Daily automated backups',
      'Email support for website issues',
      '2 content updates per month',
    ],
    color: '#3b82f6',
  },
  {
    name: 'Business',
    tagline: 'Website + Maintenance',
    monthlyPrice: '$149',
    term: '12 months',
    websiteValue: '$3,500',
    features: [
      'Professional 10-page website',
      'Mobile-responsive design',
      'Managed hosting & SSL certificate',
      'Monthly security updates',
      'Daily automated backups',
      'Email & phone support',
      'Unlimited content updates',
      'Monthly performance reporting',
      'Google Business Profile setup',
    ],
    color: colors.primary,
    featured: true,
  },
  {
    name: 'Business+',
    tagline: 'Website + IT Services',
    monthlyPrice: '$249',
    term: '12 months',
    websiteValue: '$5,000',
    features: [
      'Custom website (up to 20 pages)',
      'Mobile-responsive design',
      'Managed hosting & SSL certificate',
      'Monthly security updates',
      'Daily automated backups',
      'Priority phone & email support',
      'Unlimited content updates',
      'Monthly analytics reporting',
      'Network health check (quarterly)',
      'Discounted IT service rates',
    ],
    color: '#a855f7',
  },
]

// What's included breakdown
const includedServices = [
  {
    category: 'Website Services',
    items: [
      { service: 'Custom Website Design', description: 'Professional, mobile-first design tailored to your brand' },
      { service: 'Managed Hosting', description: 'Fast, secure hosting on enterprise-grade servers' },
      { service: 'SSL Certificate', description: 'Secure HTTPS connection - required for Google ranking' },
      { service: 'Daily Backups', description: 'Automated backups with 30-day retention' },
      { service: 'Security Updates', description: 'Monthly patches and security maintenance' },
      { service: 'Content Updates', description: 'We make updates so you can focus on your business' },
    ],
  },
  {
    category: 'Support & Maintenance',
    items: [
      { service: 'Email & Phone Support', description: 'Direct access to our team for website questions' },
      { service: 'Content Updates', description: 'Text, image, and page updates as needed' },
      { service: 'Performance Monitoring', description: 'We monitor uptime and site speed' },
      { service: 'Analytics Reporting', description: 'Monthly traffic and visitor insights' },
      { service: 'SEO Maintenance', description: 'Keep your site optimized for search engines' },
      { service: 'Technology Guidance', description: 'Advice on web tools and integrations' },
    ],
  },
]

// Add-on services
const addOns = [
  { service: 'On-Site IT Support', price: '$95/hour' },
  { service: 'E-commerce Functionality', price: '$500 setup + $50/mo' },
  { service: 'Online Booking/Scheduling', price: '$250 setup + $25/mo' },
  { service: 'Email Marketing Integration', price: '$150 setup' },
  { service: 'SEO Optimization Package', price: '$200/month' },
  { service: 'Social Media Integration', price: '$150 one-time' },
  { service: 'Security Camera System', price: 'Custom quote' },
  { service: 'VoIP Phone System', price: '$25/user/month' },
  { service: 'Managed Network Services', price: 'Custom quote' },
]

// FAQ items
const faqItems = [
  {
    question: 'What happens if I cancel before 12 months?',
    answer: 'Early cancellation requires payment of the remaining website build value. For example, if you cancel the Business package at month 6, you would owe the remaining $1,750 website value (50% of $3,500).',
  },
  {
    question: 'Do I own my website?',
    answer: 'Yes. After completing your 12-month term, you own your website outright. You can continue with our hosting/support or migrate elsewhere. We\'ll provide all files and assist with any transition.',
  },
  {
    question: 'What if I need IT support beyond the website?',
    answer: 'We offer full IT services including network setup, security systems, VoIP phones, and more. Business+ clients receive discounted rates on all IT services. Contact us for a custom quote.',
  },
  {
    question: 'Can I upgrade my package later?',
    answer: 'Absolutely. You can upgrade at any time and we\'ll prorate the difference. Downgrades take effect at your next renewal date.',
  },
  {
    question: 'How long does the website take to build?',
    answer: 'Most websites are completed within 2-4 weeks from kickoff. Complex sites may take longer. You\'ll have full input throughout the design process.',
  },
  {
    question: 'What about my existing website?',
    answer: 'We can migrate content from your existing site or start fresh—your choice. We\'ll ensure no disruption to your online presence during the transition.',
  },
]

const WebsiteServiceBundle = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="Website & IT Services Bundle"
        subtitle="Professional Website + Managed Hosting"
        documentType="Service Package"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Value Proposition Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Website & IT Services Bundle" />
      <PageFooter />

      <SectionHeader title="One Partner for All Your Technology Needs" />

      <Text style={sharedStyles.body}>
        Stop juggling multiple vendors for your website, hosting, and IT support. Penn Tech Solutions
        bundles everything into one simple monthly package—with a professional website included at no
        additional upfront cost.
      </Text>

      <View style={[sharedStyles.row, { gap: 12, marginTop: 20, marginBottom: 24 }]}>
        <View style={sharedStyles.flex1}>
          <StatBox value="$0" label="Upfront Website Cost" color={colors.primary} />
        </View>
        <View style={sharedStyles.flex1}>
          <StatBox value="1" label="Monthly Invoice" color="#22c55e" />
        </View>
        <View style={sharedStyles.flex1}>
          <StatBox value="Local" label="Support Team" color="#a855f7" />
        </View>
        <View style={sharedStyles.flex1}>
          <StatBox value="All-In" label="No Hidden Fees" color="#f59e0b" />
        </View>
      </View>

      <SectionHeader title="The Problem We Solve" />

      <View style={styles.problemGrid}>
        <View style={styles.problemBox}>
          <Text style={styles.problemTitle}>Without Penn Tech</Text>
          <BulletItem text="Pay $3,000-5,000 upfront for a website" />
          <BulletItem text="Separate hosting bill ($20-50/month)" />
          <BulletItem text="Separate IT support (hourly rates)" />
          <BulletItem text="Multiple vendors to manage" />
          <BulletItem text="No one accountable when things break" />
          <BulletItem text="Website gets outdated and neglected" />
        </View>
        <View style={[styles.problemBox, { backgroundColor: '#f0fdf4', borderColor: '#22c55e' }]}>
          <Text style={[styles.problemTitle, { color: '#166534' }]}>With Penn Tech</Text>
          <BulletItem text="$0 upfront for professional website" />
          <BulletItem text="Hosting included in monthly package" />
          <BulletItem text="IT support hours included" />
          <BulletItem text="One vendor, one invoice" />
          <BulletItem text="Single point of accountability" />
          <BulletItem text="Website stays current and maintained" />
        </View>
      </View>

      <CalloutBox
        type="success"
        title="The Bottom Line"
        text="Get a professional website AND ongoing IT support for less than most businesses pay for a website alone. One predictable monthly cost, no surprises."
      />
    </Page>

    {/* Package Comparison Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Website & IT Services Bundle" subtitle="Package Options" />
      <PageFooter />

      <SectionHeader title="Choose Your Package" />

      <View style={styles.packageGrid}>
        {packages.map((pkg) => (
          <View key={pkg.name} style={[styles.packageCard, pkg.featured && styles.featuredCard, { borderColor: pkg.color }]}>
            {pkg.featured && (
              <View style={[styles.featuredBadge, { backgroundColor: pkg.color }]}>
                <Text style={styles.featuredBadgeText}>MOST POPULAR</Text>
              </View>
            )}
            <Text style={[styles.packageName, { color: pkg.color }]}>{pkg.name}</Text>
            <Text style={styles.packageTagline}>{pkg.tagline}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.packagePrice}>{pkg.monthlyPrice}</Text>
              <Text style={styles.priceUnit}>/month</Text>
            </View>
            <Text style={styles.termText}>{pkg.term} minimum</Text>
            <View style={styles.websiteValue}>
              <Text style={styles.websiteValueLabel}>Website Value Included:</Text>
              <Text style={styles.websiteValueAmount}>{pkg.websiteValue}</Text>
            </View>
            <View style={styles.featureList}>
              {pkg.features.map((feature, i) => (
                <View key={i} style={styles.featureItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <CalloutBox
        type="info"
        title="Custom Packages Available"
        text="Need something different? We can create a custom package tailored to your specific needs. Contact us to discuss your requirements."
      />
    </Page>

    {/* What's Included Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Website & IT Services Bundle" subtitle="What's Included" />
      <PageFooter />

      <SectionHeader title="Complete Service Breakdown" />

      {includedServices.map((category) => (
        <View key={category.category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category.category}</Text>
          <View style={styles.serviceTable}>
            <View style={styles.serviceTableHeader}>
              <Text style={[styles.serviceTableHeaderCell, { flex: 1.5 }]}>Service</Text>
              <Text style={[styles.serviceTableHeaderCell, { flex: 2.5 }]}>Description</Text>
            </View>
            {category.items.map((item, i) => (
              <View key={item.service} style={[styles.serviceTableRow, i % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
                <Text style={[styles.serviceTableCell, { flex: 1.5, fontFamily: 'Helvetica-Bold' }]}>{item.service}</Text>
                <Text style={[styles.serviceTableCell, { flex: 2.5 }]}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <SectionHeader title="Optional Add-Ons" />

      <View style={styles.addOnGrid}>
        {addOns.map((addon) => (
          <View key={addon.service} style={styles.addOnItem}>
            <Text style={styles.addOnService}>{addon.service}</Text>
            <Text style={styles.addOnPrice}>{addon.price}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* How It Works Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Website & IT Services Bundle" subtitle="How It Works" />
      <PageFooter />

      <SectionHeader title="Getting Started Is Easy" />

      <View style={styles.processSteps}>
        <View style={styles.processStep}>
          <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Free Consultation</Text>
            <Text style={styles.stepDescription}>
              We meet to discuss your business, website needs, and IT challenges. No obligation, no pressure—just a genuine conversation about how we can help.
            </Text>
          </View>
        </View>

        <View style={styles.processStep}>
          <View style={[styles.stepNumber, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose Your Package</Text>
            <Text style={styles.stepDescription}>
              Select the package that fits your needs and budget. We'll customize the details and prepare your service agreement.
            </Text>
          </View>
        </View>

        <View style={styles.processStep}>
          <View style={[styles.stepNumber, { backgroundColor: '#a855f7' }]}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Website Design & Build</Text>
            <Text style={styles.stepDescription}>
              We design your new website with your input every step of the way. Most sites launch within 2-4 weeks.
            </Text>
          </View>
        </View>

        <View style={styles.processStep}>
          <View style={[styles.stepNumber, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Launch & Ongoing Support</Text>
            <Text style={styles.stepDescription}>
              Your website goes live and your IT support begins. We handle all the technical details so you can focus on running your business.
            </Text>
          </View>
        </View>
      </View>

      <CalloutBox
        type="warning"
        title="Your Website, Your Property"
        text="After completing your 12-month term, you own your website outright. No tricks, no hidden clauses. We earn your continued business by providing great service—not by holding your website hostage."
      />

      <SectionHeader title="Frequently Asked Questions" />

      <View style={styles.faqSection}>
        {faqItems.slice(0, 3).map((faq, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* FAQ Continued + CTA Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Website & IT Services Bundle" subtitle="FAQ & Next Steps" />
      <PageFooter />

      <SectionHeader title="Frequently Asked Questions (Continued)" />

      <View style={styles.faqSection}>
        {faqItems.slice(3).map((faq, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Ready to Get Started?" />

      <View style={styles.ctaBox}>
        <Text style={styles.ctaTitle}>Schedule Your Free Consultation</Text>
        <Text style={styles.ctaText}>
          Let's discuss how Penn Tech Solutions can give your business a professional online presence
          and reliable IT support—all for one predictable monthly cost.
        </Text>

        <View style={styles.contactGrid}>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>(610) XXX-XXXX</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>info@penntechsolutions.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Website</Text>
            <Text style={styles.contactValue}>penntechsolutions.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.contactValue}>Phoenixville, PA</Text>
          </View>
        </View>
      </View>

      <View style={styles.guaranteeBox}>
        <Text style={styles.guaranteeTitle}>Our Guarantee</Text>
        <Text style={styles.guaranteeText}>
          If you're not completely satisfied with your website within the first 30 days after launch,
          we'll make it right or refund your first month's payment. No questions asked.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Document Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
        <Text style={styles.footerText}>Penn Tech Solutions - Phoenixville, PA</Text>
        <Text style={[styles.footerText, { marginTop: 8, fontFamily: 'Helvetica-Bold' }]}>
          Your Local IT Partner
        </Text>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Problem comparison grid
  problemGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  problemBox: {
    flex: 1,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  problemTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#991b1b',
    marginBottom: 10,
  },

  // Package cards
  packageGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  packageCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    position: 'relative',
  },
  featuredCard: {
    borderWidth: 2,
    transform: 'scale(1.02)',
  },
  featuredBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  featuredBadgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  packageName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginTop: 6,
  },
  packageTagline: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  packagePrice: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  priceUnit: {
    fontSize: 10,
    color: colors.gray,
  },
  termText: {
    fontSize: 8,
    color: colors.grayLight,
    marginBottom: 10,
  },
  websiteValue: {
    backgroundColor: '#f0fdf4',
    borderRadius: 4,
    padding: 6,
    marginBottom: 10,
  },
  websiteValueLabel: {
    fontSize: 7,
    color: '#166534',
  },
  websiteValueAmount: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#166534',
  },
  featureList: {
    gap: 4,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 6,
  },
  checkmark: {
    fontSize: 8,
    color: '#22c55e',
  },
  featureText: {
    fontSize: 8,
    color: colors.gray,
    flex: 1,
  },

  // Category sections
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 8,
  },
  serviceTable: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  serviceTableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: 8,
  },
  serviceTableHeaderCell: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  serviceTableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  serviceTableCell: {
    fontSize: 9,
    color: colors.gray,
  },

  // Add-on grid
  addOnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  addOnItem: {
    width: '31%',
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 10,
  },
  addOnService: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  addOnPrice: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: 'Helvetica-Bold',
  },

  // Process steps
  processSteps: {
    marginBottom: 20,
  },
  processStep: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // FAQ section
  faqSection: {
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 14,
  },
  faqQuestion: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // CTA section
  ctaBox: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 10,
    color: '#bfdbfe',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    width: '45%',
  },
  contactLabel: {
    fontSize: 8,
    color: '#93c5fd',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 10,
    color: colors.white,
    fontFamily: 'Helvetica-Bold',
  },

  // Guarantee box
  guaranteeBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#22c55e',
    marginBottom: 20,
  },
  guaranteeTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#166534',
    marginBottom: 6,
  },
  guaranteeText: {
    fontSize: 9,
    color: '#14532d',
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerText: {
    fontSize: 8,
    color: colors.grayLight,
    marginBottom: 2,
  },
})

export default WebsiteServiceBundle
