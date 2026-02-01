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
  TwoColumn,
} from '../shared/components'

// Network component specifications
const firewallRequirements = [
  'Stateful packet inspection (SPI)',
  'Unified Threat Management (UTM) capabilities',
  'Intrusion Detection/Prevention (IDS/IPS)',
  'Content filtering and web blocking',
  'VPN support for remote access',
  'Automatic firmware updates',
  'Real-time threat intelligence feeds',
]

const switchRequirements = [
  'Managed switch with VLAN support',
  'Gigabit ports (minimum)',
  'PoE+ for access points and cameras',
  'Port security and 802.1X support',
  'Link aggregation capability',
  'Remote management interface',
]

const wifiRequirements = [
  'Business-grade access points (not consumer routers)',
  'WPA3 encryption (WPA2 minimum)',
  'Separate SSIDs for business and guest',
  'Band steering (2.4GHz/5GHz)',
  'Client isolation on guest network',
  'Centralized management',
]

const vlanConfig = [
  { vlan: 'VLAN 10', name: 'Management', purpose: 'Network equipment management', security: 'Highly Restricted' },
  { vlan: 'VLAN 20', name: 'Business Operations', purpose: 'Employee workstations, printers', security: 'Standard' },
  { vlan: 'VLAN 30', name: 'Point of Sale', purpose: 'POS terminals, payment processing', security: 'PCI Isolated' },
  { vlan: 'VLAN 40', name: 'Security Systems', purpose: 'Cameras, access control, DVR/NVR', security: 'Restricted' },
  { vlan: 'VLAN 50', name: 'IoT Devices', purpose: 'Smart devices, sensors, thermostats', security: 'Isolated' },
  { vlan: 'VLAN 100', name: 'Guest WiFi', purpose: 'Customer internet access', security: 'Internet Only' },
]

const securityChecklist = [
  { item: 'Business-grade firewall with active subscriptions', critical: true },
  { item: 'Unique, strong passwords on all network equipment', critical: true },
  { item: 'Default credentials changed on all devices', critical: true },
  { item: 'Firmware up to date on all network equipment', critical: true },
  { item: 'POS systems on isolated VLAN', critical: true },
  { item: 'Guest WiFi separated from business network', critical: true },
  { item: 'WPA3/WPA2 encryption on all wireless networks', critical: true },
  { item: 'Remote management disabled or secured via VPN', critical: false },
  { item: 'Unused switch ports disabled', critical: false },
  { item: 'Network monitoring/alerting configured', critical: false },
  { item: 'Automatic backup of firewall configuration', critical: false },
  { item: 'Documented network diagram', critical: false },
]

const commonIssues = [
  { issue: 'Consumer-grade router as primary firewall', risk: 'High', impact: 'No threat protection, easy to compromise' },
  { issue: 'Flat network (no VLANs)', risk: 'High', impact: 'POS breach = total network breach' },
  { issue: 'Default passwords on equipment', risk: 'Critical', impact: 'Trivial unauthorized access' },
  { issue: 'POS on same network as guest WiFi', risk: 'Critical', impact: 'PCI compliance violation, card theft risk' },
  { issue: 'Outdated firmware', risk: 'High', impact: 'Known vulnerabilities exploitable' },
  { issue: 'No backup internet connection', risk: 'Medium', impact: 'Business stops when internet goes down' },
  { issue: 'No network monitoring', risk: 'Medium', impact: 'Issues discovered only when things break' },
]

