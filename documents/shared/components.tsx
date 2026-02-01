import React from 'react'
import path from 'path'
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import { colors, sharedStyles } from './styles'

// Get absolute path to logo
const logoPath = path.join(process.cwd(), 'public', 'images', 'just logo.png')

// Header component with logo for regular pages
export const PageHeader = ({ title, subtitle }: { title?: string; subtitle?: string }) => (
  <View style={styles.header} fixed>
    <View style={styles.headerLeft}>
      <Image src={logoPath} style={styles.headerLogo} />
      <View>
        <Text style={styles.headerCompany}>Penn Tech Solutions</Text>
        <Text style={styles.headerTagline}>Your Local IT Partner</Text>
      </View>
    </View>
    {title && (
      <View style={styles.headerRight}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
    )}
  </View>
)

// Footer component with contact info and page numbers
export const PageFooter = () => (
  <View style={styles.footer} fixed>
    <View style={styles.footerContent}>
      <View style={styles.footerLeft}>
        <Text style={styles.footerText}>Penn Tech Solutions</Text>
        <Text style={styles.footerTextSmall}>Greater Philadelphia Area</Text>
      </View>
      <View style={styles.footerCenter}>
        <Text style={styles.footerText}>info@penntechsolutions.com</Text>
        <Text style={styles.footerTextSmall}>(215) 555-1234</Text>
      </View>
      <View style={styles.footerRight}>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </View>
    </View>
    <View style={styles.footerBar} />
  </View>
)

// Cover page component
export const CoverPage = ({
  title,
  subtitle,
  documentType,
  date
}: {
  title: string
  subtitle?: string
  documentType?: string
  date?: string
}) => (
  <View style={styles.coverContainer}>
    {/* Top gradient bar */}
    <View style={styles.coverTopBar} />

    {/* Main content area */}
    <View style={styles.coverContent}>
      {/* Logo and company name */}
      <View style={styles.coverLogoSection}>
        <Image src={logoPath} style={styles.coverLogo} />
        <Text style={styles.coverCompanyName}>Penn Tech Solutions</Text>
        <Text style={styles.coverTagline}>Your Local IT Partner for Small Businesses</Text>
      </View>

      {/* Document title */}
      <View style={styles.coverTitleSection}>
        {documentType && <Text style={styles.coverDocType}>{documentType}</Text>}
        <Text style={styles.coverTitle}>{title}</Text>
        {subtitle && <Text style={styles.coverSubtitle}>{subtitle}</Text>}
      </View>

      {/* Decorative line */}
      <View style={styles.coverDivider} />

      {/* Contact info */}
      <View style={styles.coverContact}>
        <Text style={styles.coverContactText}>Greater Philadelphia Area</Text>
        <Text style={styles.coverContactText}>Montgomery, Bucks, Chester & Delaware Counties</Text>
        <Text style={styles.coverContactHighlight}>info@penntechsolutions.com | (215) 555-1234</Text>
      </View>

      {/* Date */}
      {date && <Text style={styles.coverDate}>{date}</Text>}
    </View>

    {/* Bottom accent */}
    <View style={styles.coverBottomAccent} />
  </View>
)

// Section header component
export const SectionHeader = ({ title, number }: { title: string; number?: string }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionHeaderLine} />
    <View style={styles.sectionHeaderContent}>
      {number && <Text style={styles.sectionNumber}>{number}</Text>}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  </View>
)

// Feature/benefit list item
export const FeatureItem = ({ text, icon = '+' }: { text: string; icon?: string }) => (
  <View style={sharedStyles.listItem}>
    <Text style={sharedStyles.checkmark}>{icon}</Text>
    <Text style={[sharedStyles.body, { flex: 1, marginBottom: 0 }]}>{text}</Text>
  </View>
)

// Bullet list item
export const BulletItem = ({ text }: { text: string }) => (
  <View style={sharedStyles.listItem}>
    <Text style={sharedStyles.bullet}>•</Text>
    <Text style={[sharedStyles.body, { flex: 1, marginBottom: 0 }]}>{text}</Text>
  </View>
)

// Service card component
export const ServiceCard = ({
  title,
  description,
  features,
  color = colors.primary,
}: {
  title: string
  description: string
  features: string[]
  color?: string
}) => (
  <View style={[styles.serviceCard, { borderLeftColor: color }]}>
    <View style={styles.serviceCardHeader}>
      <Text style={[styles.serviceTitle, { color }]}>{title}</Text>
    </View>
    <Text style={styles.serviceDescription}>{description}</Text>
    <View style={styles.serviceFeatures}>
      {features.map((feature, index) => (
        <View key={index} style={styles.serviceFeature}>
          <Text style={[styles.serviceCheck, { color }]}>+</Text>
          <Text style={styles.serviceFeatureText}>{feature}</Text>
        </View>
      ))}
    </View>
  </View>
)

