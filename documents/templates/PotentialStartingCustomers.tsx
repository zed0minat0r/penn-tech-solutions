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
} from '../shared/components'

// All prospects with full details - sorted by priority (Critical, High, Medium)
const allProspects = [
  // ==================== CRITICAL PRIORITY (2) ====================
  {
    name: 'Living In Phoenixville',
    owner: 'Brian Slater',
    business: 'CENTURY 21 Norris-Valley Forge (Real Estate)',
    website: 'livinginphoenixville.com',
    phone: '(610) 933-8600',
    email: '',
    linkedin: 'linkedin.com/in/brian-slater-crb-crs-935969b',
    address: 'Phoenixville, PA',
    issue: 'SSL Certificate Expired',
    issueDetail: 'Website shows "Not Secure" warning to all visitors. Browsers display security warning, Google penalizes SEO rankings, visitors bounce immediately. Any form submissions are sent unencrypted.',
    background: [
      'Broker/Owner of CENTURY 21 Norris-Valley Forge',
      '20+ years in real estate industry',
      'Originally from the United Kingdom',
      'Chair of Phoenixville Historical Architectural Review Board',
      'Treasurer of Citizen Advocacy of Chester County',
      'Prominent local figure with strong community ties',
    ],
    pitchAngle: 'Lead with the urgent SSL issue. Offer free diagnosis. This is actively costing him leads every single day. Once trust is established, this could lead to a full website redesign since the site design is also outdated.',
    estimatedValue: '$100-250 (SSL fix) to $3,000-5,000 (full redesign)',
    script: "Hi Brian, I'm Matthew with Penn Tech Solutions - a local IT company here in Phoenixville. I was looking at local real estate resources and noticed your Living In Phoenixville website is showing a security warning to visitors. Your SSL certificate has expired, which means Google is penalizing your search rankings and visitors see a 'Not Secure' warning. I'd be happy to take a quick look and get that fixed for you - no charge for the diagnosis. Give me a call when you have a moment.",
    priority: 'Critical',
    urgency: 'Every day without SSL: Google demotes rankings, 85% of visitors leave at security warning, form data is unencrypted. This is an emergency for a lead-generation site.',
  },
  {
    name: 'Level Seven Salon',
    owner: 'Michelle Wigg',
    business: 'Hair Salon & Spa',
    website: 'levelsevensalon.com',
    phone: '(484) 302-5951',
    email: '',
    linkedin: '',
    address: '427 Schuylkill Road, Phoenixville, PA 19460',
    issue: 'SSL Certificate Expired',
    issueDetail: 'Website shows "Not Secure" warning to all visitors. For a business that relies on personal trust and appearance, this security warning immediately undermines credibility. Potential clients see a red flag before they even see your work.',
    background: [
      'Full-service hair salon on Schuylkill Road',
      'Owner Michelle Wigg leads the team',
      'Offers cuts, color, styling, and spa services',
      'Serves the Phoenixville and surrounding communities',
      'Relies heavily on local clientele and referrals',
      'Personal service industry where trust is paramount',
    ],
    pitchAngle: "An SSL issue is critical for a personal service business like a salon. When someone is choosing where to get their hair done, they're looking for trust and professionalism. A 'Not Secure' warning makes them question everything. This is an urgent, easy-to-explain problem with a quick fix.",
    estimatedValue: '$100-250 (SSL fix) to $2,500-4,000 (full redesign)',
    script: "Hi Michelle, I'm Matthew with Penn Tech Solutions - a local IT company here in Phoenixville. I was looking at local salons and noticed your Level Seven website is showing a security warning to visitors. Your SSL certificate has expired, which means anyone who visits sees 'Not Secure' right at the top. For a salon, where trust and first impressions matter so much, that's really hurting you. I'd be happy to take a quick look and get that fixed - no charge for the diagnosis. When would be a good time to chat?",
    priority: 'Critical',
    urgency: 'Every visitor sees "Not Secure" warning. For a personal service business built on trust and aesthetics, this is devastating. Potential clients bounce before seeing your work.',
  },
  // ==================== HIGH PRIORITY (5) ====================
  {
    name: "Clark's Auto Repair",
    owner: 'Ladd Clark',
    business: 'Auto Repair Shop',
    website: 'clarksautorepair.net',
    phone: '(610) 933-4277',
    email: 'info@clarksautorepair.net',
    linkedin: '',
    address: '1433 Pawlings Road, Phoenixville, PA 19460',
    issue: 'Outdated WordPress Site',
    issueDetail: 'Website built on outdated WordPress with old plugins and bloated code. Uses Revolution Slider (dated technology). Heavy inline JavaScript suggests years without proper maintenance. Not optimized for mobile users.',
    background: [
      'Family-owned and operated auto repair shop',
      'Owner Ladd Clark treats customers "like family"',
      'Honda and Acura specialists, but service all makes/models',
      'Recently moved to new location on Pawlings Road',
      'Staff includes Ladd, Jamie, Rob, Brady, and Izzy',
      'Strong local reputation for honest service',
    ],
    pitchAngle: 'Website looks dated and is likely not mobile-friendly. Over 60% of "auto repair near me" searches happen on phones. Offer a free website audit to show them what customers actually see on mobile devices.',
    estimatedValue: '$2,500-4,000',
    script: "Hi Ladd, I'm Matthew with Penn Tech Solutions, a local IT company. I drive by your shop all the time and finally looked up your website. I noticed it might benefit from some updates - it looks like it was built a few years back. These days, most people search for auto repair on their phones, and Google actually penalizes sites that aren't mobile-friendly. I'd be happy to do a free website audit if you're interested - just to show you what customers see when they find you online.",
    priority: 'High',
    urgency: 'Mobile searches for "auto repair near me" are massive. An outdated, non-mobile-friendly site means lost customers going to competitors.',
  },
  {
    name: 'Gateway Pharmacy',
    owner: 'Mark Szilagyi',
    business: 'Independent Pharmacy (President)',
    website: 'thegatewaypharmacy.com',
    phone: '(610) 933-2609',
    email: 'customscripts165@gmail.com',
    linkedin: '',
    address: '165 Nutt Road, Phoenixville, PA 19460',
    issue: 'Dated Website Design (2016-2019 Era)',
    issueDetail: 'Website uses template-based builder from mid-2010s. Lacks modern polish and responsive design sophistication. Design does not reflect the quality and heritage of a 70+ year old family business. Basic mobile support but not mobile-first.',
    background: [
      'Family-owned pharmacy since the 1950s - over 70 years in business',
      'Mark Szilagyi serves as President',
      '4 employees on staff',
      'Full-service pharmacy with compounding capabilities',
      'Offers home medical equipment sales, rentals, repairs',
      'Provides immunizations and has blood draw lab on site',
      'Strong community institution with multi-generational customers',
    ],
    pitchAngle: "Their website doesn't reflect the quality and trust of a 70+ year family legacy. A pharmacy that's been serving families for generations deserves a website that tells that story. Also potential for HIPAA-compliant network security and POS/inventory systems.",
    estimatedValue: '$3,000-5,000+ (website) plus potential ongoing IT services',
    script: "Hi, I'm Matthew with Penn Tech Solutions - we're a local IT company here in Phoenixville. Gateway Pharmacy has been a community staple for over 70 years, and I think your online presence could better reflect that legacy. Your current website looks like it was built several years ago, and it might not be giving customers the full picture of everything you offer. I'd love to chat about how a modern website could help you reach more of the community. Would you have a few minutes this week?",
    priority: 'High',
    urgency: 'Independent pharmacies compete against chains with massive marketing budgets. A professional web presence is essential for survival and growth.',
  },
  {
    name: 'Victor James Plumbing & Heating',
    owner: 'Victor James Kuvlesky',
    business: 'Plumbing & HVAC Contractor',
    website: 'vjph.com',
    phone: '(610) 933-1413',
    email: '',
    linkedin: '',
    address: '335 Schuylkill Road, Phoenixville, PA 19460',
    issue: 'Very Outdated Website (2010-2014 Era)',
    issueDetail: 'Website appears frozen in time from early 2010s. Uses Flash-era slideshow techniques, manual image arrays, and table-based navigation. No mobile optimization whatsoever. Legacy Google Analytics code. This is one of the most obviously outdated sites in the area.',
    background: [
      'Established in 1987 - nearly 40 years in business',
      'Victor started working in plumbing at age 15',
      'Got his Masters license at age 27 and started the company',
      'Full-service plumbing and heating contractor',
      'Serves Phoenixville, Collegeville, Exton, and surrounding areas',
      'Known for quality work at competitive rates',
      'Secondary phone: (610) 948-3080',
    ],
    pitchAngle: "This website looks like it hasn't been touched in 10-15 years. It's one of the most obviously outdated in the area - a clear before/after opportunity. Mobile users (majority of searches) have a terrible experience. Victor has nearly 40 years of experience that deserves a proper online showcase.",
    estimatedValue: '$2,500-4,000',
    script: "Hi Victor, I'm Matthew with Penn Tech Solutions, a local IT company. I came across your website while researching local businesses, and I have to be honest - it looks like it might not have been updated in quite a while. You've been in business for almost 40 years, which is incredible, but your website doesn't show that. Most people now search for plumbers on their phones, and your site doesn't work well on mobile. I'd love to help you get a website that matches the quality of your reputation. Can I show you what I mean?",
    priority: 'High',
    urgency: 'Plumbing searches are extremely local and mobile-heavy. "Plumber near me" is a high-intent search. An outdated site loses jobs to competitors with modern sites.',
  },
  {
    name: 'Advanced Dentistry of Phoenixville',
    owner: 'Dr. Dilip Dudhat',
    business: 'Multi-Doctor Dental Practice',
    website: 'phoenixvilledentistry.com',
    phone: '(610) 935-7509',
    email: '',
    linkedin: '',
    address: '119 Nutt Road, Phoenixville, PA 19460',
    issue: 'Outdated Website Design (2012-2016 Era)',
    issueDetail: 'Website relies on outdated jQuery plugins (owlCarousel, datetimepicker) and legacy code patterns from mid-2010s. Poor mobile responsiveness despite mobile being critical for healthcare searches. Design does not reflect the premium, advanced services offered.',
    background: [
      'Dr. Dilip Dudhat founded practice - DMD from Temple University 1996',
      'Multi-doctor practice with 5 dentists on staff',
      'Dr. Chris Walinski: 25+ years experience, dental author, laser pioneer',
      'Premium services: implants, LANAP laser therapy, Invisalign, All-on-4',
      'Part of Dudhat Dental Group serving Greater Philadelphia',
      'Advanced technology but website does not showcase it',
    ],
    pitchAngle: "This is a premium dental practice with advanced services (laser therapy, implants, Invisalign) and multiple experienced doctors - but their website looks like it's from 2014. There's a huge gap between the quality of care they provide and how they present online. Patients researching dentists will judge the practice by the website first.",
    estimatedValue: '$4,000-6,000',
    script: "Hi, I'm looking to speak with Dr. Dudhat or the office manager. I'm Matthew with Penn Tech Solutions, a local IT company. I was researching dental practices in the area and came across your website. Advanced Dentistry clearly offers premium services - implants, laser therapy, Invisalign - with experienced doctors like Dr. Walinski. But honestly, your website doesn't show that. It looks like it was built maybe 10 years ago, and most people searching for a dentist today are on their phones. A modern website could really help showcase all the advanced care you provide. Would someone have a few minutes to discuss this?",
    priority: 'High',
    urgency: 'Dental practices live and die by online presence. Patients heavily research before choosing a dentist. A dated website makes even premium services look outdated. Mobile searches for "dentist near me" are massive.',
  },
  {
    name: 'DiGiacomo & Associates Insurance',
    owner: 'Michael DiGiacomo',
    business: 'Insurance Agency',
    website: 'madigiacomo.com',
    phone: '(610) 935-8900',
    email: 'mdigiacomo@madigiacomo.com',
    linkedin: '',
    address: '221 Bridge Street, Phoenixville, PA 19460',
    issue: 'Outdated Website Design',
    issueDetail: 'Website uses dated template design that does not reflect a modern, trustworthy insurance agency. Layout and styling are from mid-2010s era. For a business on Bridge Street, the web presence should match the vibrant downtown energy.',
    background: [
      'Independent insurance agency on Bridge Street',
      'Owner Michael DiGiacomo leads the practice',
      'Offers home, auto, business, and life insurance',
      'Prime Bridge Street location with walk-in traffic',
      'Local independent agency competing against online insurers',
      'Trust and personal relationships are key differentiators',
    ],
    pitchAngle: "Insurance is a trust business - people need to feel confident handing over their financial protection. A dated website can make potential clients wonder if the agency is keeping up with the industry. Also, being on Bridge Street means Matthew can easily walk in and introduce himself.",
    estimatedValue: '$2,500-4,000',
    script: "Hi Michael, I'm Matthew with Penn Tech Solutions - I'm actually right here on Bridge Street frequently. I noticed your website and thought it might be time for an update. Insurance is all about trust, and your website is often the first impression people get. The current design looks a few years old, and with everyone comparing insurance options online these days, a modern website could really help you stand out from the big online carriers. Would you have a few minutes to chat about what a refresh might look like?",
    priority: 'High',
    urgency: 'Insurance shoppers compare online heavily. A dated website makes an independent agency look less professional than corporate competitors. Bridge Street location makes in-person visit easy.',
  },
  // ==================== MEDIUM PRIORITY (5) ====================
  {
    name: 'Chiro-Care Health & Massage Center',
    owner: 'Dr. Imran Ahmed',
    business: 'Chiropractic & Wellness Practice',
    website: 'chirocareandmassagepa.com',
    phone: '(610) 933-6500',
    email: '',
    linkedin: '',
    address: '629 Schuylkill Road, Phoenixville, PA 19460',
    issue: 'Early 2010s Template Design',
    issueDetail: 'Website uses dated template with old color schemes and typography. Verbose, text-heavy layout without modern UX patterns. Static image sliders with basic functionality. Has some modern backend integrations but frontend presentation is outdated.',
    background: [
      'Dr. Imran Ahmed has 20+ years in chiropractic profession',
      'Grew up in a family of physicians',
      'Bachelors in Biology and Doctorate from NY Chiropractic College',
      'Services: Chiropractic, Massage Therapy, Physical Therapy',
      'Also offers Nutritional Assessment and CBD products',
      'Personalized treatment approach for each patient',
      'Fax: (610) 933-1519',
    ],
    pitchAngle: 'Healthcare websites need to convey trust, professionalism, and calm. The current dated design may not inspire confidence in potential patients. A modern, clean website with easy online booking could increase appointments.',
    estimatedValue: '$3,000-5,000',
    script: "Hi, I'm looking to speak with Dr. Ahmed. I'm Matthew with Penn Tech Solutions, a local IT company. I was researching healthcare providers in the area and came across your website. For a practice that's been serving patients for over 20 years, I think your online presence could better reflect your expertise. Healthcare websites really need to convey trust and professionalism, and a modern design with easy online booking could help you attract more patients. Would Dr. Ahmed have a few minutes to discuss this?",
    priority: 'Medium',
    urgency: 'Patients research healthcare providers online before booking. A dated website can make a practice seem behind the times.',
  },
  {
    name: 'Valley Forge Trattoria & Lounge',
    owner: 'Chronis Sapalidis',
    business: 'Italian Restaurant',
    website: 'valleyforgepizza.com',
    phone: '(610) 935-7579',
    email: '',
    linkedin: '',
    address: '1130 Valley Forge Road, Phoenixville, PA 19460',
    issue: '5-10 Year Old Website Design',
    issueDetail: 'Website uses jQuery Owl Carousel (circa 2013), basic HTML structure, and lacks contemporary UX patterns. Design is functional but uninspired. Does not showcase food in an appetizing, modern way. Copyright shows 2023 but design is clearly older.',
    background: [
      'Owner Chronis Sapalidis is from northern Greece',
      'Family has been in food service for over 35 years',
      'Chronis has business degree from French university',
      'Opened Valley Forge Trattoria in May 1996 - nearly 30 years ago',
      'Award-winning pastas and pizzas with proprietary sauces',
      'Made-to-order salads, finger foods, gourmet paninis',
      'Strong local following and repeat customers',
    ],
    pitchAngle: "Restaurant websites need to make people hungry. The current site doesn't showcase the food in an appetizing way. For a restaurant that's been successful for nearly 30 years with award-winning dishes, the website should make mouths water. Also potential for POS system discussion.",
    estimatedValue: '$2,500-4,000 (website) plus potential POS services',
    script: "Hi, is Chronis available? I'm Matthew with Penn Tech Solutions, a local IT company. I've eaten at Valley Forge Trattoria and the food is fantastic - you've clearly been doing something right for almost 30 years. But I noticed your website doesn't really show off how good the food is. Restaurant websites should make people hungry, and I think yours could do a much better job of that. A modern site with great food photography could bring in more customers who've never tried you before. Would you have a few minutes to chat about it?",
    priority: 'Medium',
    urgency: 'Restaurant discovery is heavily online now. Instagram-worthy food photography and modern design drive new customer visits.',
  },
  {
    name: 'John A. Maleno CPA',
    owner: 'John A. Maleno',
    business: 'Certified Public Accountant',
    website: 'maleno-cpa.com',
    phone: '(484) 997-6929',
    email: '',
    linkedin: '',
    address: '345 Main Street, 2nd Floor, Suite 103, Harleysville, PA 19438',
    issue: '2012-2015 Era Website Design',
    issueDetail: 'Website uses image-based graphics for bullets and decorations (outdated practice). Legacy Google Analytics code that has not been updated. Rigid, fixed-width layout structure. Navigation is overly nested and verbose. Overall aesthetic is trapped in early 2010s.',
    background: [
      'Established CPA practice serving Montgomery and Bucks County',
      'Member of PICPA (Pennsylvania Institute of CPAs)',
      'Member of AICPA (American Institute of CPAs)',
      'Services: Tax returns, accounting, bookkeeping',
      'Also: Business formations, IRS audit support, QuickBooks advice',
      'Focus on small business accounting',
      'Recently promoted expertise in 2025 tax law changes',
    ],
    pitchAngle: 'CPAs need websites that project professionalism and trustworthiness. People are handing over their most sensitive financial information - the website needs to inspire confidence. The current dated design may make potential clients question if the practice is keeping up with changing tax laws.',
    estimatedValue: '$2,500-4,000',
    script: "Hi John, I'm Matthew with Penn Tech Solutions, a local IT company. I came across your website while researching local CPAs. You clearly have strong credentials with your PICPA and AICPA memberships, but I think your website might be underselling you. When people are choosing who to trust with their taxes and finances, the website really matters. Yours looks like it was built maybe 10 years ago. I'd be happy to show you what a modern CPA website looks like and how it could help you attract more clients. Do you have a few minutes?",
    priority: 'Medium',
    urgency: 'Tax season is a key time to discuss this. People actively search for CPAs in Q1. A professional website builds trust for sensitive financial relationships.',
  },
  {
    name: 'EP Caine & Associates CPA',
    owner: 'Edward P. Caine',
    business: 'CPA Firm',
    website: 'cainecpa.com',
    phone: '(610) 525-2933',
    email: 'ecaine@cainecpa.com',
    linkedin: '',
    address: '175 Strafford Ave #200, Wayne, PA 19087',
    issue: 'Outdated WordPress with Old Plugins',
    issueDetail: 'Website runs on aging WordPress installation with Revolution Slider (dated plugin). Heavy use of legacy code patterns. Mid-2010s template design. Copyright placeholder suggests minimal maintenance. Does not reflect the exceptional credentials of the owner.',
    background: [
      'Edward P. Caine has exceptional credentials',
      'National President of NCCPAP (2nd largest CPA org in US)',
      'Listed as one of 100 most influential CPAs in the country',
      'Member of IRS National Public Liaison Committee (meets monthly in DC)',
      'Listed in Marquis "Who\'s Who in America"',
      'Member of Beta Alpha Psi (National Honorary Accounting Fraternity)',
      'Offers free first consultation',
    ],
    pitchAngle: "This is a high-value prospect with incredible credentials that his website doesn't showcase. A National President of a major CPA organization, one of the 100 most influential CPAs in the country, should have a website that reflects that stature. The gap between his reputation and his web presence is significant.",
    estimatedValue: '$4,000-7,000 (premium redesign)',
    script: "Hi, I'm trying to reach Edward Caine. I'm Matthew with Penn Tech Solutions. Mr. Caine, I have to be direct with you - I was researching local CPAs and discovered your incredible credentials. National President of NCCPAP, one of the 100 most influential CPAs in the country, member of the IRS National Public Liaison Committee. That's extraordinary. But your website doesn't come close to reflecting that level of accomplishment. I think you deserve a web presence that matches your reputation. Would you be open to a conversation about that?",
    priority: 'Medium',
    urgency: 'High-value prospect. The contrast between his credentials and website creates a compelling pitch. May be harder to reach but worth the effort.',
  },
  {
    name: "My Dad's Flooring",
    owner: 'Ed Graefe',
    business: 'Flooring Showroom & Installation',
    website: 'mydadsflooring.com',
    phone: '(610) 935-2226',
    email: '',
    linkedin: '',
    address: '609 Bridge Street, Phoenixville, PA 19460',
    issue: 'IT Services Opportunity (Website is Modern)',
    issueDetail: "Website is actually modern and well-designed - NOT a website prospect. However, as Matthew's direct neighbor (right across the street from office), this is a prime relationship-building opportunity for IT services: network setup, VoIP phones, security cameras, POS systems, backup solutions.",
    background: [
      'Family-owned flooring showroom on Bridge Street',
      'Owner Ed Graefe runs the business',
      'Full flooring services: hardwood, carpet, tile, vinyl',
      'Large showroom requires reliable network infrastructure',
      'Directly across the street from Penn Tech Solutions office',
      'Prime opportunity for neighbor relationship and referrals',
    ],
    pitchAngle: "This is NOT a website prospect - their site is modern. Instead, focus on being a good neighbor and building a relationship. A flooring showroom likely needs: reliable WiFi for the showroom, VoIP phone system, security cameras, POS integration, data backup. Be helpful first, business follows.",
    estimatedValue: '$1,500-5,000+ (IT services: network, VoIP, security)',
    script: "Hi Ed, I'm Matthew - I just opened Penn Tech Solutions right across the street from you. I wanted to introduce myself and say hello to a fellow Bridge Street business. I do IT support for local businesses - things like networks, phones, security cameras, that kind of thing. Not trying to sell you anything today, just wanted to meet my neighbor. If you ever have any tech headaches, I'm literally right across the street. Here's my card.",
    priority: 'Medium',
    urgency: 'Neighbor relationship - no pressure. Build rapport first. A flooring showroom has IT needs, but the relationship is the priority. Could become a great referral source for other local businesses.',
  },
]

