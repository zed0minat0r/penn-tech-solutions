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
  QuoteBox,
} from '../shared/components'

const visualEnhancements = [
  {
    title: 'Create Service-Specific Graphics',
    description: 'Design eye-catching images for each major service category (Security, Cloud, VoIP, AI, etc.) that can be posted to create a more visually appealing feed. These should match the website\'s color scheme and design language.',
  },
  {
    title: 'Add a Professional Header/Banner Post',
    description: 'Create a pinned post with the company\'s value proposition, service overview, and clear CTAs. This ensures visitors see your best content first.',
  },
  {
    title: 'Company Photos',
    description: 'Add team photos, office environment, and equipment photos to the Photos section. This builds trust and shows the real people behind the business.',
  },
  {
    title: 'Before/After Case Study Graphics',
    description: 'Create visual representations of problems solved (e.g., "Reduced downtime by 95%") to demonstrate value.',
  },
]

const contentStrategy = [
  {
    title: 'Post Regular Tips & Insights',
    description: 'Schedule weekly posts to position as thought leaders and keep the page active.',
    items: [
      '"IT Security Tips for Small Business"',
      '"Ways AI Can Reduce Your IT Costs"',
      '"Common VoIP Mistakes to Avoid"',
      '"Monthly Tech News & Updates"',
    ],
  },
  {
    title: 'Create FAQ Posts',
    description: 'Address common client questions in engaging post format to establish expertise and reduce inquiry volume.',
  },
  {
    title: 'Share Client Success Stories',
    description: 'With permission, post brief testimonials and results (anonymized if needed) to build social proof.',
  },
  {
    title: 'Live Q&A Sessions or Videos',
    description: 'Host monthly "Ask the Expert" sessions about IT topics to build community and engagement.',
  },
]

const trustSignals = [
  {
    title: 'Add Certifications & Awards Section',
    description: 'Display any industry certifications (CompTIA, Microsoft, Cisco, etc.) or local business awards in the About section.',
  },
  {
    title: 'Create Testimonial Highlights',
    description: 'Add a story/highlight dedicated to client reviews and testimonials.',
  },
  {
    title: '"Meet the Team" Post Series',
    description: 'Introduce team members with their expertise and specialties to humanize the business.',
  },
]

const conversionOptimization = [
  {
    title: 'Add a Clear CTA Button',
    description: 'Ensure the "Message" button is prominent and the bio includes "Click to message for a free consultation" language.',
  },
  {
    title: 'Create a "Free Resources" Highlight',
    description: 'Offer downloadable guides to capture leads.',
    items: [
      'IT Security Checklist',
      'Small Business Tech Planning Guide',
      'AI Readiness Assessment (like on their website)',
      'VoIP Buyer\'s Guide',
    ],
  },
  {
    title: 'Add Links to Key Landing Pages',
    description: 'In the Links section, add multiple relevant URLs.',
    items: [
      'Contact/Consultation page',
      'Free Assessment page',
      'Pricing/Services page',
      'Blog or Resources page',
    ],
  },
  {
    title: 'Service Landing Pages',
    description: 'Create posts that link directly to each major service on the website.',
  },
]

const communityBuilding = [
  {
    title: 'Join & Engage in Local Groups',
    description: 'Share helpful advice in Philadelphia small business groups to build authority and drive traffic.',
  },
  {
    title: 'Host Webinars',
    description: 'Promote free educational webinars about IT topics, with sign-ups directly from Facebook.',
  },
  {
    title: 'Partner with Local Businesses',
    description: 'Feature other local service providers and ask for cross-promotion (creates a supportive community feel).',
  },
  {
    title: 'Share Industry News',
    description: 'Curate and comment on relevant tech news to show they\'re current and informed.',
  },
]

const technicalImprovements = [
  {
    title: 'Complete the About Section',
    description: 'Ensure ALL About tabs are filled out.',
    items: [
      'Detailed company story',
      'Hours of operation',
      'Service areas/coverage zones',
      'Payment methods accepted',
      'Response time expectations',
    ],
  },
  {
    title: 'Add Offers/Deals Highlight',
    description: 'Create special Facebook-exclusive promotions to drive page likes and engagement.',
  },
  {
    title: 'Enable Messaging & Response Rate',
    description: 'Make sure they\'re responsive to messages (aim for under 1 hour) and display the response rate badge.',
  },
  {
    title: 'Add a Shop Section',
    description: 'If applicable, sell service packages directly through Facebook (certifications, annual contracts, etc.).',
  },
]

