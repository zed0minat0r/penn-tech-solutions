import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { colors, sharedStyles } from '../shared/styles'
import {
  CoverPage,
  PageHeader,
  PageFooter,
  SectionHeader,
  ServiceCard,
  FeatureItem,
  BulletItem,
  CalloutBox,
  StatBox,
  QuoteBox,
} from '../shared/components'

const services = [
  {
    title: 'Cloud VoIP & Telecom',
    description: 'Ditch the expensive PBX hardware. Our cloud phone systems give small businesses enterprise-level features at a fraction of the cost—use your existing computers and smartphones as soft phones, and only add desk phones where they make sense.',
    features: ['No Costly PBX Hardware', 'Soft Phones on Devices You Own', 'Pay-Per-User Pricing', 'Professional Conference Solutions'],
    color: colors.primary,
  },
  {
    title: 'Network Infrastructure',
    description: "Small businesses don't need enterprise-grade complexity. We build lean, secure networks sized for your team—whether that's 5 employees or 50. No unnecessary hardware, no inflated costs.",
    features: ['Business-Grade Firewalls', 'Managed Switch Infrastructure', 'Structured Cabling', 'Enterprise WiFi Coverage'],
    color: '#a855f7', // Purple
  },
  {
    title: 'Point of Sale Systems',
    description: 'Get your retail shop or restaurant running smoothly with modern point-of-sale systems. We handle setup, payment integration, and training so you can serve customers from day one.',
    features: ['Quick Setup & Go-Live', 'Payment Processing Ready', 'Basic Inventory Tracking', 'Hands-On Staff Training'],
    color: '#22c55e', // Green
  },
  {
    title: 'Professional Websites',
    description: "Your small business needs an online presence that works—not an overpriced agency project. We build clean, professional websites that load fast, look great on phones, and help customers find you.",
    features: ['Affordable Custom Design', 'Mobile-First Approach', 'Google-Friendly SEO', 'Easy Self-Service Updates'],
    color: '#f59e0b', // Orange
  },
  {
    title: 'Security Systems',
    description: "Protect your storefront, office, or warehouse without breaking the bank. We install camera systems and access control sized for small business budgets—with remote viewing so you can check in anytime.",
    features: ['Budget-Friendly Cameras', 'Keycard & Fob Access', 'View From Your Phone', 'Local or Cloud Storage'],
    color: '#ef4444', // Red
  },
  {
    title: 'Anti-Virus & Data Protection',
    description: "Cyber attacks are at an all-time high—and hackers know small businesses are easy targets. We set up real protection that stops ransomware, phishing, and data breaches before they devastate your business.",
    features: ['Enterprise-Grade Antivirus', 'Automated Backup Systems', 'Email & Phishing Protection', 'Security Awareness Training'],
    color: '#dc2626', // Deep red
  },
  {
    title: 'Equipment Procurement',
    description: "Skip the markup from big-box stores. We source computers, networking gear, and peripherals at competitive prices—and set everything up so it works together out of the box.",
    features: ['Wholesale Pricing Access', 'No Overselling', 'Complete Setup Included', 'Warranty Coordination'],
    color: '#8b5cf6', // Indigo
  },
  {
    title: 'Custom App Development',
    description: "Got a manual process eating up your team's time? We build simple custom tools to automate the busywork—inventory trackers, scheduling apps, customer portals—whatever helps your small business run smoother.",
    features: ['Workflow Automation', 'Connect Your Existing Tools', 'Simple Mobile Apps', 'Affordable Maintenance'],
    color: colors.accent,
  },
  {
    title: 'AI Business Integration',
    description: "AI isn't just for big corporations anymore. We help small businesses harness practical AI tools—chatbots, document processing, workflow automation—without the complexity.",
    features: ['24/7 AI Chatbots', 'Automated Data Entry', 'Plain-English Business Insights', 'Team Training Included'],
    color: '#ec4899', // Pink
  },
]

