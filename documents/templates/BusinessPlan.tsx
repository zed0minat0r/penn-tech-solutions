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
  StatBox,
} from '../shared/components'

const BusinessPlan = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="Business Plan"
        subtitle="Managed IT Services for Small Businesses"
        documentType="Strategic Plan"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Table of Contents */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" />
      <PageFooter />

      <SectionHeader title="Table of Contents" />

      <View style={styles.tocContainer}>
        {[
          { number: '01', title: 'Executive Summary', page: '3' },
          { number: '02', title: 'Company Overview', page: '4' },
          { number: '03', title: 'Services & Solutions', page: '5' },
          { number: '04', title: 'Market Analysis', page: '6' },
          { number: '05', title: 'Target Market', page: '7' },
          { number: '06', title: 'Competitive Advantage', page: '8' },
          { number: '07', title: 'Marketing Strategy', page: '9' },
          { number: '08', title: 'Operations Plan', page: '10' },
          { number: '09', title: 'Financial Overview', page: '11' },
          { number: '10', title: 'Growth Strategy', page: '12' },
        ].map((item) => (
          <View key={item.number} style={styles.tocItem}>
            <View style={styles.tocLeft}>
              <Text style={styles.tocNumber}>{item.number}</Text>
              <Text style={styles.tocTitle}>{item.title}</Text>
            </View>
            <View style={styles.tocDots} />
            <Text style={styles.tocPage}>{item.page}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tocNote}>
        <Text style={styles.tocNoteText}>
          This business plan outlines the strategic direction for Penn Tech Solutions, a managed IT services
          provider serving small businesses in the Greater Philadelphia area.
        </Text>
      </View>
    </Page>

    {/* Executive Summary */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Executive Summary" />
      <PageFooter />

      <SectionHeader title="Executive Summary" number="01" />

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Mission Statement</Text>
        <Text style={styles.summaryText}>
          Penn Tech Solutions provides enterprise-quality IT services to small businesses in the Greater
          Philadelphia area, delivering personalized support and right-sized solutions that fit real-world
          budgets.
        </Text>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Business Overview</Text>
      <Text style={sharedStyles.body}>
        Penn Tech Solutions is a managed IT services provider (MSP) focused exclusively on small businesses
        with 5-50 employees. We differentiate ourselves through local, hands-on service delivery and a
        cloud-first approach that eliminates expensive on-premise infrastructure costs.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Key Highlights</Text>
      <View style={styles.highlightGrid}>
        <View style={styles.highlightItem}>
          <View style={[styles.highlightIconBox, { backgroundColor: colors.primary }]}>
            <Text style={styles.highlightIconText}>1</Text>
          </View>
          <Text style={styles.highlightTitle}>Local Focus</Text>
          <Text style={styles.highlightText}>Greater Philadelphia Area including Montgomery, Bucks, Chester & Delaware Counties</Text>
        </View>
        <View style={styles.highlightItem}>
          <View style={[styles.highlightIconBox, { backgroundColor: colors.accent }]}>
            <Text style={styles.highlightIconText}>2</Text>
          </View>
          <Text style={styles.highlightTitle}>Target Market</Text>
          <Text style={styles.highlightText}>Small businesses with 5-50 employees seeking reliable IT support</Text>
        </View>
        <View style={styles.highlightItem}>
          <View style={[styles.highlightIconBox, { backgroundColor: '#a855f7' }]}>
            <Text style={styles.highlightIconText}>3</Text>
          </View>
          <Text style={styles.highlightTitle}>Cloud-First</Text>
          <Text style={styles.highlightText}>Modern solutions that reduce costs and increase flexibility</Text>
        </View>
        <View style={styles.highlightItem}>
          <View style={[styles.highlightIconBox, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.highlightIconText}>4</Text>
          </View>
          <Text style={styles.highlightTitle}>Partnership Model</Text>
          <Text style={styles.highlightText}>Long-term relationships over transactional sales</Text>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Service Categories</Text>
      <View style={[sharedStyles.row, { flexWrap: 'wrap', gap: 8 }]}>
        {['VoIP & Telecom', 'Network Infrastructure', 'Security Systems', 'Websites', 'Data Protection', 'AI Integration'].map((service) => (
          <View key={service} style={styles.serviceTag}>
            <Text style={styles.serviceTagText}>{service}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Company Overview */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Company Overview" />
      <PageFooter />

      <SectionHeader title="Company Overview" number="02" />

      <Text style={sharedStyles.body}>
        Penn Tech Solutions was founded with a simple premise: small businesses deserve the same quality IT
        support that large enterprises enjoy, without the enterprise price tag or complexity.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Company Information</Text>
      <View style={styles.infoTable}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Legal Name</Text>
          <Text style={styles.infoValue}>Penn Tech Solutions LLC</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Business Type</Text>
          <Text style={styles.infoValue}>Managed IT Services Provider (MSP)</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Service Area</Text>
          <Text style={styles.infoValue}>Greater Philadelphia Area</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Primary Contact</Text>
          <Text style={styles.infoValue}>info@penntechsolutions.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>(215) 555-1234</Text>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Core Values</Text>
      <View style={styles.valuesContainer}>
        <View style={styles.valueCard}>
          <Text style={styles.valueCardTitle}>Local & Personal</Text>
          <Text style={styles.valueCardText}>
            We're your neighbors, not a distant call center. When you call, you get a real person who
            knows your setup and your business.
          </Text>
        </View>
        <View style={styles.valueCard}>
          <Text style={styles.valueCardTitle}>Full-Service IT</Text>
          <Text style={styles.valueCardText}>
            From phones to networks to websites—we handle all your technology needs so you have one
            trusted partner for everything.
          </Text>
        </View>
        <View style={styles.valueCard}>
          <Text style={styles.valueCardTitle}>Right-Sized Solutions</Text>
          <Text style={styles.valueCardText}>
            We recommend what you actually need, not the most expensive option. Your budget and business
            goals always come first.
          </Text>
        </View>
      </View>

      <CalloutBox
        type="info"
        title="Our Promise"
        text="We believe technology should be an enabler, not a headache. Every recommendation we make is designed to solve real problems and deliver measurable value for your business."
      />
    </Page>

    {/* Services & Solutions */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Services & Solutions" />
      <PageFooter />

      <SectionHeader title="Services & Solutions" number="03" />

      <Text style={sharedStyles.body}>
        We offer a comprehensive suite of IT services designed specifically for small business needs and budgets.
        Our cloud-first approach minimizes upfront hardware costs while maximizing flexibility and reliability.
      </Text>

      <View style={styles.servicesGrid}>
        {[
          { name: 'Cloud VoIP & Telecom', desc: 'Enterprise phone features without the hardware costs' },
          { name: 'Network Infrastructure', desc: 'Secure, reliable networks sized for your team' },
          { name: 'Point of Sale Systems', desc: 'Modern PoS for retail and restaurants' },
          { name: 'Professional Websites', desc: 'Fast, mobile-friendly sites that convert' },
          { name: 'Security Systems', desc: 'Cameras and access control on a budget' },
          { name: 'Data Protection', desc: 'Backup, antivirus, and cyber security' },
          { name: 'Equipment Procurement', desc: 'Wholesale pricing, complete setup' },
          { name: 'Custom Development', desc: 'Apps and automation for your workflows' },
          { name: 'AI Integration', desc: 'Practical AI tools for business growth' },
        ].map((service, index) => (
          <View key={service.name} style={styles.serviceGridItem}>
            <View style={styles.serviceGridNumber}>
              <Text style={styles.serviceGridNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.serviceGridName}>{service.name}</Text>
            <Text style={styles.serviceGridDesc}>{service.desc}</Text>
          </View>
        ))}
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Service Delivery Model</Text>
      <Text style={sharedStyles.body}>
        We offer flexible engagement models to fit different business needs:
      </Text>
      <BulletItem text="Project-Based: One-time implementations, upgrades, or migrations" />
      <BulletItem text="Break/Fix: On-demand support billed hourly" />
      <BulletItem text="Managed Services: Proactive monthly support packages (coming soon)" />
      <BulletItem text="Consulting: Strategic IT planning and assessments" />
    </Page>

    {/* Market Analysis */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Market Analysis" />
      <PageFooter />

      <SectionHeader title="Market Analysis" number="04" />

      <Text style={sharedStyles.body}>
        The managed IT services market continues to grow as small businesses increasingly recognize the need
        for professional technology support and cybersecurity protection.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Industry Trends</Text>
      <View style={styles.trendsList}>
        <View style={styles.trendItem}>
          <View style={styles.trendIcon}>
            <Text style={styles.trendIconText}>1</Text>
          </View>
          <View style={styles.trendContent}>
            <Text style={styles.trendTitle}>Cloud Adoption Accelerating</Text>
            <Text style={styles.trendDesc}>
              Small businesses are rapidly moving to cloud-based solutions, reducing reliance on expensive
              on-premise infrastructure.
            </Text>
          </View>
        </View>
        <View style={styles.trendItem}>
          <View style={[styles.trendIcon, { backgroundColor: '#fef3c7' }]}>
            <Text style={[styles.trendIconText, { color: '#f59e0b' }]}>2</Text>
          </View>
          <View style={styles.trendContent}>
            <Text style={styles.trendTitle}>Cybersecurity Threats Rising</Text>
            <Text style={styles.trendDesc}>
              Ransomware and phishing attacks increasingly target small businesses, driving demand for
              professional security services.
            </Text>
          </View>
        </View>
        <View style={styles.trendItem}>
          <View style={[styles.trendIcon, { backgroundColor: '#f0fdf4' }]}>
            <Text style={[styles.trendIconText, { color: '#22c55e' }]}>3</Text>
          </View>
          <View style={styles.trendContent}>
            <Text style={styles.trendTitle}>AI Becoming Accessible</Text>
            <Text style={styles.trendDesc}>
              Practical AI tools are now available for small businesses, creating opportunities for
              early adopters to gain competitive advantages.
            </Text>
          </View>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Local Market Opportunity</Text>
      <Text style={sharedStyles.body}>
        The Greater Philadelphia area has a robust small business economy with over 100,000 establishments
        employing fewer than 50 people. Many of these businesses lack dedicated IT staff and rely on
        outdated systems or ad-hoc support arrangements.
      </Text>

      <View style={[sharedStyles.row, { gap: 16, marginTop: 16 }]}>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="100K+" label="Small Businesses in Greater Philly" color={colors.primary} />
        </View>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="73%" label="Lack Dedicated IT Staff" color={colors.accent} />
        </View>
        <View style={[sharedStyles.flex1]}>
          <StatBox value="$12B+" label="Regional IT Services Market" color="#a855f7" />
        </View>
      </View>
    </Page>

    {/* Target Market */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Target Market" />
      <PageFooter />

      <SectionHeader title="Target Market" number="05" />

      <Text style={sharedStyles.body}>
        We focus on small businesses that are large enough to need professional IT support but too small
        to justify a full-time IT employee.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Ideal Customer Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>Primary Target</Text>
        </View>
        <View style={styles.profileBody}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Company Size</Text>
            <Text style={styles.profileValue}>5-50 employees</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Annual Revenue</Text>
            <Text style={styles.profileValue}>$500K - $10M</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>IT Staff</Text>
            <Text style={styles.profileValue}>None or part-time</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Tech Budget</Text>
            <Text style={styles.profileValue}>Limited but willing to invest</Text>
          </View>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Target Industries</Text>
      <View style={styles.industryGrid}>
        {[
          { name: 'Healthcare Practices', reason: 'HIPAA compliance needs' },
          { name: 'Law Firms', reason: 'Data security requirements' },
          { name: 'Professional Services', reason: 'Reliability critical' },
          { name: 'Manufacturing', reason: 'Operational technology' },
          { name: 'Retail & Restaurants', reason: 'PoS and connectivity' },
          { name: 'Construction', reason: 'Mobile workforce needs' },
        ].map((industry) => (
          <View key={industry.name} style={styles.industryItem}>
            <Text style={styles.industryBullet}>+</Text>
            <View>
              <Text style={styles.industryName}>{industry.name}</Text>
              <Text style={styles.industryReason}>{industry.reason}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Customer Pain Points We Solve</Text>
      <FeatureItem text="Unreliable or slow IT support from current providers" />
      <FeatureItem text="Outdated technology hindering productivity" />
      <FeatureItem text="Concerns about cybersecurity and data protection" />
      <FeatureItem text="Confusion about which technology investments to make" />
      <FeatureItem text="High costs from enterprise-focused vendors" />
    </Page>

    {/* Competitive Advantage */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Competitive Advantage" />
      <PageFooter />

      <SectionHeader title="Competitive Advantage" number="06" />

      <Text style={sharedStyles.body}>
        We compete with both national MSPs and local computer repair shops. Our positioning bridges the gap
        between these extremes, offering professional service with personal attention.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Competitive Positioning</Text>
      <View style={styles.comparisonTable}>
        <View style={styles.comparisonHeader}>
          <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 2 }]}>Factor</Text>
          <Text style={[styles.comparisonCell, styles.comparisonHeaderText]}>National MSPs</Text>
          <Text style={[styles.comparisonCell, styles.comparisonHeaderText]}>Local Shops</Text>
          <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { color: colors.accent }]}>Penn Tech</Text>
        </View>
        {[
          { factor: 'Service Quality', national: 'High', local: 'Variable', us: 'High' },
          { factor: 'Personal Attention', national: 'Low', local: 'High', us: 'High' },
          { factor: 'Response Time', national: 'Slow', local: 'Fast', us: 'Fast' },
          { factor: 'Pricing', national: 'Premium', local: 'Low', us: 'Fair' },
          { factor: 'Technical Expertise', national: 'High', local: 'Variable', us: 'High' },
          { factor: 'Full-Service Offering', national: 'Yes', local: 'Limited', us: 'Yes' },
        ].map((row, index) => (
          <View key={row.factor} style={[styles.comparisonRow, index % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
            <Text style={[styles.comparisonCell, { flex: 2, fontFamily: 'Helvetica-Bold' }]}>{row.factor}</Text>
            <Text style={styles.comparisonCell}>{row.national}</Text>
            <Text style={styles.comparisonCell}>{row.local}</Text>
            <Text style={[styles.comparisonCell, { color: colors.primary, fontFamily: 'Helvetica-Bold' }]}>{row.us}</Text>
          </View>
        ))}
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Key Differentiators</Text>
      <View style={styles.differentiatorList}>
        <View style={styles.differentiator}>
          <Text style={styles.differentiatorNumber}>1</Text>
          <View style={styles.differentiatorContent}>
            <Text style={styles.differentiatorTitle}>Local Presence, Real Relationships</Text>
            <Text style={styles.differentiatorText}>
              We're based in Greater Philadelphia and know the local business community. You'll work
              with the same people who understand your business.
            </Text>
          </View>
        </View>
        <View style={styles.differentiator}>
          <Text style={styles.differentiatorNumber}>2</Text>
          <View style={styles.differentiatorContent}>
            <Text style={styles.differentiatorTitle}>Cloud-First, Cost-Effective</Text>
            <Text style={styles.differentiatorText}>
              We prioritize cloud solutions that reduce upfront costs and ongoing maintenance while
              providing enterprise-grade reliability.
            </Text>
          </View>
        </View>
        <View style={styles.differentiator}>
          <Text style={styles.differentiatorNumber}>3</Text>
          <View style={styles.differentiatorContent}>
            <Text style={styles.differentiatorTitle}>Honest Recommendations</Text>
            <Text style={styles.differentiatorText}>
              We'll never oversell. If you don't need something, we'll tell you. Building trust is
              more important than making a sale.
            </Text>
          </View>
        </View>
      </View>
    </Page>

    {/* Marketing Strategy */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Marketing Strategy" />
      <PageFooter />

      <SectionHeader title="Marketing Strategy" number="07" />

      <Text style={sharedStyles.body}>
        Our marketing strategy focuses on building local awareness and establishing trust within the
        Greater Philadelphia business community.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Marketing Channels</Text>
      <View style={styles.channelGrid}>
        <View style={styles.channelCard}>
          <View style={[styles.channelIconBox, { backgroundColor: colors.primary }]}>
            <Text style={styles.channelIconText}>1</Text>
          </View>
          <Text style={styles.channelTitle}>Digital Presence</Text>
          <Text style={styles.channelText}>
            Professional website with SEO optimization, Google Business Profile, and local directory listings
          </Text>
        </View>
        <View style={styles.channelCard}>
          <View style={[styles.channelIconBox, { backgroundColor: colors.accent }]}>
            <Text style={styles.channelIconText}>2</Text>
          </View>
          <Text style={styles.channelTitle}>Referral Network</Text>
          <Text style={styles.channelText}>
            Partnerships with accountants, lawyers, and business consultants who serve our target market
          </Text>
        </View>
        <View style={styles.channelCard}>
          <View style={[styles.channelIconBox, { backgroundColor: '#a855f7' }]}>
            <Text style={styles.channelIconText}>3</Text>
          </View>
          <Text style={styles.channelTitle}>Community Involvement</Text>
          <Text style={styles.channelText}>
            Chamber of Commerce membership, local business events, and community sponsorships
          </Text>
        </View>
        <View style={styles.channelCard}>
          <View style={[styles.channelIconBox, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.channelIconText}>4</Text>
          </View>
          <Text style={styles.channelTitle}>Content Marketing</Text>
          <Text style={styles.channelText}>
            Educational blog posts, tech tips, and cybersecurity awareness content for small businesses
          </Text>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Sales Process</Text>
      <View style={styles.salesProcess}>
        <View style={styles.salesStep}>
          <Text style={styles.salesStepNumber}>1</Text>
          <Text style={styles.salesStepTitle}>Free Consultation</Text>
          <Text style={styles.salesStepText}>No-pressure discovery call</Text>
        </View>
        <Text style={styles.salesArrow}>{'->'}</Text>
        <View style={styles.salesStep}>
          <Text style={styles.salesStepNumber}>2</Text>
          <Text style={styles.salesStepTitle}>Assessment</Text>
          <Text style={styles.salesStepText}>Understand current state</Text>
        </View>
        <Text style={styles.salesArrow}>{'->'}</Text>
        <View style={styles.salesStep}>
          <Text style={styles.salesStepNumber}>3</Text>
          <Text style={styles.salesStepTitle}>Proposal</Text>
          <Text style={styles.salesStepText}>Clear, transparent pricing</Text>
        </View>
        <Text style={styles.salesArrow}>{'->'}</Text>
        <View style={styles.salesStep}>
          <Text style={styles.salesStepNumber}>4</Text>
          <Text style={styles.salesStepTitle}>Close</Text>
          <Text style={styles.salesStepText}>Win-win agreements</Text>
        </View>
      </View>

      <CalloutBox
        type="success"
        title="Lead Generation Goals"
        text="Our primary lead generation focus is on inbound marketing and referrals, building a sustainable pipeline of qualified prospects who already understand and trust our value proposition."
      />
    </Page>

    {/* Operations Plan */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Operations Plan" />
      <PageFooter />

      <SectionHeader title="Operations Plan" number="08" />

      <Text style={sharedStyles.body}>
        Our operations are designed for efficiency and scalability while maintaining the personal touch
        that differentiates us from larger competitors.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Service Delivery</Text>
      <BulletItem text="Remote support as first line for quick resolution" />
      <BulletItem text="On-site service within 24 hours for complex issues" />
      <BulletItem text="After-hours emergency support available" />
      <BulletItem text="Scheduled maintenance during off-peak hours" />

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Technology Stack</Text>
      <View style={styles.techStack}>
        <View style={styles.techCategory}>
          <Text style={styles.techCategoryTitle}>Remote Support</Text>
          <Text style={styles.techItem}>• Remote desktop tools</Text>
          <Text style={styles.techItem}>• Ticketing system</Text>
          <Text style={styles.techItem}>• Documentation platform</Text>
        </View>
        <View style={styles.techCategory}>
          <Text style={styles.techCategoryTitle}>Monitoring</Text>
          <Text style={styles.techItem}>• Network monitoring</Text>
          <Text style={styles.techItem}>• Security alerts</Text>
          <Text style={styles.techItem}>• Performance dashboards</Text>
        </View>
        <View style={styles.techCategory}>
          <Text style={styles.techCategoryTitle}>Vendor Partners</Text>
          <Text style={styles.techItem}>• Cisco</Text>
          <Text style={styles.techItem}>• Ubiquiti</Text>
          <Text style={styles.techItem}>• SonicWall</Text>
          <Text style={styles.techItem}>• Yealink</Text>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Quality Assurance</Text>
      <Text style={sharedStyles.body}>
        Every project and support interaction includes quality checkpoints:
      </Text>
      <FeatureItem text="Post-implementation testing and verification" />
      <FeatureItem text="Client satisfaction follow-up within 48 hours" />
      <FeatureItem text="Documentation of all work performed" />
      <FeatureItem text="Quarterly business reviews with managed clients" />
    </Page>

    {/* Financial Overview */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Financial Overview" />
      <PageFooter />

      <SectionHeader title="Financial Overview" number="09" />

      <Text style={sharedStyles.body}>
        This section provides a high-level overview of our financial model. Detailed financial projections
        are available upon request.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Revenue Streams</Text>
      <View style={styles.revenueStreams}>
        <View style={styles.revenueItem}>
          <View style={[styles.revenueBar, { width: '70%', backgroundColor: colors.primary }]} />
          <View style={styles.revenueInfo}>
            <Text style={styles.revenueName}>Project Services</Text>
            <Text style={styles.revenueDesc}>Implementations, upgrades, migrations</Text>
          </View>
        </View>
        <View style={styles.revenueItem}>
          <View style={[styles.revenueBar, { width: '50%', backgroundColor: colors.accent }]} />
          <View style={styles.revenueInfo}>
            <Text style={styles.revenueName}>Break/Fix Support</Text>
            <Text style={styles.revenueDesc}>Hourly troubleshooting and repairs</Text>
          </View>
        </View>
        <View style={styles.revenueItem}>
          <View style={[styles.revenueBar, { width: '30%', backgroundColor: '#a855f7' }]} />
          <View style={styles.revenueInfo}>
            <Text style={styles.revenueName}>Equipment Sales</Text>
            <Text style={styles.revenueDesc}>Hardware and software procurement</Text>
          </View>
        </View>
        <View style={styles.revenueItem}>
          <View style={[styles.revenueBar, { width: '20%', backgroundColor: '#22c55e' }]} />
          <View style={styles.revenueInfo}>
            <Text style={styles.revenueName}>Managed Services</Text>
            <Text style={styles.revenueDesc}>Monthly recurring contracts (planned)</Text>
          </View>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Key Financial Metrics</Text>
      <View style={styles.metricsBox}>
        <Text style={styles.metricsNote}>
          [Detailed financial projections, including revenue forecasts, expense breakdowns, and
          profitability targets to be added based on business performance data]
        </Text>
      </View>

      <CalloutBox
        type="info"
        title="Pricing Strategy"
        text="We price services competitively below enterprise MSPs while maintaining margins that allow for quality service delivery. Our cloud-first approach reduces overhead, allowing us to pass savings to clients."
      />
    </Page>

    {/* Growth Strategy */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Business Plan" subtitle="Growth Strategy" />
      <PageFooter />

      <SectionHeader title="Growth Strategy" number="10" />

      <Text style={sharedStyles.body}>
        Our growth strategy focuses on sustainable expansion while maintaining service quality and
        customer satisfaction.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Short-Term Goals (Year 1)</Text>
      <FeatureItem text="Establish strong client base of 20-30 active accounts" />
      <FeatureItem text="Build reputation through excellent service and referrals" />
      <FeatureItem text="Develop standardized processes and documentation" />
      <FeatureItem text="Launch managed services offering" />

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Medium-Term Goals (Years 2-3)</Text>
      <FeatureItem text="Expand client base to 50+ active accounts" />
      <FeatureItem text="Hire additional technical staff" />
      <FeatureItem text="Develop vertical-specific solutions (healthcare, legal, etc.)" />
      <FeatureItem text="Establish strategic vendor partnerships" />

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Long-Term Vision (Years 4-5)</Text>
      <FeatureItem text="Become the premier small business MSP in Greater Philadelphia" />
      <FeatureItem text="Expand service area to broader PA/NJ region" />
      <FeatureItem text="Develop proprietary tools and service offerings" />
      <FeatureItem text="Consider strategic acquisitions of complementary businesses" />

      <View style={styles.closingBox}>
        <Text style={styles.closingTitle}>Ready to Learn More?</Text>
        <Text style={styles.closingText}>
          Penn Tech Solutions is committed to being the trusted IT partner for small businesses
          in the Greater Philadelphia area. Contact us to discuss how we can help your business thrive.
        </Text>
        <View style={styles.closingContact}>
          <Text style={styles.closingContactText}>Email: info@penntechsolutions.com</Text>
          <Text style={styles.closingContactText}>Phone: (215) 555-1234</Text>
        </View>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Table of Contents styles
  tocContainer: {
    marginTop: 20,
  },
  tocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tocLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tocNumber: {
    fontSize: 12,
    color: colors.primary,
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
  },
  tocNote: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  tocNoteText: {
    fontSize: 10,
    color: colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 1.6,
  },

  // Summary box styles
  summaryBox: {
    backgroundColor: colors.dark,
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 10,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 1.7,
  },

  // Highlight grid styles
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  highlightItem: {
    width: '47%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  highlightIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  highlightIconText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  highlightTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Service tag styles
  serviceTag: {
    backgroundColor: '#eff6ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  serviceTagText: {
    fontSize: 9,
    color: colors.primary,
  },

  // Info table styles
  infoTable: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: {
    width: 120,
    fontSize: 10,
    color: colors.gray,
  },
  infoValue: {
    flex: 1,
    fontSize: 10,
    color: colors.dark,
    fontFamily: 'Helvetica-Bold',
  },

  // Values container styles
  valuesContainer: {
    gap: 10,
    marginTop: 8,
  },
  valueCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    padding: 12,
  },
  valueCardTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  valueCardText: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Services grid styles
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  serviceGridItem: {
    width: '31%',
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
  },
  serviceGridNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceGridNumberText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  serviceGridName: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 2,
  },
  serviceGridDesc: {
    fontSize: 7,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 1.3,
  },

  // Trends list styles
  trendsList: {
    gap: 12,
    marginTop: 8,
  },
  trendItem: {
    flexDirection: 'row',
    gap: 12,
  },
  trendIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendIconText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'Helvetica-Bold',
  },
  trendContent: {
    flex: 1,
  },
  trendTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 2,
  },
  trendDesc: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Profile card styles
  profileCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  profileHeader: {
    backgroundColor: colors.dark,
    padding: 10,
  },
  profileTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  profileBody: {
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  profileItem: {
    width: '45%',
  },
  profileLabel: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 2,
  },
  profileValue: {
    fontSize: 10,
    color: colors.dark,
    fontFamily: 'Helvetica-Bold',
  },

  // Industry grid styles
  industryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  industryItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 8,
  },
  industryBullet: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    width: 16,
  },
  industryName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  industryReason: {
    fontSize: 7,
    color: colors.gray,
  },

  // Comparison table styles
  comparisonTable: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    paddingVertical: 8,
  },
  comparisonHeaderText: {
    color: colors.white,
    fontFamily: 'Helvetica-Bold',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  comparisonCell: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
    paddingHorizontal: 8,
  },

  // Differentiator styles
  differentiatorList: {
    gap: 12,
    marginTop: 8,
  },
  differentiator: {
    flexDirection: 'row',
    gap: 12,
  },
  differentiatorNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  differentiatorContent: {
    flex: 1,
  },
  differentiatorTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 2,
  },
  differentiatorText: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Channel grid styles
  channelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  channelCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  channelIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  channelIconText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  channelTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  channelText: {
    fontSize: 8,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Sales process styles
  salesProcess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  salesStep: {
    alignItems: 'center',
    width: 80,
  },
  salesStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 4,
  },
  salesStepTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    textAlign: 'center',
  },
  salesStepText: {
    fontSize: 7,
    color: colors.gray,
    textAlign: 'center',
  },
  salesArrow: {
    fontSize: 14,
    color: colors.grayLight,
  },

  // Tech stack styles
  techStack: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  techCategory: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 10,
  },
  techCategoryTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
  },
  techItem: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 2,
  },

  // Revenue styles
  revenueStreams: {
    marginTop: 8,
    gap: 10,
  },
  revenueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueBar: {
    height: 20,
    borderRadius: 4,
  },
  revenueInfo: {
    flex: 1,
  },
  revenueName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  revenueDesc: {
    fontSize: 8,
    color: colors.gray,
  },

  // Metrics box styles
  metricsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    padding: 20,
    marginTop: 8,
  },
  metricsNote: {
    fontSize: 10,
    color: colors.grayLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Closing box styles
  closingBox: {
    backgroundColor: colors.dark,
    borderRadius: 12,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
  },
  closingTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 8,
  },
  closingText: {
    fontSize: 10,
    color: colors.grayLight,
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  closingContact: {
    flexDirection: 'row',
    gap: 24,
  },
  closingContactText: {
    fontSize: 11,
    color: colors.accent,
  },
})

export default BusinessPlan