const analytics = [
  {
    title: 'Monitor Insights',
    description: 'Use Facebook Insights to track performance.',
    items: [
      'Which posts get most engagement',
      'When your audience is most active',
      'Which services generate most interest',
      'Follower growth trends',
    ],
  },
  {
    title: 'A/B Test Post Content',
    description: 'Test different post types (videos vs. images vs. carousels) to see what resonates best.',
  },
]

const priorityActions = [
  'Posting regular tips (builds authority & keeps page active)',
  'Adding team photos (builds trust)',
  'Creating a pinned welcome post (ensures first impression is strong)',
  'Adding service-specific graphics (makes the page more visually professional)',
]

const FacebookImprovements = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="Facebook Page Improvements"
        subtitle="Strategic Recommendations for Social Media Growth"
        documentType="Marketing Strategy"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Executive Summary */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" />
      <PageFooter />

      <SectionHeader title="Executive Summary" />

      <Text style={sharedStyles.body}>
        This document outlines strategic improvements for the Penn Tech Solutions Facebook page to increase
        engagement, build trust with potential clients, and drive conversions. The recommendations are
        organized into seven key areas, each designed to strengthen our social media presence and support
        business growth.
      </Text>

      <CalloutBox
        type="success"
        title="Priority Actions"
        text="Start with these four high-impact improvements to quickly enhance your page's effectiveness and professional appearance."
      />

      <View style={styles.priorityBox}>
        {priorityActions.map((action, index) => (
          <View key={index} style={styles.priorityItem}>
            <View style={styles.priorityNumber}>
              <Text style={styles.priorityNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.priorityText}>{action}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Key Areas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>25+</Text>
          <Text style={styles.statLabel}>Recommendations</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Priority Actions</Text>
        </View>
      </View>
    </Page>

    {/* Visual & Branding */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" subtitle="Visual & Branding" />
      <PageFooter />

      <SectionHeader title="Visual & Branding Enhancements" number="01" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        First impressions matter. These visual improvements will make your Facebook page look more professional
        and trustworthy, encouraging visitors to explore your services.
      </Text>

      {visualEnhancements.map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
        </View>
      ))}

      <CalloutBox
        type="info"
        title="Brand Consistency"
        text="All graphics should use Penn Tech Solutions' color scheme (blue primary, cyan accent, dark navy backgrounds) to create a cohesive visual identity across the website and social media."
      />
    </Page>

    {/* Content Strategy */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" subtitle="Content Strategy" />
      <PageFooter />

      <SectionHeader title="Content & Engagement Strategy" number="02" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        Consistent, valuable content positions Penn Tech Solutions as a thought leader and keeps the audience
        engaged. These strategies will help build a loyal following.
      </Text>

      {contentStrategy.map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
          {item.items && (
            <View style={styles.subItems}>
              {item.items.map((subItem, subIndex) => (
                <View key={subIndex} style={styles.subItem}>
                  <Text style={styles.subItemBullet}>•</Text>
                  <Text style={styles.subItemText}>{subItem}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </Page>

    {/* Trust & Credibility */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" subtitle="Trust & Credibility" />
      <PageFooter />

      <SectionHeader title="Trust & Credibility Signals" number="03" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        Building trust is essential for converting social media visitors into clients. These elements demonstrate
        expertise and reliability.
      </Text>

      {trustSignals.map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
        </View>
      ))}

      <QuoteBox
        quote="People do business with people they know, like, and trust. Showing the human side of your business on social media is one of the most effective ways to build that trust."
        author="Social Media Best Practice"
        company="Marketing Industry Standard"
      />

      <SectionHeader title="Conversion Optimization" number="04" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        Turn visitors into leads with clear calls-to-action and valuable resources that capture contact information.
      </Text>

      {conversionOptimization.slice(0, 2).map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
          {item.items && (
            <View style={styles.subItems}>
              {item.items.map((subItem, subIndex) => (
                <View key={subIndex} style={styles.subItem}>
                  <Text style={styles.subItemBullet}>•</Text>
                  <Text style={styles.subItemText}>{subItem}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </Page>

    {/* Conversion continued & Community */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" subtitle="Conversion & Community" />
      <PageFooter />

      {conversionOptimization.slice(2).map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
          {item.items && (
            <View style={styles.subItems}>
              {item.items.map((subItem, subIndex) => (
                <View key={subIndex} style={styles.subItem}>
                  <Text style={styles.subItemBullet}>•</Text>
                  <Text style={styles.subItemText}>{subItem}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <SectionHeader title="Community & Authority Building" number="05" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        Expand reach and establish authority by engaging with the broader Philadelphia business community.
      </Text>

      {communityBuilding.map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
        </View>
      ))}
    </Page>

    {/* Technical & Analytics */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" subtitle="Technical & Analytics" />
      <PageFooter />

      <SectionHeader title="Technical Improvements" number="06" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        Optimize the page's technical settings to maximize visibility and conversion potential.
      </Text>

      {technicalImprovements.map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
          {item.items && (
            <View style={styles.subItems}>
              {item.items.map((subItem, subIndex) => (
                <View key={subIndex} style={styles.subItem}>
                  <Text style={styles.subItemBullet}>•</Text>
                  <Text style={styles.subItemText}>{subItem}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </Page>

    {/* Analytics & Next Steps */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Facebook Improvements" subtitle="Analytics & Next Steps" />
      <PageFooter />

      <SectionHeader title="Analytics & Optimization" number="07" />

      <Text style={[sharedStyles.body, { marginBottom: 16 }]}>
        Track performance and continuously improve based on data-driven insights.
      </Text>

      {analytics.map((item, index) => (
        <View key={index} style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>{item.title}</Text>
          <Text style={styles.improvementDescription}>{item.description}</Text>
          {item.items && (
            <View style={styles.subItems}>
              {item.items.map((subItem, subIndex) => (
                <View key={subIndex} style={styles.subItem}>
                  <Text style={styles.subItemBullet}>•</Text>
                  <Text style={styles.subItemText}>{subItem}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <CalloutBox
        type="warning"
        title="Implementation Recommendation"
        text="Start with the four priority actions identified on the first page. These provide the highest impact with the least effort, establishing a strong foundation before tackling more complex improvements."
      />

      <View style={styles.nextStepsBox}>
        <Text style={styles.nextStepsTitle}>Recommended Implementation Order</Text>
        <View style={styles.nextStepsList}>
          <Text style={styles.nextStepsItem}>1. Visual & Branding (immediate impact)</Text>
          <Text style={styles.nextStepsItem}>2. Technical Improvements (foundation)</Text>
          <Text style={styles.nextStepsItem}>3. Trust Signals (credibility)</Text>
          <Text style={styles.nextStepsItem}>4. Conversion Optimization (leads)</Text>
          <Text style={styles.nextStepsItem}>5. Content Strategy (ongoing)</Text>
          <Text style={styles.nextStepsItem}>6. Community Building (long-term)</Text>
          <Text style={styles.nextStepsItem}>7. Analytics (continuous improvement)</Text>
        </View>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Priority box
  priorityBox: {
    marginBottom: 20,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 6,
  },
  priorityNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  priorityNumberText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  priorityText: {
    flex: 1,
    fontSize: 10,
    color: colors.dark,
  },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 9,
    color: colors.gray,
    marginTop: 4,
  },

  // Improvement card
  improvementCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: 14,
    marginBottom: 12,
  },
  improvementTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
  },
  improvementDescription: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Sub items
  subItems: {
    marginTop: 10,
    paddingLeft: 8,
  },
  subItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  subItemBullet: {
    width: 12,
    fontSize: 10,
    color: colors.accent,
  },
  subItemText: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
  },

  // Next steps box
  nextStepsBox: {
    backgroundColor: colors.dark,
    borderRadius: 8,
    padding: 20,
    marginTop: 16,
  },
  nextStepsTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 12,
  },
  nextStepsList: {
    gap: 6,
  },
  nextStepsItem: {
    fontSize: 10,
    color: colors.grayLight,
  },
})

export default FacebookImprovements