// Stat/metric box
export const StatBox = ({ value, label, color = colors.primary }: { value: string; label: string; color?: string }) => (
  <View style={styles.statBox}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
)

// Quote/testimonial box
export const QuoteBox = ({ quote, author, company }: { quote: string; author: string; company?: string }) => (
  <View style={styles.quoteBox}>
    <Text style={styles.quoteText}>"{quote}"</Text>
    <View style={styles.quoteAttribution}>
      <Text style={styles.quoteAuthor}>— {author}</Text>
      {company && <Text style={styles.quoteCompany}>{company}</Text>}
    </View>
  </View>
)

// Two column layout helper
export const TwoColumn = ({ left, right, gap = 20 }: { left: React.ReactNode; right: React.ReactNode; gap?: number }) => (
  <View style={[sharedStyles.row, { gap }]}>
    <View style={[sharedStyles.flex1]}>{left}</View>
    <View style={[sharedStyles.flex1]}>{right}</View>
  </View>
)

// Callout box
export const CalloutBox = ({ title, text, type = 'info' }: { title: string; text: string; type?: 'info' | 'success' | 'warning' }) => {
  const bgColors = {
    info: '#eff6ff',
    success: '#f0fdf4',
    warning: '#fffbeb',
  }
  const borderColors = {
    info: colors.primary,
    success: colors.success,
    warning: colors.warning,
  }

  return (
    <View style={[styles.calloutBox, { backgroundColor: bgColors[type], borderLeftColor: borderColors[type] }]}>
      <Text style={[styles.calloutTitle, { color: borderColors[type] }]}>{title}</Text>
      <Text style={styles.calloutText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // Header styles - fixed positioning for double-sided printing
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 20,
    marginTop: -20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  headerCompany: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  headerTagline: {
    fontSize: 8,
    color: colors.grayLight,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 8,
    color: colors.grayLight,
  },

  // Footer styles - fixed positioning for double-sided printing
  footer: {
    position: 'absolute',
    bottom: 36,
    left: 54,
    right: 54,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerLeft: {},
  footerCenter: {
    alignItems: 'center',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerText: {
    fontSize: 8,
    color: colors.gray,
  },
  footerTextSmall: {
    fontSize: 7,
    color: colors.grayLight,
  },
  footerBar: {
    height: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    borderRadius: 2,
  },

  // Cover page styles
  coverContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  coverTopBar: {
    height: 8,
    backgroundColor: colors.primary,
  },
  coverContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  coverLogoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  coverLogo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
  },
  coverCompanyName: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 8,
  },
  coverTagline: {
    fontSize: 14,
    color: colors.accent,
  },
  coverTitleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  coverDocType: {
    fontSize: 12,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  coverTitle: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 16,
    color: colors.grayLight,
    textAlign: 'center',
  },
  coverDivider: {
    width: 80,
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
    marginBottom: 40,
  },
  coverContact: {
    alignItems: 'center',
  },
  coverContactText: {
    fontSize: 11,
    color: colors.grayLight,
    marginBottom: 4,
  },
  coverContactHighlight: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 8,
  },
  coverDate: {
    position: 'absolute',
    bottom: 40,
    fontSize: 10,
    color: colors.grayLight,
  },
  coverBottomAccent: {
    height: 4,
    backgroundColor: colors.accent,
  },

  // Section header styles
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeaderLine: {
    height: 3,
    width: 50,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginBottom: 12,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  sectionNumber: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },

  // Service card styles
  serviceCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 12,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  serviceIcon: {
    fontSize: 18,
  },
  serviceTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  serviceDescription: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  serviceFeatures: {
    marginTop: 8,
  },
  serviceFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  serviceCheck: {
    fontSize: 10,
  },
  serviceFeatureText: {
    fontSize: 9,
    color: colors.gray,
  },

  // Stat box styles
  statBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
  },
  statLabel: {
    fontSize: 9,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 4,
  },

  // Quote box styles
  quoteBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    padding: 16,
    marginVertical: 12,
  },
  quoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: colors.dark,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  quoteAttribution: {
    flexDirection: 'row',
    gap: 8,
  },
  quoteAuthor: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray,
  },
  quoteCompany: {
    fontSize: 9,
    color: colors.grayLight,
  },

  // Callout box styles
  calloutBox: {
    borderLeftWidth: 4,
    borderRadius: 4,
    padding: 12,
    marginVertical: 12,
  },
  calloutTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.5,
  },
})