const NetworkConfigurationPlan = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="Small Business Network Configuration Plan"
        subtitle="Security & Infrastructure Standards for Retail, Restaurant & Service Businesses"
        documentType="Technical Reference"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Executive Summary */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" />
      <PageFooter />

      <SectionHeader title="Executive Summary" />

      <Text style={sharedStyles.body}>
        This document outlines the recommended network infrastructure configuration for small businesses
        such as pet shops, barber shops, salons, restaurants, and retail stores. It serves as a
        benchmark to assess your current network against industry best practices and identify
        critical security gaps.
      </Text>

      <CalloutBox
        type="warning"
        title="Why This Matters"
        text="Small businesses are the #1 target for cyber attacks. 43% of all data breaches involve small businesses, and 60% of small businesses close within 6 months of a cyber attack. A properly configured network is your first line of defense."
      />

      <SectionHeader title="Who This Document Is For" />

      <View style={styles.businessTypeGrid}>
        <View style={styles.businessType}>
          <Text style={styles.businessTypeTitle}>Retail Stores</Text>
          <Text style={styles.businessTypeText}>Pet shops, boutiques, gift shops, convenience stores</Text>
        </View>
        <View style={styles.businessType}>
          <Text style={styles.businessTypeTitle}>Food Service</Text>
          <Text style={styles.businessTypeText}>Restaurants, cafes, bakeries, food trucks with fixed locations</Text>
        </View>
        <View style={styles.businessType}>
          <Text style={styles.businessTypeTitle}>Service Businesses</Text>
          <Text style={styles.businessTypeText}>Barber shops, salons, spas, auto shops, dry cleaners</Text>
        </View>
        <View style={styles.businessType}>
          <Text style={styles.businessTypeTitle}>Professional Offices</Text>
          <Text style={styles.businessTypeText}>Small medical/dental, law offices, accountants, real estate</Text>
        </View>
      </View>

      <SectionHeader title="Network Complexity Levels" />

      <View style={styles.tierContainer}>
        <View style={[styles.tierCard, { borderLeftColor: '#22c55e' }]}>
          <Text style={[styles.tierTitle, { color: '#22c55e' }]}>Basic (1-5 Employees)</Text>
          <Text style={styles.tierDescription}>Single location, basic internet needs, 1-2 POS terminals</Text>
          <View style={styles.tierFeatures}>
            <Text style={styles.tierFeature}>+ Business firewall</Text>
            <Text style={styles.tierFeature}>+ Single managed switch</Text>
            <Text style={styles.tierFeature}>+ 1-2 access points</Text>
            <Text style={styles.tierFeature}>+ Basic VLAN separation</Text>
          </View>
        </View>
        <View style={[styles.tierCard, { borderLeftColor: colors.primary }]}>
          <Text style={[styles.tierTitle, { color: colors.primary }]}>Standard (5-15 Employees)</Text>
          <Text style={styles.tierDescription}>Multiple workstations, security cameras, moderate traffic</Text>
          <View style={styles.tierFeatures}>
            <Text style={styles.tierFeature}>+ UTM firewall with subscriptions</Text>
            <Text style={styles.tierFeature}>+ PoE managed switch</Text>
            <Text style={styles.tierFeature}>+ 2-4 access points</Text>
            <Text style={styles.tierFeature}>+ Full VLAN segmentation</Text>
          </View>
        </View>
        <View style={[styles.tierCard, { borderLeftColor: '#a855f7' }]}>
          <Text style={[styles.tierTitle, { color: '#a855f7' }]}>Advanced (15-50 Employees)</Text>
          <Text style={styles.tierDescription}>Multiple departments, high availability needs, complex security</Text>
          <View style={styles.tierFeatures}>
            <Text style={styles.tierFeature}>+ High-availability firewall</Text>
            <Text style={styles.tierFeature}>+ Stacked/redundant switches</Text>
            <Text style={styles.tierFeature}>+ Controller-based WiFi</Text>
            <Text style={styles.tierFeature}>+ Backup internet failover</Text>
          </View>
        </View>
      </View>
    </Page>

    {/* Internet Connection */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Internet & Perimeter" />
      <PageFooter />

      <SectionHeader title="Internet Connection" number="01" />

      <Text style={sharedStyles.body}>
        Your internet connection is the foundation of your network. Business operations increasingly
        depend on reliable connectivity for POS systems, cloud services, and customer WiFi.
      </Text>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Primary Connection Requirements</Text>
        <View style={styles.specTable}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Type</Text>
            <Text style={styles.specValue}>Business-class fiber or cable (not residential)</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Speed (Minimum)</Text>
            <Text style={styles.specValue}>100 Mbps download / 20 Mbps upload</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Speed (Recommended)</Text>
            <Text style={styles.specValue}>250+ Mbps download / 50+ Mbps upload</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>SLA</Text>
            <Text style={styles.specValue}>Business SLA with guaranteed uptime</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Static IP</Text>
            <Text style={styles.specValue}>At least 1 static IP address</Text>
          </View>
        </View>
      </View>

      <CalloutBox
        type="info"
        title="Why Business-Class Internet?"
        text="Business connections include SLAs (Service Level Agreements) guaranteeing uptime and faster repair times. Residential service has no guarantees and repairs can take days. The cost difference is often only $20-50/month."
      />

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Backup Connection (Recommended)</Text>
        <Text style={[sharedStyles.body, { marginBottom: 8 }]}>
          For businesses where downtime means lost revenue, a backup internet connection provides
          automatic failover when your primary connection goes down.
        </Text>
        <BulletItem text="Different provider than primary (different infrastructure)" />
        <BulletItem text="Can be lower speed (50 Mbps sufficient for failover)" />
        <BulletItem text="4G/5G cellular backup as alternative" />
        <BulletItem text="Automatic failover configured in firewall" />
      </View>

      <SectionHeader title="Firewall / Router" number="02" />

      <Text style={sharedStyles.body}>
        The firewall is the most critical security device in your network. It controls all traffic
        entering and leaving your business. Consumer routers are NOT adequate for business use.
      </Text>

      <View style={styles.comparisonTable}>
        <View style={styles.comparisonHeader}>
          <Text style={[styles.comparisonHeaderCell, { flex: 2 }]}>Feature</Text>
          <Text style={styles.comparisonHeaderCell}>Consumer Router</Text>
          <Text style={styles.comparisonHeaderCell}>Business Firewall</Text>
        </View>
        {[
          { feature: 'Stateful Packet Inspection', consumer: 'Basic', business: 'Advanced' },
          { feature: 'Intrusion Prevention (IPS)', consumer: 'No', business: 'Yes' },
          { feature: 'Content Filtering', consumer: 'No', business: 'Yes' },
          { feature: 'Malware Protection', consumer: 'No', business: 'Yes' },
          { feature: 'VPN Server', consumer: 'Limited', business: 'Full' },
          { feature: 'VLAN Support', consumer: 'No', business: 'Yes' },
          { feature: 'Threat Intelligence', consumer: 'No', business: 'Yes' },
          { feature: 'Reporting/Logging', consumer: 'Minimal', business: 'Comprehensive' },
        ].map((row, index) => (
          <View key={row.feature} style={[styles.comparisonRow, index % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
            <Text style={[styles.comparisonCell, { flex: 2, fontFamily: 'Helvetica-Bold' }]}>{row.feature}</Text>
            <Text style={[styles.comparisonCell, { color: row.consumer === 'No' ? colors.error : colors.gray }]}>{row.consumer}</Text>
            <Text style={[styles.comparisonCell, { color: row.business === 'Yes' ? colors.success : colors.gray }]}>{row.business}</Text>
          </View>
        ))}
      </View>

      <View style={styles.recommendedBrands}>
        <Text style={styles.recommendedTitle}>Recommended Firewall Brands</Text>
        <View style={[sharedStyles.row, { gap: 8, flexWrap: 'wrap' }]}>
          {['SonicWall TZ Series', 'Fortinet FortiGate', 'Cisco Meraki MX', 'Ubiquiti Dream Machine Pro', 'WatchGuard Firebox'].map((brand) => (
            <View key={brand} style={styles.brandTag}>
              <Text style={styles.brandTagText}>{brand}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Wired Network */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Wired Infrastructure" />
      <PageFooter />

      <SectionHeader title="Network Switch" number="03" />

      <Text style={sharedStyles.body}>
        The network switch connects all wired devices in your business. A managed switch is essential
        for proper network segmentation and security.
      </Text>

      <View style={styles.requirementBox}>
        <Text style={styles.requirementTitle}>Managed Switch Requirements</Text>
        {switchRequirements.map((req) => (
          <FeatureItem key={req} text={req} />
        ))}
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Port Planning Guide</Text>
        <View style={styles.specTable}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>POS Terminals</Text>
            <Text style={styles.specValue}>1 port each</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Workstations</Text>
            <Text style={styles.specValue}>1 port each</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Printers</Text>
            <Text style={styles.specValue}>1 port each (wired preferred)</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Access Points</Text>
            <Text style={styles.specValue}>1 PoE port each</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Security Cameras</Text>
            <Text style={styles.specValue}>1 PoE port each</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>DVR/NVR</Text>
            <Text style={styles.specValue}>1 port</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Spare Ports</Text>
            <Text style={styles.specValue}>20% headroom recommended</Text>
          </View>
        </View>
      </View>

      <SectionHeader title="Structured Cabling" number="04" />

      <Text style={sharedStyles.body}>
        Proper cabling infrastructure ensures reliable connectivity and makes future changes easier.
        Poor cabling is a common source of intermittent network issues.
      </Text>

      <TwoColumn
        left={
          <View style={styles.requirementBox}>
            <Text style={styles.requirementTitle}>Cable Standards</Text>
            <BulletItem text="Cat6 minimum (Cat6a preferred)" />
            <BulletItem text="Plenum-rated for ceiling runs" />
            <BulletItem text="Terminated at patch panel" />
            <BulletItem text="Labeled at both ends" />
            <BulletItem text="Tested and certified" />
          </View>
        }
        right={
          <View style={styles.requirementBox}>
            <Text style={styles.requirementTitle}>Best Practices</Text>
            <BulletItem text="Separate from electrical runs" />
            <BulletItem text="No sharp bends (minimum radius)" />
            <BulletItem text="Properly supported in ceiling" />
            <BulletItem text="Avoid running near fluorescents" />
            <BulletItem text="Document all cable paths" />
          </View>
        }
        gap={12}
      />

      <CalloutBox
        type="warning"
        title="Common Cabling Mistakes"
        text="Running network cables alongside electrical wiring causes interference. Using Cat5 instead of Cat6 limits speeds. Loose connections at patch panels cause intermittent issues that are hard to diagnose. Invest in proper cabling installation upfront."
      />

      <View style={styles.recommendedBrands}>
        <Text style={styles.recommendedTitle}>Recommended Switch Brands</Text>
        <View style={[sharedStyles.row, { gap: 8, flexWrap: 'wrap' }]}>
          {['Cisco CBS Series', 'Ubiquiti UniFi', 'Netgear Pro', 'Aruba Instant On', 'Juniper EX Series'].map((brand) => (
            <View key={brand} style={styles.brandTag}>
              <Text style={styles.brandTagText}>{brand}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Wireless Network */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Wireless Infrastructure" />
      <PageFooter />

      <SectionHeader title="WiFi Infrastructure" number="05" />

      <Text style={sharedStyles.body}>
        Business WiFi requires more than a consumer router. Proper coverage, security, and network
        separation are essential for protecting your business while serving customers.
      </Text>

      <View style={styles.requirementBox}>
        <Text style={styles.requirementTitle}>Business WiFi Requirements</Text>
        {wifiRequirements.map((req) => (
          <FeatureItem key={req} text={req} />
        ))}
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Required Wireless Networks (SSIDs)</Text>

        <View style={styles.ssidCard}>
          <View style={styles.ssidHeader}>
            <Text style={styles.ssidName}>BusinessName-Private</Text>
            <View style={[styles.ssidBadge, { backgroundColor: '#dcfce7' }]}>
              <Text style={[styles.ssidBadgeText, { color: '#166534' }]}>Employee Only</Text>
            </View>
          </View>
          <Text style={styles.ssidDescription}>
            For employee devices, POS tablets, back-office computers. WPA3-Enterprise or WPA2-PSK with
            strong password (20+ characters). Connected to business VLAN.
          </Text>
        </View>

        <View style={styles.ssidCard}>
          <View style={styles.ssidHeader}>
            <Text style={styles.ssidName}>BusinessName-Guest</Text>
            <View style={[styles.ssidBadge, { backgroundColor: '#fef3c7' }]}>
              <Text style={[styles.ssidBadgeText, { color: '#92400e' }]}>Customer Access</Text>
            </View>
          </View>
          <Text style={styles.ssidDescription}>
            For customer internet access. Client isolation enabled (guests can't see each other).
            Bandwidth limited. Captive portal optional. Connected to guest VLAN with internet-only access.
          </Text>
        </View>

        <View style={styles.ssidCard}>
          <View style={styles.ssidHeader}>
            <Text style={styles.ssidName}>BusinessName-IoT</Text>
            <View style={[styles.ssidBadge, { backgroundColor: '#e0e7ff' }]}>
              <Text style={[styles.ssidBadgeText, { color: '#3730a3' }]}>Hidden SSID</Text>
            </View>
          </View>
          <Text style={styles.ssidDescription}>
            For smart devices, thermostats, smart displays. Hidden SSID (not broadcast).
            Isolated VLAN with restricted internet access. No access to business network.
          </Text>
        </View>
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Access Point Placement</Text>
        <View style={styles.specTable}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Small Retail (1,000-2,000 sq ft)</Text>
            <Text style={styles.specValue}>1-2 access points</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Medium Retail (2,000-4,000 sq ft)</Text>
            <Text style={styles.specValue}>2-3 access points</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Restaurant (2,000-5,000 sq ft)</Text>
            <Text style={styles.specValue}>2-4 access points</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Warehouse/Open Space</Text>
            <Text style={styles.specValue}>1 AP per 2,500-3,000 sq ft</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Multi-Floor Building</Text>
            <Text style={styles.specValue}>At least 1 AP per floor</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommendedBrands}>
        <Text style={styles.recommendedTitle}>Recommended Access Point Brands</Text>
        <View style={[sharedStyles.row, { gap: 8, flexWrap: 'wrap' }]}>
          {['Ubiquiti UniFi', 'Cisco Meraki', 'Aruba Instant On', 'Ruckus', 'TP-Link Omada'].map((brand) => (
            <View key={brand} style={styles.brandTag}>
              <Text style={styles.brandTagText}>{brand}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Network Segmentation */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Security Architecture" />
      <PageFooter />

      <SectionHeader title="Network Segmentation (VLANs)" number="06" />

      <Text style={sharedStyles.body}>
        Network segmentation using VLANs (Virtual Local Area Networks) is critical for security.
        It prevents a breach in one area from spreading to the entire network—especially important
        for PCI compliance if you accept credit cards.
      </Text>

      <CalloutBox
        type="warning"
        title="PCI-DSS Requirement"
        text="If your business processes credit cards, PCI-DSS requires that payment systems be isolated from the rest of your network. Running POS on the same network as guest WiFi is a compliance violation that can result in fines and loss of card processing ability."
      />

      <View style={styles.vlanTable}>
        <View style={styles.vlanHeader}>
          <Text style={[styles.vlanHeaderCell, { width: 60 }]}>VLAN</Text>
          <Text style={[styles.vlanHeaderCell, { width: 100 }]}>Name</Text>
          <Text style={[styles.vlanHeaderCell, { flex: 1 }]}>Purpose</Text>
          <Text style={[styles.vlanHeaderCell, { width: 80 }]}>Security</Text>
        </View>
        {vlanConfig.map((vlan, index) => (
          <View key={vlan.vlan} style={[styles.vlanRow, index % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
            <Text style={[styles.vlanCell, { width: 60, fontFamily: 'Helvetica-Bold', color: colors.primary }]}>{vlan.vlan}</Text>
            <Text style={[styles.vlanCell, { width: 100, fontFamily: 'Helvetica-Bold' }]}>{vlan.name}</Text>
            <Text style={[styles.vlanCell, { flex: 1 }]}>{vlan.purpose}</Text>
            <View style={[styles.vlanCell, { width: 80 }]}>
              <View style={[styles.securityBadge, {
                backgroundColor: vlan.security === 'PCI Isolated' ? '#fef2f2' :
                               vlan.security === 'Highly Restricted' ? '#fef3c7' :
                               vlan.security === 'Restricted' ? '#fef3c7' :
                               vlan.security === 'Isolated' ? '#e0e7ff' :
                               vlan.security === 'Internet Only' ? '#dcfce7' : '#f1f5f9'
              }]}>
                <Text style={[styles.securityBadgeText, {
                  color: vlan.security === 'PCI Isolated' ? '#991b1b' :
                         vlan.security === 'Highly Restricted' ? '#92400e' :
                         vlan.security === 'Restricted' ? '#92400e' :
                         vlan.security === 'Isolated' ? '#3730a3' :
                         vlan.security === 'Internet Only' ? '#166534' : colors.gray
                }]}>{vlan.security}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Inter-VLAN Access Rules</Text>
        <View style={styles.accessRuleBox}>
          <View style={styles.accessRule}>
            <Text style={styles.accessRuleFrom}>Guest WiFi</Text>
            <Text style={styles.accessRuleArrow}>→</Text>
            <Text style={styles.accessRuleTo}>Internet Only</Text>
            <Text style={styles.accessRuleDesc}>No access to any internal network</Text>
          </View>
          <View style={styles.accessRule}>
            <Text style={styles.accessRuleFrom}>POS Systems</Text>
            <Text style={styles.accessRuleArrow}>→</Text>
            <Text style={styles.accessRuleTo}>Payment Processor</Text>
            <Text style={styles.accessRuleDesc}>Internet access to payment gateway only</Text>
          </View>
          <View style={styles.accessRule}>
            <Text style={styles.accessRuleFrom}>Business Ops</Text>
            <Text style={styles.accessRuleArrow}>→</Text>
            <Text style={styles.accessRuleTo}>Printers, Internet</Text>
            <Text style={styles.accessRuleDesc}>Normal business internet access</Text>
          </View>
          <View style={styles.accessRule}>
            <Text style={styles.accessRuleFrom}>Security Cams</Text>
            <Text style={styles.accessRuleArrow}>→</Text>
            <Text style={styles.accessRuleTo}>NVR + Cloud (optional)</Text>
            <Text style={styles.accessRuleDesc}>Limited to recording and remote view</Text>
          </View>
          <View style={styles.accessRule}>
            <Text style={styles.accessRuleFrom}>IoT Devices</Text>
            <Text style={styles.accessRuleArrow}>→</Text>
            <Text style={styles.accessRuleTo}>Specific Cloud Services</Text>
            <Text style={styles.accessRuleDesc}>Restricted to manufacturer services only</Text>
          </View>
        </View>
      </View>
    </Page>

    {/* Security & Remote Access */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Security & Access" />
      <PageFooter />

      <SectionHeader title="Security Configuration" number="07" />

      <Text style={sharedStyles.body}>
        Beyond network segmentation, proper security configuration ensures your business is
        protected against common threats.
      </Text>

      <View style={styles.securityGrid}>
        <View style={styles.securityItem}>
          <Text style={styles.securityItemTitle}>Firewall Security Services</Text>
          <BulletItem text="Gateway Anti-Virus scanning" />
          <BulletItem text="Intrusion Prevention (IPS)" />
          <BulletItem text="Content filtering (block malicious sites)" />
          <BulletItem text="Geo-IP blocking (block foreign countries)" />
          <BulletItem text="Botnet filtering" />
        </View>
        <View style={styles.securityItem}>
          <Text style={styles.securityItemTitle}>Access Control</Text>
          <BulletItem text="Strong, unique passwords on all devices" />
          <BulletItem text="Change all default credentials" />
          <BulletItem text="Disable unused switch ports" />
          <BulletItem text="MAC filtering where appropriate" />
          <BulletItem text="802.1X authentication (advanced)" />
        </View>
      </View>

      <SectionHeader title="Remote Access" number="08" />

      <Text style={sharedStyles.body}>
        Business owners and IT support need secure remote access to the network. This must be
        done securely to prevent unauthorized access.
      </Text>

      <TwoColumn
        left={
          <View style={[styles.accessMethodCard, { borderLeftColor: colors.success }]}>
            <Text style={[styles.accessMethodTitle, { color: colors.success }]}>Recommended: VPN</Text>
            <Text style={styles.accessMethodDesc}>
              Encrypted tunnel to your network. Requires authentication. Industry standard for remote access.
            </Text>
            <BulletItem text="Site-to-site or client VPN" />
            <BulletItem text="Strong authentication" />
            <BulletItem text="All traffic encrypted" />
          </View>
        }
        right={
          <View style={[styles.accessMethodCard, { borderLeftColor: colors.error }]}>
            <Text style={[styles.accessMethodTitle, { color: colors.error }]}>Avoid: Port Forwarding</Text>
            <Text style={styles.accessMethodDesc}>
              Exposes services directly to internet. Common attack vector. Should only be used when absolutely necessary.
            </Text>
            <BulletItem text="Direct exposure risk" />
            <BulletItem text="No encryption unless service provides it" />
            <BulletItem text="Brute force target" />
          </View>
        }
        gap={12}
      />

      <SectionHeader title="Monitoring & Maintenance" number="09" />

      <Text style={sharedStyles.body}>
        A properly configured network requires ongoing monitoring and maintenance to remain secure
        and reliable.
      </Text>

      <View style={styles.maintenanceGrid}>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Daily</Text>
          <Text style={styles.maintenanceTask}>Automated threat log review</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Weekly</Text>
          <Text style={styles.maintenanceTask}>Check for firmware updates</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Monthly</Text>
          <Text style={styles.maintenanceTask}>Review firewall rules and access logs</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Monthly</Text>
          <Text style={styles.maintenanceTask}>Backup firewall configuration</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Quarterly</Text>
          <Text style={styles.maintenanceTask}>Security subscription renewals check</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Quarterly</Text>
          <Text style={styles.maintenanceTask}>Password rotation for network devices</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Annually</Text>
          <Text style={styles.maintenanceTask}>Full network security audit</Text>
        </View>
        <View style={styles.maintenanceItem}>
          <Text style={styles.maintenanceFreq}>Annually</Text>
          <Text style={styles.maintenanceTask}>Disaster recovery test</Text>
        </View>
      </View>
    </Page>

    {/* Common Issues & Assessment */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Assessment" />
      <PageFooter />

      <SectionHeader title="Common Issues We Find" number="10" />

      <Text style={sharedStyles.body}>
        These are the most common network problems we encounter in small business environments.
        Use this to identify potential issues in your current setup.
      </Text>

      <View style={styles.issueTable}>
        <View style={styles.issueHeader}>
          <Text style={[styles.issueHeaderCell, { flex: 2 }]}>Issue</Text>
          <Text style={styles.issueHeaderCell}>Risk</Text>
          <Text style={[styles.issueHeaderCell, { flex: 2 }]}>Impact</Text>
        </View>
        {commonIssues.map((issue, index) => (
          <View key={issue.issue} style={[styles.issueRow, index % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
            <Text style={[styles.issueCell, { flex: 2 }]}>{issue.issue}</Text>
            <View style={[styles.issueCell]}>
              <View style={[styles.riskBadge, {
                backgroundColor: issue.risk === 'Critical' ? '#fef2f2' :
                               issue.risk === 'High' ? '#fef3c7' : '#e0e7ff'
              }]}>
                <Text style={[styles.riskBadgeText, {
                  color: issue.risk === 'Critical' ? '#991b1b' :
                         issue.risk === 'High' ? '#92400e' : '#3730a3'
                }]}>{issue.risk}</Text>
              </View>
            </View>
            <Text style={[styles.issueCell, { flex: 2 }]}>{issue.impact}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Network Assessment Checklist" number="11" />

      <Text style={sharedStyles.body}>
        Use this checklist to evaluate your current network configuration. Items marked with a
        star are critical security requirements.
      </Text>

      <View style={styles.checklistContainer}>
        {securityChecklist.map((item) => (
          <View key={item.item} style={styles.checklistItem}>
            <View style={styles.checklistBox} />
            <Text style={[styles.checklistText, item.critical && { fontFamily: 'Helvetica-Bold' }]}>
              {item.critical && '★ '}{item.item}
            </Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Contact / Next Steps */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Network Configuration Plan" subtitle="Next Steps" />
      <PageFooter />

      <SectionHeader title="How Does Your Network Compare?" />

      <Text style={sharedStyles.body}>
        After reviewing this document, you likely have a better understanding of what a properly
        configured small business network should look like. The question now is: how does your
        current setup compare?
      </Text>

      <View style={styles.assessmentCta}>
        <Text style={styles.assessmentCtaTitle}>Free Network Assessment</Text>
        <Text style={styles.assessmentCtaText}>
          Penn Tech Solutions offers a complimentary network assessment for small businesses in
          the Greater Philadelphia area. We'll evaluate your current setup against these standards
          and provide a detailed report of findings and recommendations.
        </Text>
        <View style={styles.assessmentCtaFeatures}>
          <FeatureItem text="On-site evaluation of your network infrastructure" />
          <FeatureItem text="Security vulnerability identification" />
          <FeatureItem text="Compliance gap analysis (PCI if applicable)" />
          <FeatureItem text="Written report with prioritized recommendations" />
          <FeatureItem text="No obligation, no pressure" />
        </View>
      </View>

      <View style={styles.contactBox}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactTitle}>Schedule Your Free Assessment</Text>
          <Text style={styles.contactSubtitle}>Takes about 1-2 hours depending on network size</Text>
        </View>
        <View style={styles.contactDetails}>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>info@penntechsolutions.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>(215) 555-1234</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Service Area</Text>
            <Text style={styles.contactValue}>Greater Philadelphia Area</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Website</Text>
            <Text style={styles.contactValue}>penntechsolutions.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.finalNote}>
        <Text style={styles.finalNoteText}>
          Your network is the backbone of your business operations. Don't wait for a breach
          or outage to find out your infrastructure wasn't up to the task.
        </Text>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Business type grid
  businessTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  businessType: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  businessTypeTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  businessTypeText: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Tier cards
  tierContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  tierCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
  },
  tierTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  tierFeatures: {
    marginTop: 4,
  },
  tierFeature: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 2,
  },

  // Subsection
  subsection: {
    marginTop: 16,
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },

  // Spec table
  specTable: {
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 12,
  },
  specRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  specLabel: {
    width: 160,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  specValue: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
  },

  // Comparison table
  comparisonTable: {
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: 8,
  },
  comparisonHeaderCell: {
    flex: 1,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  comparisonCell: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
    textAlign: 'center',
  },

  // Recommended brands
  recommendedBrands: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
  },
  recommendedTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },
  brandTag: {
    backgroundColor: colors.white,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  brandTagText: {
    fontSize: 8,
    color: colors.dark,
  },

  // Requirement box
  requirementBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  requirementTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 10,
  },

  // SSID cards
  ssidCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  ssidHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ssidName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  ssidBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  ssidBadgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
  ssidDescription: {
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // VLAN table
  vlanTable: {
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  vlanHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: 8,
  },
  vlanHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  vlanRow: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  vlanCell: {
    fontSize: 8,
    color: colors.gray,
  },
  securityBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  securityBadgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Access rules
  accessRuleBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 12,
  },
  accessRule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  accessRuleFrom: {
    width: 80,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  accessRuleArrow: {
    fontSize: 10,
    color: colors.primary,
  },
  accessRuleTo: {
    width: 100,
    fontSize: 9,
    color: colors.primary,
  },
  accessRuleDesc: {
    flex: 1,
    fontSize: 8,
    color: colors.gray,
  },

  // Security grid
  securityGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  securityItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  securityItemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },

  // Access method cards
  accessMethodCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
  },
  accessMethodTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  accessMethodDesc: {
    fontSize: 9,
    color: colors.gray,
    marginBottom: 8,
    lineHeight: 1.4,
  },

  // Maintenance grid
  maintenanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  maintenanceItem: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  maintenanceFreq: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    width: 50,
  },
  maintenanceTask: {
    flex: 1,
    fontSize: 8,
    color: colors.gray,
  },

  // Issue table
  issueTable: {
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  issueHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: 8,
  },
  issueHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  issueRow: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  issueCell: {
    flex: 1,
    fontSize: 8,
    color: colors.gray,
  },
  riskBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  riskBadgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Checklist
  checklistContainer: {
    marginTop: 12,
    columnCount: 2,
    columnGap: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  checklistBox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 2,
    marginTop: 1,
  },
  checklistText: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
    lineHeight: 1.4,
  },

  // Assessment CTA
  assessmentCta: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  assessmentCtaTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 8,
  },
  assessmentCtaText: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  assessmentCtaFeatures: {
    marginTop: 8,
  },

  // Contact box
  contactBox: {
    backgroundColor: colors.dark,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  contactHeader: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkLight,
    paddingBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 9,
    color: colors.accent,
  },
  contactDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    width: '45%',
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

  // Final note
  finalNote: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  finalNoteText: {
    fontSize: 10,
    color: '#92400e',
    lineHeight: 1.6,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
})

export default NetworkConfigurationPlan