const processSteps = [
  { number: '01', title: 'Free Consultation', description: 'Tell us about your business and challenges. No sales pressure—just a genuine conversation.' },
  { number: '02', title: 'Assessment', description: 'We evaluate your current IT environment to understand what\'s working and what needs attention.' },
  { number: '03', title: 'Custom Proposal', description: 'You receive clear recommendations with transparent, itemized pricing. No hidden fees.' },
  { number: '04', title: 'Implementation', description: 'Our team handles everything with minimal disruption to your daily operations.' },
  { number: '05', title: 'Ongoing Support', description: 'We\'re always here when you need us—think of us as your outsourced IT department.' },
]

const ServicesOverview = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="IT Services Overview"
        subtitle="Technology Solutions Sized for Small Business"
        documentType="Service Catalog"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Introduction Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Services Overview" />
      <PageFooter />

      <SectionHeader title="Why Penn Tech Solutions?" />

      <Text style={sharedStyles.body}>
        Penn Tech Solutions is your local IT partner in the Greater Philadelphia area. We provide the personalized
        service and hands-on support that only a local team can deliver—no call centers, no runaround, just real
        people who know your business.
      </Text>

      <View style={[sharedStyles.row, { gap: 16, marginTop: 16, marginBottom: 24 }]}>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="100+" label="Local Businesses Served" color={colors.primary} />
        </View>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="Fast" label="Response Times" color={colors.accent} />
        </View>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="Local" label="Philly-Based Team" color="#a855f7" />
        </View>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="Fair" label="Transparent Pricing" color="#f59e0b" />
        </View>
      </View>

      <SectionHeader title="Our Core Values" />

      <View style={styles.valueGrid}>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Local & Personal</Text>
          <Text style={styles.valueText}>
            We're your neighbors, not a distant call center. When you call, you get a real person who knows your setup.
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Full-Service IT</Text>
          <Text style={styles.valueText}>
            Phones, networks, security, websites—we handle it all so you have one trusted partner for all your tech needs.
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Right-Sized Solutions</Text>
          <Text style={styles.valueText}>
            We recommend what you actually need, not the most expensive option. Your budget matters to us.
          </Text>
        </View>
      </View>

      <CalloutBox
        type="info"
        title="Cloud-First Approach"
        text="We specialize in cloud solutions that eliminate expensive on-premise hardware while providing enterprise-grade reliability and security. This means lower upfront costs, easier maintenance, and technology that scales with your business."
      />

      <SectionHeader title="Service Areas" />
      <Text style={sharedStyles.body}>
        We proudly serve small businesses throughout the Greater Philadelphia area, including:
      </Text>
      <View style={[sharedStyles.row, { flexWrap: 'wrap', gap: 8, marginTop: 8 }]}>
        {['Montgomery County', 'Bucks County', 'Chester County', 'Delaware County', 'Philadelphia'].map((area) => (
          <View key={area} style={styles.areaTag}>
            <Text style={styles.areaTagText}>{area}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Services Pages */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Services Overview" subtitle="Communication & Infrastructure" />
      <PageFooter />

      <SectionHeader title="Our Services" number="01" />
      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        From phone systems to security cameras, networks to websites—we provide comprehensive technology
        solutions tailored for small businesses. Click-through to learn more about each service.
      </Text>

      <ServiceCard {...services[0]} />
      <ServiceCard {...services[1]} />
      <ServiceCard {...services[2]} />
    </Page>

    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Services Overview" subtitle="Web & Security" />
      <PageFooter />

      <ServiceCard {...services[3]} />
      <ServiceCard {...services[4]} />
      <ServiceCard {...services[5]} />
    </Page>

    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Services Overview" subtitle="Advanced Solutions" />
      <PageFooter />

      <ServiceCard {...services[6]} />
      <ServiceCard {...services[7]} />
      <ServiceCard {...services[8]} />

      <CalloutBox
        type="success"
        title="Bundle & Save"
        text="Many of our clients choose to bundle multiple services for a complete IT solution. Ask us about package pricing during your free consultation."
      />
    </Page>

    {/* Process Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Services Overview" subtitle="Getting Started" />
      <PageFooter />

      <SectionHeader title="How We Work" number="02" />
      <Text style={[sharedStyles.body, { marginBottom: 20 }]}>
        No complicated onboarding. No confusing processes. Getting started with Penn Tech Solutions is
        straightforward and stress-free.
      </Text>

      {processSteps.map((step, index) => (
        <View key={step.number} style={styles.processStep}>
          <View style={styles.processNumber}>
            <Text style={styles.processNumberText}>{step.number}</Text>
          </View>
          <View style={styles.processContent}>
            <Text style={styles.processTitle}>{step.title}</Text>
            <Text style={styles.processDescription}>{step.description}</Text>
          </View>
          {index < processSteps.length - 1 && <View style={styles.processConnector} />}
        </View>
      ))}

      <QuoteBox
        quote="Penn Tech Solutions transformed our outdated phone system into a modern cloud solution. The transition was seamless, and our team loves the new features."
        author="Local Business Owner"
        company="Greater Philadelphia Area"
      />
    </Page>

    {/* Partners & Contact Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Services Overview" subtitle="Partners & Contact" />
      <PageFooter />

      <SectionHeader title="Technology Partners" number="03" />
      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        We partner with industry-leading technology vendors to deliver reliable, enterprise-grade solutions
        at small business prices.
      </Text>

      <View style={[sharedStyles.row, { flexWrap: 'wrap', gap: 12, marginBottom: 24 }]}>
        {['Cisco', 'Ubiquiti', 'SonicWall', 'Nimble', 'Netgear', 'Yealink'].map((partner) => (
          <View key={partner} style={styles.partnerBadge}>
            <Text style={styles.partnerText}>{partner}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Ready to Get Started?" number="04" />

      <View style={styles.contactBox}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactTitle}>Free IT Consultation</Text>
          <Text style={styles.contactSubtitle}>No obligation, no pressure—just expert advice</Text>
        </View>

        <View style={styles.contactDetails}>
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>info@penntechsolutions.com</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>(215) 555-1234</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactLabel}>Service Area</Text>
              <Text style={styles.contactValue}>Greater Philadelphia Area</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactLabel}>Support Hours</Text>
              <Text style={styles.contactValue}>M-F 8am-6pm ET</Text>
              <Text style={[styles.contactValue, { fontSize: 8, color: colors.accent }]}>Emergency Support Available</Text>
            </View>
          </View>
        </View>
      </View>

      <CalloutBox
        type="info"
        title="What to Expect"
        text="During your free consultation, we'll discuss your current IT setup, pain points, and goals. You'll receive honest recommendations—never a hard sell. Most consultations take 30-45 minutes and can be done on-site or via video call."
      />

      <View style={styles.finalCta}>
        <Text style={styles.finalCtaText}>
          Your technology should work for you, not against you.{'\n'}
          Let's make that happen.
        </Text>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Value grid styles
  valueGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  valueItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderTopWidth: 3,
    borderTopColor: colors.primary,
  },
  valueTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
  },
  valueText: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Area tag styles
  areaTag: {
    backgroundColor: '#eff6ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  areaTagText: {
    fontSize: 9,
    color: colors.primary,
  },

  // Process step styles
  processStep: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  processNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  processNumberText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  processContent: {
    flex: 1,
    paddingTop: 2,
  },
  processTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  processDescription: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.5,
  },
  processConnector: {
    position: 'absolute',
    left: 17,
    top: 38,
    width: 2,
    height: 20,
    backgroundColor: '#e2e8f0',
  },

  // Partner badge styles
  partnerBadge: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  partnerText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },

  // Contact box styles
  contactBox: {
    backgroundColor: colors.dark,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
  },
  contactHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkLight,
    paddingBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 10,
    color: colors.accent,
  },
  contactDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    width: '45%',
  },
  contactIcon: {
    fontSize: 16,
  },
  contactLabel: {
    fontSize: 8,
    color: colors.grayLight,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 10,
    color: colors.white,
  },

  // Final CTA styles
  finalCta: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  finalCtaText: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 1.8,
    fontFamily: 'Helvetica-Bold',
  },
})

export default ServicesOverview
