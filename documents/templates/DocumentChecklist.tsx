import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { colors, sharedStyles } from '../shared/styles'
import {
  CoverPage,
  PageHeader,
  PageFooter,
  SectionHeader,
} from '../shared/components'

// Document data organized by priority and category
const documentCategories = [
  {
    priority: 'Critical',
    priorityColor: '#dc2626',
    description: 'Create these first - you will need them immediately when signing clients',
    documents: [
      {
        name: 'Master Services Agreement (MSA)',
        purpose: 'Main contract template covering terms, liability, payment terms, and legal protections',
        category: 'Client-Facing',
      },
      {
        name: 'Service Level Agreement (SLA)',
        purpose: 'Defines response times, uptime guarantees, support hours, and escalation procedures',
        category: 'Client-Facing',
      },
      {
        name: 'Proposal Template',
        purpose: 'Professional quotes with scope, pricing, timeline - used for every new opportunity',
        category: 'Sales',
      },
      {
        name: 'Statement of Work (SOW)',
        purpose: 'Template for scoping individual projects with deliverables and acceptance criteria',
        category: 'Client-Facing',
      },
    ],
  },
  {
    priority: 'High',
    priorityColor: '#f59e0b',
    description: 'Create these before actively marketing - essential for professional operations',
    documents: [
      {
        name: 'Client Onboarding Packet',
        purpose: 'Welcome document with contacts, portal access, expectations, and getting started guide',
        category: 'Client-Facing',
      },
      {
        name: 'Acceptable Use Policy',
        purpose: 'Defines what clients can and cannot do on systems you manage',
        category: 'Client-Facing',
      },
      {
        name: 'Data Handling Policy',
        purpose: 'Documents how you protect, store, and handle client data',
        category: 'Compliance',
      },
      {
        name: 'One-Page Service Sheets',
        purpose: 'Leave-behind flyers for each service - great for sales meetings',
        category: 'Sales',
      },
      {
        name: 'Network Documentation Template',
        purpose: 'Standardized format for documenting client environments',
        category: 'Operational',
      },
    ],
  },
  {
    priority: 'Medium',
    priorityColor: '#3b82f6',
    description: 'Create these as you grow - important for scaling and compliance',
    documents: [
      {
        name: 'Incident Response Plan',
        purpose: 'Step-by-step procedures when a security event occurs',
        category: 'Compliance',
      },
      {
        name: 'HIPAA Business Associate Agreement',
        purpose: 'Required if serving healthcare clients - legal compliance document',
        category: 'Compliance',
      },
      {
        name: 'Risk Assessment Template',
        purpose: 'Standardized evaluation of client security posture',
        category: 'Compliance',
      },
      {
        name: 'Case Studies',
        purpose: 'Success stories showing ROI and outcomes - powerful sales tool',
        category: 'Sales',
      },
      {
        name: 'Comparison Sheet',
        purpose: 'Why choose you vs. DIY, break-fix, or larger MSPs',
        category: 'Sales',
      },
      {
        name: 'Escalation Procedures',
        purpose: 'Internal document for handling complex issues and when to escalate',
        category: 'Operational',
      },
    ],
  },
  {
    priority: 'Lower',
    priorityColor: '#22c55e',
    description: 'Create these as needed - helpful but not urgent for starting out',
    documents: [
      {
        name: 'ROI/Cost Savings Calculator',
        purpose: 'Shows value of managed services vs. downtime costs - sales tool',
        category: 'Sales',
      },
      {
        name: 'Client Offboarding Checklist',
        purpose: 'Ensures clean handoff if a client leaves - protects both parties',
        category: 'Operational',
      },
      {
        name: 'Disaster Recovery Plan Template',
        purpose: 'Template to create DR plans for clients',
        category: 'Operational',
      },
      {
        name: 'Vendor Management Policy',
        purpose: 'How you evaluate and manage technology vendors',
        category: 'Operational',
      },
    ],
  },
]

const categoryColors: Record<string, string> = {
  'Client-Facing': colors.primary,
  'Sales': '#f59e0b',
  'Compliance': '#dc2626',
  'Operational': '#22c55e',
}

