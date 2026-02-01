import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { colors, sharedStyles } from '../shared/styles'
import {
  CoverPage,
  PageHeader,
  PageFooter,
  SectionHeader,
  FeatureItem,
  BulletItem,
  CalloutBox,
} from '../shared/components'

// Comprehensive service data with detailed elaboration
const detailedServices = [
  {
    id: 'voip',
    title: 'Cloud VoIP & Telecom',
    tagline: 'Enterprise Phone Features at Small Business Prices',
    color: colors.voip,
    overview: `Traditional business phone systems require expensive on-premise PBX hardware, dedicated phone lines, and ongoing maintenance contracts. For small businesses, this often means spending thousands on equipment that quickly becomes outdated.

Penn Tech Solutions takes a different approach. Our cloud-based VoIP (Voice over Internet Protocol) solutions deliver enterprise-grade phone features through your existing internet connection—no expensive hardware required. Your team can take business calls on desk phones, computers, or smartphones, giving you flexibility that traditional systems simply can't match.`,
    benefits: [
      {
        title: 'Eliminate Hardware Costs',
        description: 'No PBX equipment to purchase, maintain, or replace. Your phone system lives in the cloud, managed by professionals.',
      },
      {
        title: 'Use Devices You Already Own',
        description: 'Turn laptops, desktops, and smartphones into professional business phones with soft phone applications.',
      },
      {
        title: 'Pay Only for What You Need',
        description: 'Simple per-user pricing means you only pay for active lines. Add or remove users as your team changes.',
      },
      {
        title: 'Work From Anywhere',
        description: 'Your business number follows you. Take calls at home, on the road, or anywhere with internet access.',
      },
    ],
    features: [
      'Auto-attendant with custom greetings and routing',
      'Voicemail-to-email transcription',
      'Call recording for training and compliance',
      'Conference calling and video meetings',
      'Call forwarding and find-me/follow-me',
      'Detailed call analytics and reporting',
      'Integration with CRM systems',
      'Mobile app for iOS and Android',
      'Desk phone options where needed',
      'Fax-to-email services',
    ],
    useCases: [
      {
        scenario: 'Professional Services Firm',
        challenge: 'Partners needed to take client calls while traveling but didn\'t want to give out personal cell numbers.',
        solution: 'Deployed soft phones on laptops and mobile app on smartphones. Clients always reach the business line, and partners can work from anywhere.',
      },
      {
        scenario: 'Multi-Location Retail',
        challenge: 'Three store locations with separate phone systems meant inconsistent customer experience.',
        solution: 'Unified all locations on a single cloud phone system with shared directory, call routing between stores, and centralized voicemail.',
      },
    ],
    pricing: 'Pricing is based on number of users and features required. Most small businesses spend $25-45 per user per month, significantly less than traditional phone systems.',
  },
  {
    id: 'network',
    title: 'Network Infrastructure',
    tagline: 'Lean, Secure Networks Sized for Your Team',
    color: colors.network,
    overview: `Your network is the backbone of your business technology. Every email, file transfer, credit card transaction, and cloud application depends on a reliable, secure network connection. Yet many small businesses are running on consumer-grade equipment that wasn't designed for business use.

Penn Tech Solutions designs and implements business-grade network infrastructure sized appropriately for your team. Whether you have 5 employees or 50, we build networks that are fast, secure, and reliable—without the enterprise-level complexity and cost that you don't need.`,
    benefits: [
      {
        title: 'Business-Grade Performance',
        description: 'Commercial networking equipment designed for reliability and consistent performance under business workloads.',
      },
      {
        title: 'Proper Security',
        description: 'Business firewalls with threat protection, content filtering, and VPN capabilities to protect your data.',
      },
      {
        title: 'Reliable WiFi Coverage',
        description: 'Enterprise access points that provide strong, consistent wireless coverage throughout your space.',
      },
      {
        title: 'Scalability',
        description: 'Infrastructure designed to grow with your business without requiring complete replacement.',
      },
    ],
    features: [
      'Business-grade firewall with threat protection',
      'Managed switch infrastructure',
      'Enterprise WiFi access points',
      'Structured cabling (Cat6/Cat6a)',
      'VLAN segmentation for security',
      'Guest network isolation',
      'VPN for secure remote access',
      'Network monitoring and alerts',
      'Bandwidth management and QoS',
      'Documentation and network mapping',
    ],
    useCases: [
      {
        scenario: 'Growing Law Firm',
        challenge: 'Consumer router couldn\'t handle 15 staff plus client WiFi. Dropped connections affected phone calls and client meetings.',
        solution: 'Installed business firewall with guest network, enterprise access points, and managed switches. Network now handles 50+ devices reliably.',
      },
      {
        scenario: 'Manufacturing Office',
        challenge: 'Factory floor equipment needed network isolation from office systems for security.',
        solution: 'Implemented VLAN segmentation, keeping production systems separate from office network while maintaining necessary connectivity.',
      },
    ],
    pricing: 'Network projects vary based on size and complexity. Small office setups typically start at $2,000-5,000 including equipment and installation.',
  },
  {
    id: 'pos',
    title: 'Point of Sale Systems',
    tagline: 'Modern Payment Solutions for Retail & Restaurants',
    color: colors.pos,
    overview: `Your point-of-sale system is where your business meets your customers. A modern, reliable PoS system speeds up transactions, reduces errors, tracks inventory, and provides insights into your sales patterns. But setting up a new PoS system can be intimidating—there are countless options, and making the wrong choice is expensive.

Penn Tech Solutions helps retail shops and restaurants select, implement, and configure point-of-sale systems that match their specific needs. We handle everything from initial setup to staff training, ensuring you can serve customers confidently from day one.`,
    benefits: [
      {
        title: 'Quick Setup & Go-Live',
        description: 'We handle hardware setup, software configuration, and payment processor integration so you can start selling fast.',
      },
      {
        title: 'Payment Processing Ready',
        description: 'Integration with major payment processors for credit cards, contactless payments, and mobile wallets.',
      },
      {
        title: 'Inventory Tracking',
        description: 'Know what\'s in stock, what\'s selling, and what needs reordering without manual counting.',
      },
      {
        title: 'Staff Training Included',
        description: 'Hands-on training for your team ensures everyone is comfortable with the new system.',
      },
    ],
    features: [
      'Touchscreen terminal setup and configuration',
      'Payment processor integration',
      'Inventory management configuration',
      'Employee permissions and time tracking',
      'Receipt printer and cash drawer setup',
      'Barcode scanner integration',
      'Customer display screens',
      'Reporting and analytics dashboard',
      'Multi-location synchronization',
      'Offline mode configuration',
    ],
    useCases: [
      {
        scenario: 'New Restaurant Opening',
        challenge: 'Owner needed complete PoS system ready for grand opening with minimal time to prepare.',
        solution: 'Deployed cloud-based restaurant PoS with table management, kitchen display, and integrated payments. Staff training completed two days before opening.',
      },
      {
        scenario: 'Retail Store Upgrade',
        challenge: 'Legacy cash register provided no inventory visibility or sales reporting.',
        solution: 'Migrated to modern PoS with barcode scanning, inventory tracking, and daily sales reports. Owner now has real-time visibility into business performance.',
      },
    ],
    pricing: 'PoS system costs vary by vendor and features. Budget $500-2,000 for hardware setup and configuration, plus ongoing software/service fees.',
  },
  {
    id: 'websites',
    title: 'Professional Websites',
    tagline: 'Fast, Mobile-Friendly Sites That Help Customers Find You',
    color: colors.websites,
    overview: `In today's digital world, your website is often the first impression customers have of your business. A slow, outdated, or mobile-unfriendly website drives potential customers to your competitors. But working with web design agencies can be frustrating and expensive for small businesses.

Penn Tech Solutions builds clean, professional websites that work—they load fast, look great on phones and tablets, and help customers find the information they need. We focus on practical results: does your website help people contact you, find your location, and understand what you offer?`,
    benefits: [
      {
        title: 'Affordable Custom Design',
        description: 'Professional websites at small business prices, not agency rates. Custom design that reflects your brand.',
      },
      {
        title: 'Mobile-First Approach',
        description: 'Over 60% of web traffic is mobile. Your site will look and work great on every device.',
      },
      {
        title: 'Google-Friendly SEO',
        description: 'Built with search engine optimization in mind so local customers can find you.',
      },
      {
        title: 'Easy Self-Service Updates',
        description: 'Make simple updates yourself without calling us. We train you on content management.',
      },
    ],
    features: [
      'Custom responsive design',
      'Content management system (CMS)',
      'Contact forms with email notifications',
      'Google Maps integration',
      'Social media integration',
      'Basic SEO optimization',
      'SSL security certificate',
      'Mobile-optimized performance',
      'Analytics tracking setup',
      'Hosting coordination',
    ],
    useCases: [
      {
        scenario: 'Local HVAC Company',
        challenge: 'Old website from 2015 wasn\'t mobile-friendly and ranked poorly in local searches.',
        solution: 'Built new mobile-first site with service pages, service area info, and prominent contact options. Phone inquiries increased 40% within three months.',
      },
      {
        scenario: 'Medical Practice',
        challenge: 'Needed professional website with patient forms and appointment information.',
        solution: 'Designed clean, accessible site with downloadable forms, provider bios, and clear directions. Integrated with practice management for appointment requests.',
      },
    ],
    pricing: 'Small business websites typically range from $2,500-7,500 depending on complexity. Includes design, development, and initial training.',
  },
  {
    id: 'security',
    title: 'Security Systems',
    tagline: 'Cameras & Access Control on a Budget',
    color: colors.security,
    overview: `Security incidents—theft, break-ins, employee issues—can devastate a small business. Yet many business owners assume professional security systems are too expensive or complicated for their needs.

Penn Tech Solutions installs security camera systems and access control solutions sized for small business budgets. We help you protect your storefront, office, warehouse, or job site with systems you can monitor from anywhere on your phone.`,
    benefits: [
      {
        title: 'Budget-Friendly Solutions',
        description: 'Commercial-grade security without enterprise pricing. Systems sized to protect what matters.',
      },
      {
        title: 'Remote Viewing',
        description: 'Check on your business from anywhere with smartphone apps. Get alerts when motion is detected.',
      },
      {
        title: 'Access Control',
        description: 'Keycard and fob systems let you control who enters your facility and track when they do.',
      },
      {
        title: 'Evidence When You Need It',
        description: 'Clear video evidence for insurance claims, employee issues, or law enforcement.',
      },
    ],
    features: [
      'HD security camera installation',
      'Night vision and low-light cameras',
      'Network video recorder (NVR) setup',
      'Remote viewing apps configuration',
      'Motion detection and alerts',
      'Keycard/fob access control',
      'Door entry systems',
      'Cloud backup options',
      'Local storage configuration',
      'Integration with existing systems',
    ],
    useCases: [
      {
        scenario: 'Retail Store',
        challenge: 'Shoplifting losses eating into thin margins. No visibility into after-hours activity.',
        solution: 'Installed 8-camera system covering sales floor, stock room, and entrances. Owner reviews footage from phone and shoplifting incidents dropped significantly.',
      },
      {
        scenario: 'Office Building',
        challenge: 'Multiple tenants sharing building needed controlled access and visitor management.',
        solution: 'Deployed keycard access system with unique codes per tenant. Management has audit trail of all entries.',
      },
    ],
    pricing: 'Camera systems start at $1,500-3,000 for 4-8 cameras including installation. Access control systems vary based on number of doors.',
  },
  {
    id: 'dataprotection',
    title: 'Anti-Virus & Data Protection',
    tagline: 'Real Protection Against Modern Cyber Threats',
    color: colors.dataProtection,
    overview: `Cyber attacks are at an all-time high, and hackers know that small businesses are easy targets. Most small companies think "it won't happen to us" until it does—and the consequences can be devastating. Ransomware can lock you out of your own files. Phishing attacks can compromise client data. A single incident can cost tens of thousands of dollars and destroy customer trust.

Penn Tech Solutions implements layered security that protects your business from the threats that matter most. We set up real protection—not just antivirus software, but comprehensive defense including backup systems, email security, and employee training.`,
    benefits: [
      {
        title: 'Enterprise-Grade Protection',
        description: 'Commercial security software that catches what consumer antivirus misses.',
      },
      {
        title: 'Automated Backups',
        description: 'Your critical data backed up automatically, so ransomware can\'t hold you hostage.',
      },
      {
        title: 'Email Security',
        description: 'Stop phishing emails and malicious attachments before they reach your inbox.',
      },
      {
        title: 'Security Awareness',
        description: 'Training helps your team recognize and avoid social engineering attacks.',
      },
    ],
    features: [
      'Business-grade endpoint protection',
      'Real-time threat monitoring',
      'Automated backup systems',
      'Cloud and local backup options',
      'Email filtering and protection',
      'Phishing simulation training',
      'Security awareness education',
      'Web filtering and protection',
      'Encrypted file storage',
      'Incident response planning',
    ],
    useCases: [
      {
        scenario: 'Accounting Firm',
        challenge: 'Handles sensitive client financial data but only had basic consumer antivirus.',
        solution: 'Deployed comprehensive protection including encrypted backups, email security, and staff training. Now meets client security requirements for financial data handling.',
      },
      {
        scenario: 'Medical Office',
        challenge: 'HIPAA compliance required documented security measures.',
        solution: 'Implemented compliant security stack with encrypted backups, access logging, and annual security training. Audit-ready documentation for compliance reviews.',
      },
    ],
    pricing: 'Protection packages typically run $15-40 per device per month, including backup, antivirus, and monitoring.',
  },
  {
    id: 'equipment',
    title: 'Equipment Procurement',
    tagline: 'Wholesale Pricing, Complete Setup Included',
    color: colors.equipment,
    overview: `Buying technology for your business shouldn't mean paying retail prices at big-box stores or gambling on unknown sellers online. And once you get the equipment, setting it up properly takes time and expertise most business owners don't have.

Penn Tech Solutions sources computers, networking gear, and peripherals at competitive wholesale prices, then handles complete setup so everything works together seamlessly. We recommend what you actually need—not the most expensive option—and configure it properly before delivery.`,
    benefits: [
      {
        title: 'Better Than Retail Pricing',
        description: 'Access to wholesale pricing through our vendor relationships. We pass the savings to you.',
      },
      {
        title: 'Right-Sized Recommendations',
        description: 'We recommend what fits your needs, not the highest-margin option.',
      },
      {
        title: 'Complete Setup',
        description: 'Equipment arrives configured and ready to use. No frustrating DIY setup.',
      },
      {
        title: 'Warranty Support',
        description: 'We coordinate warranty claims and replacements when issues arise.',
      },
    ],
    features: [
      'Desktop and laptop computers',
      'Business servers and storage',
      'Networking equipment',
      'Printers and peripherals',
      'Software licensing',
      'Pre-deployment configuration',
      'Data migration from old equipment',
      'Secure old equipment disposal',
      'Warranty tracking',
      'Lifecycle planning',
    ],
    useCases: [
      {
        scenario: 'Office Refresh',
        challenge: 'Company needed to replace 12 aging computers but didn\'t want downtime during the transition.',
        solution: 'Sourced and pre-configured all systems, migrated data and applications, then swapped computers in a single weekend. Staff arrived Monday to fully-functional new machines.',
      },
      {
        scenario: 'New Office Setup',
        challenge: 'New location needed complete technology stack from scratch.',
        solution: 'Procured and installed complete package: computers, network, phones, printer. Coordinated with internet provider. Office operational on move-in day.',
      },
    ],
    pricing: 'Equipment costs vary by specifications. Our setup and configuration fee is typically 15-20% of hardware cost.',
  },
  {
    id: 'development',
    title: 'Custom App Development',
    tagline: 'Automate the Busywork That Slows You Down',
    color: colors.development,
    overview: `Every business has manual processes that eat up valuable time—data entry between systems, spreadsheet tracking, customer communications that should be automated. These inefficiencies add up, costing hours every week that could be spent on activities that actually grow your business.

Penn Tech Solutions builds simple custom tools that automate the busywork. We're not talking about complex enterprise software—we create practical solutions that solve specific problems: inventory trackers, scheduling apps, customer portals, automated reports, and integrations between the systems you already use.`,
    benefits: [
      {
        title: 'Eliminate Manual Work',
        description: 'Stop copying data between spreadsheets and systems. Automation handles the repetitive tasks.',
      },
      {
        title: 'Connect Your Tools',
        description: 'Make your existing software talk to each other. CRM to accounting, website to email, and more.',
      },
      {
        title: 'Simple Solutions',
        description: 'We build what you need, not bloated software with features you\'ll never use.',
      },
      {
        title: 'Affordable Maintenance',
        description: 'Ongoing support and updates at reasonable rates to keep your tools running.',
      },
    ],
    features: [
      'Workflow automation',
      'System integrations',
      'Custom web applications',
      'Mobile apps for field teams',
      'Customer portals',
      'Automated reporting',
      'Data import/export tools',
      'Form and survey systems',
      'Scheduling applications',
      'Inventory tracking systems',
    ],
    useCases: [
      {
        scenario: 'Service Company',
        challenge: 'Technicians filled out paper forms, then office staff manually entered data into billing system.',
        solution: 'Built mobile app for field technicians to complete job tickets on site. Data flows automatically to billing system, eliminating double-entry.',
      },
      {
        scenario: 'Wholesale Distributor',
        challenge: 'Sales reps needed real-time inventory visibility while meeting with customers.',
        solution: 'Created simple inventory lookup app connected to their ERP system. Reps can check stock and pricing instantly.',
      },
    ],
    pricing: 'Custom development projects vary widely. Simple automations start around $2,000. More complex applications typically $10,000-25,000.',
  },
  {
    id: 'ai',
    title: 'AI Business Integration',
    tagline: 'Practical AI Tools Without the Complexity',
    color: colors.ai,
    overview: `Artificial intelligence isn't just for big corporations anymore. Today's AI tools can help small businesses work smarter—answering customer questions 24/7, processing documents automatically, generating reports from your data, and freeing your team to focus on work that requires human judgment.

But the AI landscape is confusing and changing rapidly. Penn Tech Solutions cuts through the hype to identify practical AI applications that deliver real value for your business. We handle implementation and training so you can leverage AI without becoming an AI expert.`,
    benefits: [
      {
        title: '24/7 Customer Service',
        description: 'AI chatbots answer common questions anytime, qualifying leads and handling routine inquiries.',
      },
      {
        title: 'Automated Data Entry',
        description: 'AI reads documents and extracts data, eliminating hours of manual typing.',
      },
      {
        title: 'Business Insights',
        description: 'AI analyzes your data and surfaces insights in plain English.',
      },
      {
        title: 'Team Training',
        description: 'We train your staff to use AI tools effectively and safely.',
      },
    ],
    features: [
      'AI chatbot implementation',
      'Document processing automation',
      'Customer service AI assistants',
      'Data analysis and reporting',
      'Email response automation',
      'Content generation tools',
      'Voice transcription services',
      'Scheduling optimization',
      'Inventory forecasting',
      'Custom AI integrations',
    ],
    useCases: [
      {
        scenario: 'Real Estate Agency',
        challenge: 'Agents spent hours answering the same property questions via email and phone.',
        solution: 'Deployed AI chatbot on website that answers property questions, schedules showings, and captures lead information around the clock.',
      },
      {
        scenario: 'Insurance Broker',
        challenge: 'Manual review of policy documents was time-consuming and error-prone.',
        solution: 'Implemented AI document processing that extracts key information from policies. Staff reviews AI-generated summaries instead of reading full documents.',
      },
    ],
    pricing: 'AI implementations vary based on complexity. Chatbots typically $2,000-5,000 to deploy. Document processing and custom AI projects priced by scope.',
  },
]