// Walk-in targets on Bridge Street
const walkInTargets = [
  { name: 'Avani del Amour', address: '101 Bridge St' },
  { name: 'Here & Now Crafts', address: '241 Bridge St' },
  { name: "Maddie's Castle", address: '178 Bridge St' },
  { name: 'Perch Plants', address: '22 Main St' },
  { name: 'Refinery', address: '131 Bridge St' },
  { name: 'Studio 323', address: '323 Bridge St' },
  { name: 'TC House of Style', address: '174 Bridge St' },
  { name: "Weitzenkorns Men's Store", address: '220 Bridge St' },
  { name: 'Grey & Co. Interiors', address: '183 Bridge St' },
  { name: 'Jacaranda Gifts', address: '164 Bridge St' },
  { name: 'The Record Shop', address: '110 Bridge St' },
]

// Marketing channels
const marketingChannels = [
  { channel: 'Walk Bridge Street', effort: 'Low', cost: 'Free', timeframe: 'This Week' },
  { channel: 'Phoenixville Chamber of Commerce', effort: 'Low', cost: '$200-400/yr', timeframe: 'This Month' },
  { channel: 'Google Business Profile', effort: 'Low', cost: 'Free', timeframe: 'Today' },
  { channel: 'Free Network Health Checks', effort: 'Medium', cost: 'Time Only', timeframe: 'Ongoing' },
  { channel: 'Phoenixville First Fridays', effort: 'Medium', cost: 'Free', timeframe: 'Monthly' },
  { channel: 'Referral Requests', effort: 'Low', cost: 'Free', timeframe: 'This Week' },
]