const DocumentChecklist = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="MSP Document Checklist"
        subtitle="Essential Business Documents for Managed Service Providers"
        documentType="Planning Guide"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Overview Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="MSP Document Checklist" />
      <PageFooter />

      <SectionHeader title="Document Overview" />

      <Text style={sharedStyles.body}>
        This checklist outlines the essential documents needed to run a professional MSP business.
        Documents are organized by priority level to help you focus on what matters most when starting out.
      </Text>

      <Text style={[sharedStyles.h3, { marginTop: 16 }]}>Priority Levels</Text>
      <View style={styles.priorityLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
          <Text style={styles.legendLabel}>Critical</Text>
          <Text style={styles.legendDesc}>Need before signing first client</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
          <Text style={styles.legendLabel}>High</Text>
          <Text style={styles.legendDesc}>Need before active marketing</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.legendLabel}>Medium</Text>
          <Text style={styles.legendDesc}>Create as you grow</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.legendLabel}>Lower</Text>
          <Text style={styles.legendDesc}>Create as needed</Text>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Document Categories</Text>
      <View style={styles.categoryLegend}>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryTag, { backgroundColor: colors.primary }]}>
            <Text style={styles.categoryTagText}>Client-Facing</Text>
          </View>
          <Text style={styles.categoryDesc}>Documents clients will see or sign</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryTag, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.categoryTagText}>Sales</Text>
          </View>
          <Text style={styles.categoryDesc}>Marketing and sales materials</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryTag, { backgroundColor: '#dc2626' }]}>
            <Text style={styles.categoryTagText}>Compliance</Text>
          </View>
          <Text style={styles.categoryDesc}>Security and regulatory documents</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryTag, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.categoryTagText}>Operational</Text>
          </View>
          <Text style={styles.categoryDesc}>Internal processes and procedures</Text>
        </View>
      </View>

      <Text style={[sharedStyles.h3, { marginTop: 20 }]}>Summary</Text>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>19</Text>
          <Text style={styles.summaryLabel}>Total Documents</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#dc2626' }]}>4</Text>
          <Text style={styles.summaryLabel}>Critical Priority</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#f59e0b' }]}>5</Text>
          <Text style={styles.summaryLabel}>High Priority</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#3b82f6' }]}>6</Text>
          <Text style={styles.summaryLabel}>Medium Priority</Text>
        </View>
      </View>
    </Page>

    {/* Checklist Pages */}
    {documentCategories.map((category, catIndex) => (
      <Page key={category.priority} size="LETTER" style={sharedStyles.page}>
        <PageHeader title="MSP Document Checklist" subtitle={`${category.priority} Priority`} />
        <PageFooter />

        <View style={[styles.priorityHeader, { borderLeftColor: category.priorityColor }]}>
          <View style={[styles.priorityBadge, { backgroundColor: category.priorityColor }]}>
            <Text style={styles.priorityBadgeText}>{category.priority}</Text>
          </View>
          <Text style={styles.priorityDescription}>{category.description}</Text>
        </View>

        <View style={styles.checklistTable}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: 50 }]}>Created</Text>
            <Text style={[styles.tableHeaderCell, { width: 50 }]}>Reviewed</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Document</Text>
            <Text style={[styles.tableHeaderCell, { width: 70 }]}>Category</Text>
          </View>

          {/* Table Rows */}
          {category.documents.map((doc, docIndex) => (
            <View key={doc.name} style={[styles.tableRow, docIndex % 2 === 0 && styles.tableRowAlt]}>
              <View style={[styles.tableCell, { width: 50 }]}>
                <View style={styles.checkbox} />
              </View>
              <View style={[styles.tableCell, { width: 50 }]}>
                <View style={styles.checkbox} />
              </View>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docPurpose}>{doc.purpose}</Text>
              </View>
              <View style={[styles.tableCell, { width: 70 }]}>
                <View style={[styles.categoryBadge, { backgroundColor: categoryColors[doc.category] || colors.gray }]}>
                  <Text style={styles.categoryBadgeText}>{doc.category}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Notes Section */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Notes</Text>
          <View style={styles.notesLines}>
            <View style={styles.noteLine} />
            <View style={styles.noteLine} />
            <View style={styles.noteLine} />
            <View style={styles.noteLine} />
          </View>
        </View>
      </Page>
    ))}

    {/* Master Checklist Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="MSP Document Checklist" subtitle="Master List" />
      <PageFooter />

      <SectionHeader title="Complete Document List" />

      <Text style={[sharedStyles.body, { marginBottom: 12 }]}>
        All documents listed by priority. Use this page as a quick reference for tracking overall progress.
      </Text>

      <View style={styles.masterList}>
        {documentCategories.map((category) => (
          <View key={category.priority} style={styles.masterCategory}>
            <View style={styles.masterCategoryHeader}>
              <View style={[styles.masterPriorityDot, { backgroundColor: category.priorityColor }]} />
              <Text style={styles.masterCategoryTitle}>{category.priority} Priority</Text>
            </View>
            {category.documents.map((doc) => (
              <View key={doc.name} style={styles.masterItem}>
                <View style={styles.masterCheckbox} />
                <Text style={styles.masterDocName}>{doc.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>

    {/* Tips Page */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="MSP Document Checklist" subtitle="Tips" />
      <PageFooter />

      <SectionHeader title="Document Creation Tips" />

      <View style={styles.tipCard}>
        <Text style={styles.tipNumber}>1</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Start with Templates</Text>
          <Text style={styles.tipText}>
            Don't reinvent the wheel. Look for MSP-specific templates from industry associations,
            vendors, or legal services. Customize them for your business.
          </Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipNumber}>2</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Get Legal Review</Text>
          <Text style={styles.tipText}>
            For contracts (MSA, SLA, SOW), have an attorney review them before use. This protects
            you from liability and ensures enforceability.
          </Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipNumber}>3</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Keep It Simple</Text>
          <Text style={styles.tipText}>
            Documents should be clear and understandable. Avoid jargon where possible. If clients
            can't understand an agreement, they won't trust it.
          </Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipNumber}>4</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Version Control</Text>
          <Text style={styles.tipText}>
            Date your documents and track versions. When you update a template, archive the old
            version and note what changed.
          </Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipNumber}>5</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Review Annually</Text>
          <Text style={styles.tipText}>
            Set a calendar reminder to review all documents yearly. Update for new services,
            changed processes, or legal requirements.
          </Text>
        </View>
      </View>

      <View style={styles.resourceBox}>
        <Text style={styles.resourceTitle}>Helpful Resources</Text>
        <Text style={styles.resourceItem}>+ CompTIA - MSP resources and templates</Text>
        <Text style={styles.resourceItem}>+ ASCII Group - Peer groups and document sharing</Text>
        <Text style={styles.resourceItem}>+ ConnectWise / Datto - Vendor-provided templates</Text>
        <Text style={styles.resourceItem}>+ Local attorney specializing in technology contracts</Text>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Priority legend
  priorityLegend: {
    marginTop: 8,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    width: 60,
  },
  legendDesc: {
    fontSize: 9,
    color: colors.gray,
  },

  // Category legend
  categoryLegend: {
    marginTop: 8,
    gap: 6,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: 80,
  },
  categoryTagText: {
    fontSize: 8,
    color: colors.white,
    textAlign: 'center',
  },
  categoryDesc: {
    fontSize: 9,
    color: colors.gray,
  },

  // Summary grid
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  summaryLabel: {
    fontSize: 8,
    color: colors.gray,
    marginTop: 4,
  },

  // Priority header
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  priorityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  priorityDescription: {
    fontSize: 10,
    color: colors.gray,
    flex: 1,
  },

  // Checklist table
  checklistTable: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tableRowAlt: {
    backgroundColor: '#f8fafc',
  },
  tableCell: {
    justifyContent: 'center',
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: colors.gray,
    borderRadius: 3,
    alignSelf: 'center',
  },
  docName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 2,
  },
  docPurpose: {
    fontSize: 8,
    color: colors.gray,
    lineHeight: 1.4,
  },
  categoryBadge: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  categoryBadgeText: {
    fontSize: 6,
    color: colors.white,
    textAlign: 'center',
  },

  // Notes section
  notesSection: {
    marginTop: 16,
  },
  notesTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },
  notesLines: {
    gap: 12,
  },
  noteLine: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },

  // Master list
  masterList: {
    gap: 12,
  },
  masterCategory: {
    marginBottom: 8,
  },
  masterCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  masterPriorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  masterCategoryTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  masterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 18,
    marginBottom: 4,
  },
  masterCheckbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 2,
  },
  masterDocName: {
    fontSize: 9,
    color: colors.dark,
  },

  // Tip cards
  tipCard: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  tipNumber: {
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
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Resource box
  resourceBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.dark,
    borderRadius: 8,
  },
  resourceTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 10,
  },
  resourceItem: {
    fontSize: 9,
    color: colors.grayLight,
    marginBottom: 4,
  },
})

export default DocumentChecklist