const DetailedServices = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="Detailed Service Guide"
        subtitle="Comprehensive IT Solutions for Small Businesses"
        documentType="Service Catalog"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Table of Contents */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Detailed Service Guide" />
      <PageFooter />

      <SectionHeader title="Table of Contents" />

      <View style={styles.tocContainer}>
        {detailedServices.map((service, index) => (
          <View key={service.id} style={styles.tocItem}>
            <View style={styles.tocLeft}>
              <Text style={[styles.tocNumber, { color: service.color }]}>{String(index + 1).padStart(2, '0')}</Text>
              <Text style={styles.tocTitle}>{service.title}</Text>
            </View>
            <View style={styles.tocDots} />
            <Text style={styles.tocPage}>{(index * 2) + 3}</Text>
          </View>
        ))}
      </View>

      <View style={styles.introBox}>
        <Text style={styles.introTitle}>About This Guide</Text>
        <Text style={styles.introText}>
          This comprehensive guide details each service offered by Penn Tech Solutions. For each service,
          you'll find an overview, key benefits, specific features, real-world use cases, and general
          pricing guidance. Contact us for a customized quote based on your specific needs.
        </Text>
      </View>
    </Page>

    {/* Individual Service Pages */}
    {detailedServices.map((service, index) => (
      <React.Fragment key={service.id}>
        {/* Service Main Page */}
        <Page size="LETTER" style={sharedStyles.page}>
          <PageHeader title="Detailed Service Guide" subtitle={service.title} />
          <PageFooter />

          <View style={[styles.serviceHeader, { borderLeftColor: service.color }]}>
            <View style={[styles.serviceNumber, { backgroundColor: service.color }]}>
              <Text style={styles.serviceNumberText}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <View style={styles.serviceHeaderContent}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={[styles.serviceTagline, { color: service.color }]}>{service.tagline}</Text>
            </View>
          </View>

          <SectionHeader title="Overview" />
          {service.overview.split('\n\n').map((paragraph, i) => (
            <Text key={i} style={sharedStyles.body}>{paragraph}</Text>
          ))}

          <SectionHeader title="Key Benefits" />
          <View style={styles.benefitsGrid}>
            {service.benefits.map((benefit, i) => (
              <View key={i} style={styles.benefitCard}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        </Page>

        {/* Service Details Page */}
        <Page size="LETTER" style={sharedStyles.page}>
          <PageHeader title="Detailed Service Guide" subtitle={`${service.title} - Details`} />
          <PageFooter />

          <SectionHeader title="Features & Capabilities" />
          <View style={styles.featuresGrid}>
            {service.features.map((feature, i) => (
              <View key={i} style={styles.featureItem}>
                <Text style={[styles.featureCheck, { color: service.color }]}>+</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <SectionHeader title="Real-World Examples" />
          {service.useCases.map((useCase, i) => (
            <View key={i} style={styles.useCaseCard}>
              <View style={styles.useCaseHeader}>
                <Text style={styles.useCaseScenario}>{useCase.scenario}</Text>
              </View>
              <View style={styles.useCaseBody}>
                <View style={styles.useCaseSection}>
                  <Text style={styles.useCaseLabel}>Challenge:</Text>
                  <Text style={styles.useCaseText}>{useCase.challenge}</Text>
                </View>
                <View style={styles.useCaseSection}>
                  <Text style={[styles.useCaseLabel, { color: service.color }]}>Solution:</Text>
                  <Text style={styles.useCaseText}>{useCase.solution}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.pricingBox}>
            <Text style={styles.pricingTitle}>Pricing Guidance</Text>
            <Text style={styles.pricingText}>{service.pricing}</Text>
          </View>
        </Page>
      </React.Fragment>
    ))}

    {/* Contact/CTA Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Detailed Service Guide" subtitle="Get Started" />
      <PageFooter />

      <SectionHeader title="Ready to Get Started?" />

      <Text style={sharedStyles.body}>
        Every business is unique, and we tailor our services to fit your specific needs and budget.
        The best way to find out how Penn Tech Solutions can help your business is with a free,
        no-obligation consultation.
      </Text>

      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Free IT Consultation</Text>
        <Text style={styles.contactSubtitle}>Let's discuss your technology needs</Text>

        <View style={styles.contactGrid}>
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
              <Text style={styles.contactLabel}>Hours</Text>
              <Text style={styles.contactValue}>M-F 8am-6pm ET</Text>
            </View>
          </View>
        </View>
      </View>

      <CalloutBox
        type="info"
        title="What to Expect"
        text="During your free consultation, we'll discuss your current setup, pain points, and goals. You'll receive honest recommendations tailored to your business—never a hard sell. Most consultations take 30-45 minutes and can be done on-site or via video call."
      />

      <View style={styles.closingStatement}>
        <Text style={styles.closingText}>
          Technology should work for your business, not against it.
        </Text>
        <Text style={styles.closingCta}>
          Let Penn Tech Solutions make that happen.
        </Text>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Table of Contents
  tocContainer: {
    marginTop: 16,
  },
  tocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tocLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tocNumber: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    width: 24,
  },
  tocTitle: {
    fontSize: 11,
    color: colors.dark,
  },
  tocDots: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderStyle: 'dotted',
    marginHorizontal: 12,
    marginBottom: 4,
  },
  tocPage: {
    fontSize: 11,
    color: colors.gray,
    width: 20,
    textAlign: 'right',
  },

  // Intro box
  introBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  introTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },
  introText: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.6,
  },

  // Service header
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 5,
    marginBottom: 20,
  },
  serviceNumber: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceNumberText: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  serviceHeaderContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  serviceTagline: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },

  // Benefits grid
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  benefitTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
  },
  benefitDesc: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Features grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  featureCheck: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  featureText: {
    fontSize: 9,
    color: colors.gray,
    flex: 1,
  },

  // Use case card
  useCaseCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  useCaseHeader: {
    backgroundColor: colors.dark,
    padding: 10,
  },
  useCaseScenario: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  useCaseBody: {
    padding: 12,
  },
  useCaseSection: {
    marginBottom: 8,
  },
  useCaseLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray,
    marginBottom: 2,
  },
  useCaseText: {
    fontSize: 9,
    color: colors.dark,
    lineHeight: 1.5,
  },

  // Pricing box
  pricingBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#fefce8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  pricingTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
  },
  pricingText: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Contact box
  contactBox: {
    backgroundColor: colors.dark,
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: 10,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
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

  // Closing statement
  closingStatement: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  closingText: {
    fontSize: 13,
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 8,
  },
  closingCta: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textAlign: 'center',
  },
})

export default DetailedServices