const PotentialStartingCustomers = () => (
  <Document>
    {/* Cover Page */}
    <Page size="LETTER" style={sharedStyles.coverPage}>
      <CoverPage
        title="Potential Starting Customers"
        subtitle="Phoenixville Area Prospects & Outreach Strategy"
        documentType="Internal Sales Document"
        date={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />
    </Page>

    {/* Executive Summary */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Potential Starting Customers" />
      <PageFooter />

      <SectionHeader title="Executive Summary" />

      <Text style={sharedStyles.body}>
        This document contains 12 qualified prospects for Penn Tech Solutions in the Phoenixville area.
        Each prospect was identified through website analysis and local market research. Full contact
        information, background details, and customized pitch scripts are provided for each.
      </Text>

      <CalloutBox
        type="success"
        title="Pipeline Summary"
        text="12 qualified prospects with total potential revenue of $27,000 - $56,000+. Priority breakdown: 2 Critical (SSL emergencies), 5 High (very outdated websites), 5 Medium (dated sites or IT services opportunities)."
      />

      <SectionHeader title="Quick Reference" />

      <View style={styles.summaryTable}>
        <View style={styles.summaryHeader}>
          <Text style={[styles.summaryHeaderCell, { flex: 2 }]}>Business</Text>
          <Text style={[styles.summaryHeaderCell, { flex: 1.5 }]}>Owner</Text>
          <Text style={[styles.summaryHeaderCell, { flex: 1.5 }]}>Phone</Text>
          <Text style={styles.summaryHeaderCell}>Priority</Text>
          <Text style={styles.summaryHeaderCell}>Value</Text>
        </View>
        {allProspects.map((p, i) => (
          <View key={p.name} style={[styles.summaryRow, {
            backgroundColor: p.priority === 'Critical' ? '#fef2f2' : i % 2 === 0 ? '#f8fafc' : 'white'
          }]}>
            <Text style={[styles.summaryCell, { flex: 2, fontFamily: 'Helvetica-Bold' }]}>{p.name}</Text>
            <Text style={[styles.summaryCell, { flex: 1.5 }]}>{p.owner}</Text>
            <Text style={[styles.summaryCell, { flex: 1.5 }]}>{p.phone}</Text>
            <View style={styles.summaryCell}>
              <View style={[styles.badge, {
                backgroundColor: p.priority === 'Critical' ? '#fee2e2' :
                               p.priority === 'High' ? '#fef3c7' : '#e0f2fe'
              }]}>
                <Text style={[styles.badgeText, {
                  color: p.priority === 'Critical' ? '#991b1b' :
                         p.priority === 'High' ? '#92400e' : '#0369a1'
                }]}>{p.priority}</Text>
              </View>
            </View>
            <Text style={styles.summaryCell}>{p.estimatedValue.split(' ')[0]}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Individual Prospect Pages - Two pages per prospect */}
    {allProspects.map((prospect, index) => (
      <React.Fragment key={prospect.name}>
        {/* Page 1: Prospect Details */}
        <Page size="LETTER" style={sharedStyles.page}>
          <PageHeader
            title="Potential Starting Customers"
            subtitle={`Prospect ${index + 1} of ${allProspects.length}`}
          />
          <PageFooter />

          <View style={[styles.prospectCard, {
            borderColor: prospect.priority === 'Critical' ? '#ef4444' :
                         prospect.priority === 'High' ? '#f59e0b' : '#3b82f6',
            borderWidth: prospect.priority === 'Critical' ? 2 : 1,
          }]}>
            <View style={[styles.prospectHeader, {
              backgroundColor: prospect.priority === 'Critical' ? '#fef2f2' :
                              prospect.priority === 'High' ? '#fffbeb' : '#eff6ff'
            }]}>
              <View>
                <Text style={styles.prospectName}>{prospect.name}</Text>
                <Text style={styles.prospectBusiness}>{prospect.business}</Text>
              </View>
              <View style={[styles.priorityBadge, {
                backgroundColor: prospect.priority === 'Critical' ? '#ef4444' :
                                prospect.priority === 'High' ? '#f59e0b' : '#3b82f6'
              }]}>
                <Text style={styles.priorityBadgeText}>{prospect.priority.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.prospectBody}>
              {/* Contact Grid */}
              <View style={styles.contactGrid}>
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Owner</Text>
                  <Text style={styles.contactValue}>{prospect.owner}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>{prospect.phone}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Website</Text>
                  <Text style={styles.contactValue}>{prospect.website}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>{prospect.email ? 'Email' : prospect.linkedin ? 'LinkedIn' : 'Address'}</Text>
                  <Text style={styles.contactValue}>{prospect.email || prospect.linkedin || prospect.address}</Text>
                </View>
              </View>

              {/* Issue Box */}
              <View style={[styles.issueBox, {
                backgroundColor: prospect.priority === 'Critical' ? '#fef2f2' : '#fef3c7'
              }]}>
                <Text style={[styles.issueTitle, {
                  color: prospect.priority === 'Critical' ? '#991b1b' : '#92400e'
                }]}>Issue: {prospect.issue}</Text>
                <Text style={[styles.issueText, {
                  color: prospect.priority === 'Critical' ? '#7f1d1d' : '#78350f'
                }]}>{prospect.issueDetail}</Text>
              </View>

              {/* Background */}
              <View style={styles.backgroundSection}>
                <Text style={styles.sectionTitle}>Background</Text>
                {prospect.background.map((item, i) => (
                  <BulletItem key={i} text={item} />
                ))}
              </View>

              {/* Pitch Angle */}
              <View style={styles.pitchBox}>
                <Text style={styles.pitchTitle}>Pitch Angle</Text>
                <Text style={styles.pitchText}>{prospect.pitchAngle}</Text>
              </View>

              {/* Value */}
              <View style={styles.valueRow}>
                <Text style={styles.valueLabel}>Estimated Value:</Text>
                <Text style={styles.valueAmount}>{prospect.estimatedValue}</Text>
              </View>
            </View>
          </View>
        </Page>

        {/* Page 2: Outreach Script */}
        <Page size="LETTER" style={sharedStyles.page}>
          <PageHeader
            title="Potential Starting Customers"
            subtitle={`Prospect ${index + 1} of ${allProspects.length} - Outreach Script`}
          />
          <PageFooter />

          {/* Prospect Name Header */}
          <View style={[styles.scriptPageHeader, {
            backgroundColor: prospect.priority === 'Critical' ? '#fef2f2' :
                            prospect.priority === 'High' ? '#fffbeb' : '#eff6ff',
            borderColor: prospect.priority === 'Critical' ? '#ef4444' :
                        prospect.priority === 'High' ? '#f59e0b' : '#3b82f6',
          }]}>
            <Text style={styles.scriptPageName}>{prospect.name}</Text>
            <Text style={styles.scriptPageContact}>{prospect.owner} | {prospect.phone}</Text>
          </View>

          {/* Script Box */}
          <View style={styles.scriptBoxLarge}>
            <Text style={styles.scriptTitleLarge}>Suggested Outreach Script</Text>
            <Text style={styles.scriptTextLarge}>"{prospect.script}"</Text>
          </View>

          {/* Urgency Note */}
          {prospect.urgency && (
            <CalloutBox
              type={prospect.priority === 'Critical' ? 'warning' : 'info'}
              title="Why Act Now"
              text={prospect.urgency}
            />
          )}

          {/* Quick Reference */}
          <View style={styles.quickRef}>
            <Text style={styles.quickRefTitle}>Quick Reference</Text>
            <View style={styles.quickRefRow}>
              <Text style={styles.quickRefLabel}>Website:</Text>
              <Text style={styles.quickRefValue}>{prospect.website}</Text>
            </View>
            <View style={styles.quickRefRow}>
              <Text style={styles.quickRefLabel}>Issue:</Text>
              <Text style={styles.quickRefValue}>{prospect.issue}</Text>
            </View>
            <View style={styles.quickRefRow}>
              <Text style={styles.quickRefLabel}>Estimated Value:</Text>
              <Text style={styles.quickRefValue}>{prospect.estimatedValue}</Text>
            </View>
          </View>
        </Page>
      </React.Fragment>
    ))}

    {/* Outreach Strategy */}
    <Page size="LETTER" style={sharedStyles.page}>
      <PageHeader title="Potential Starting Customers" subtitle="Outreach Strategy" />
      <PageFooter />

      <SectionHeader title="Marketing Channels" />

      <View style={styles.channelTable}>
        <View style={styles.channelHeader}>
          <Text style={[styles.channelHeaderCell, { flex: 2 }]}>Channel</Text>
          <Text style={styles.channelHeaderCell}>Effort</Text>
          <Text style={styles.channelHeaderCell}>Cost</Text>
          <Text style={styles.channelHeaderCell}>Timeframe</Text>
        </View>
        {marketingChannels.map((ch, i) => (
          <View key={ch.channel} style={[styles.channelRow, i % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
            <Text style={[styles.channelCell, { flex: 2, fontFamily: 'Helvetica-Bold' }]}>{ch.channel}</Text>
            <Text style={styles.channelCell}>{ch.effort}</Text>
            <Text style={styles.channelCell}>{ch.cost}</Text>
            <Text style={[styles.channelCell, { color: colors.primary }]}>{ch.timeframe}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Bridge Street Walk-In Targets" />

      <Text style={sharedStyles.body}>
        Additional businesses to visit on Bridge Street. Introduce yourself and leave a card -
        don't pitch, just build relationships.
      </Text>

      <View style={styles.walkInGrid}>
        {walkInTargets.map((t) => (
          <View key={t.name} style={styles.walkInItem}>
            <Text style={styles.walkInName}>{t.name}</Text>
            <Text style={styles.walkInAddress}>{t.address}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Recommended Contact Order" />

      <View style={styles.orderList}>
        {allProspects.map((p, i) => (
          <View key={p.name} style={styles.orderItem}>
            <View style={[styles.orderNumber, {
              backgroundColor: p.priority === 'Critical' ? '#ef4444' :
                              p.priority === 'High' ? '#f59e0b' : '#3b82f6'
            }]}>
              <Text style={styles.orderNumberText}>{i + 1}</Text>
            </View>
            <View style={styles.orderContent}>
              <Text style={styles.orderName}>{p.name}</Text>
              <Text style={styles.orderReason}>{p.priority} Priority - {p.issue}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Document Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
        <Text style={styles.footerText}>Penn Tech Solutions - Internal Use Only</Text>
        <Text style={[styles.footerText, { marginTop: 8, fontFamily: 'Helvetica-Bold' }]}>
          Total Pipeline Value: $27,000 - $56,000+
        </Text>
      </View>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  // Summary table
  summaryTable: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  summaryHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: 8,
  },
  summaryHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  summaryCell: {
    flex: 1,
    fontSize: 8,
    color: colors.gray,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Prospect card
  prospectCard: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  prospectHeader: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prospectName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  prospectBusiness: {
    fontSize: 10,
    color: colors.gray,
    marginTop: 2,
  },
  priorityBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  priorityBadgeText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  prospectBody: {
    padding: 14,
    backgroundColor: colors.white,
  },

  // Contact grid
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 6,
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
    color: colors.dark,
  },

  // Issue box
  issueBox: {
    borderRadius: 6,
    padding: 12,
    marginBottom: 14,
  },
  issueTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  issueText: {
    fontSize: 9,
    lineHeight: 1.5,
  },

  // Background
  backgroundSection: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },

  // Pitch box
  pitchBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 6,
    padding: 12,
    marginBottom: 14,
  },
  pitchTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#166534',
    marginBottom: 6,
  },
  pitchText: {
    fontSize: 9,
    color: '#14532d',
    lineHeight: 1.5,
  },

  // Value row
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  valueAmount: {
    fontSize: 11,
    color: colors.primary,
    fontFamily: 'Helvetica-Bold',
  },

  // Script box
  scriptBox: {
    backgroundColor: colors.dark,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  scriptTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 10,
  },
  scriptText: {
    fontSize: 9,
    color: colors.grayLight,
    lineHeight: 1.7,
    fontStyle: 'italic',
  },

  // Script page (page 2) styles
  scriptPageHeader: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 20,
  },
  scriptPageName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  scriptPageContact: {
    fontSize: 12,
    color: colors.gray,
  },
  scriptBoxLarge: {
    backgroundColor: colors.dark,
    borderRadius: 8,
    padding: 24,
    marginBottom: 20,
  },
  scriptTitleLarge: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 16,
  },
  scriptTextLarge: {
    fontSize: 11,
    color: colors.grayLight,
    lineHeight: 1.8,
    fontStyle: 'italic',
  },
  quickRef: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginTop: 'auto',
  },
  quickRefTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 12,
  },
  quickRefRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  quickRefLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray,
    width: 100,
  },
  quickRefValue: {
    fontSize: 10,
    color: colors.dark,
    flex: 1,
  },

  // Channel table
  channelTable: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
  },
  channelHeader: {
    flexDirection: 'row',
    backgroundColor: colors.dark,
    padding: 8,
  },
  channelHeaderCell: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  channelRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  channelCell: {
    flex: 1,
    fontSize: 9,
    color: colors.gray,
  },

  // Walk-in grid
  walkInGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  walkInItem: {
    width: '31%',
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 8,
  },
  walkInName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 2,
  },
  walkInAddress: {
    fontSize: 8,
    color: colors.gray,
  },

  // Order list
  orderList: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  orderNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderNumberText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  orderContent: {
    flex: 1,
    justifyContent: 'center',
  },
  orderName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  orderReason: {
    fontSize: 8,
    color: colors.gray,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 10,
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

export default PotentialStartingCustomers
