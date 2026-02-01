import { StyleSheet } from '@react-pdf/renderer'

// Penn Tech Solutions Brand Colors
export const colors = {
  // Primary brand colors
  primary: '#3b82f6',      // Blue
  primaryDark: '#2563eb',
  primaryLight: '#60a5fa',

  // Accent colors
  accent: '#06b6d4',       // Cyan
  accentDark: '#0891b2',
  accentLight: '#22d3ee',

  // Dark theme colors (matching website)
  dark: '#0f172a',         // dark-900
  darkLight: '#1e293b',    // dark-800
  darkLighter: '#334155',  // dark-700

  // Neutral colors
  white: '#ffffff',
  gray: '#64748b',
  grayLight: '#94a3b8',
  grayLighter: '#cbd5e1',

  // Semantic colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',

  // Service category colors
  voip: '#3b82f6',         // Blue
  network: '#a855f7',      // Purple
  pos: '#22c55e',          // Green
  websites: '#f59e0b',     // Orange
  security: '#ef4444',     // Red
  dataProtection: '#dc2626', // Deep red
  equipment: '#8b5cf6',    // Indigo
  development: '#06b6d4',  // Cyan
  ai: '#ec4899',           // Pink
}

// Shared styles used across all PDF documents
// Double-sided printing: Using consistent 0.75" margins with extra space for binding
export const sharedStyles = StyleSheet.create({
  // Page layouts - optimized for double-sided printing
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingLeft: 54,       // 0.75" - standard margin
    paddingRight: 54,      // 0.75" - standard margin
    paddingTop: 72,        // 1" top for header
    paddingBottom: 90,     // 1.25" bottom for footer
    fontFamily: 'Helvetica',
  },
  coverPage: {
    flexDirection: 'column',
    backgroundColor: colors.dark,
    padding: 0,
  },

  // Typography
  h1: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 16,
  },
  h2: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 12,
  },
  h3: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },
  h4: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
  },
  body: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  bodyLarge: {
    fontSize: 11,
    color: colors.gray,
    lineHeight: 1.7,
    marginBottom: 14,
  },
  bodySmall: {
    fontSize: 9,
    color: colors.grayLight,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: 8,
    color: colors.grayLight,
    lineHeight: 1.4,
  },

  // Layout helpers
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  flex1: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },

  // Spacing
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
  mt24: { marginTop: 24 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },

  // List styles
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 4,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: colors.primary,
  },
  checkmark: {
    width: 16,
    fontSize: 10,
    color: colors.primary,
  },

  // Card styles
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardBordered: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  dividerThick: {
    height: 3,
    backgroundColor: colors.primary,
    width: 50,
    borderRadius: 2,
    marginBottom: 12,
  },

  // Accent elements
  accentBar: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  accentBarCyan: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },

  // Badge/tag styles
  tag: {
    backgroundColor: '#eff6ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 9,
    color: colors.primary,
  },

  // Gradient text simulation (using primary color)
  gradientText: {
    color: colors.primary,
    fontFamily: 'Helvetica-Bold',
  },
})

// Service-specific color mappings
export const serviceColors: Record<string, string> = {
  'Cloud VoIP & Telecom': colors.voip,
  'Network Infrastructure': colors.network,
  'Point of Sale Systems': colors.pos,
  'Professional Websites': colors.websites,
  'Security Systems': colors.security,
  'Anti-Virus & Data Protection': colors.dataProtection,
  'Equipment Procurement': colors.equipment,
  'Custom App Development': colors.development,
  'AI Business Integration': colors.ai,
}

// Utility function to get color for a service
export function getServiceColor(serviceName: string): string {
  return serviceColors[serviceName] || colors.primary
}
