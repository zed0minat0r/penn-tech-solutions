/**
 * PDF Generation Script
 *
 * This script generates all PDF documents for Penn Tech Solutions.
 * Run with: npx tsx documents/generate.tsx
 *
 * Generated PDFs will be saved to: documents/output/
 */

import React from 'react'
import ReactPDF from '@react-pdf/renderer'
import path from 'path'
import fs from 'fs'

// Import document templates
import ServicesOverview from './templates/ServicesOverview'
import BusinessPlan from './templates/BusinessPlan'
import DetailedServices from './templates/DetailedServices'
import DocumentChecklist from './templates/DocumentChecklist'
import NetworkConfigurationPlan from './templates/NetworkConfigurationPlan'
import PotentialStartingCustomers from './templates/PotentialStartingCustomers'
import WebsiteServiceBundle from './templates/WebsiteServiceBundle'
import FacebookImprovements from './templates/FacebookImprovements'

// Ensure output directory exists
const outputDir = path.join(__dirname, 'output')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Get current date for filenames
const dateStamp = new Date().toISOString().split('T')[0]

// Document configurations
const documents = [
  {
    name: 'ServicesOverview',
    component: ServicesOverview,
    filename: `Penn_Tech_Solutions_Services_Overview_${dateStamp}.pdf`,
  },
  {
    name: 'BusinessPlan',
    component: BusinessPlan,
    filename: `Penn_Tech_Solutions_Business_Plan_${dateStamp}.pdf`,
  },
  {
    name: 'DetailedServices',
    component: DetailedServices,
    filename: `Penn_Tech_Solutions_Detailed_Service_Guide_${dateStamp}.pdf`,
  },
  {
    name: 'DocumentChecklist',
    component: DocumentChecklist,
    filename: `Penn_Tech_Solutions_Document_Checklist_${dateStamp}.pdf`,
  },
  {
    name: 'NetworkConfigurationPlan',
    component: NetworkConfigurationPlan,
    filename: `Penn_Tech_Solutions_Network_Configuration_Plan_${dateStamp}.pdf`,
  },
  {
    name: 'PotentialStartingCustomers',
    component: PotentialStartingCustomers,
    filename: `Penn_Tech_Solutions_Potential_Starting_Customers_${dateStamp}.pdf`,
  },
  {
    name: 'WebsiteServiceBundle',
    component: WebsiteServiceBundle,
    filename: `Penn_Tech_Solutions_Website_Service_Bundle_${dateStamp}.pdf`,
  },
  {
    name: 'FacebookImprovements',
    component: FacebookImprovements,
    filename: `Penn_Tech_Solutions_Facebook_Improvements_${dateStamp}.pdf`,
  },
]

async function generatePDFs() {
  console.log('\n🚀 Penn Tech Solutions PDF Generator\n')
  console.log('=' .repeat(50))

  for (const doc of documents) {
    const outputPath = path.join(outputDir, doc.filename)

    console.log(`\n📄 Generating: ${doc.name}`)
    console.log(`   Output: ${doc.filename}`)

    try {
      await ReactPDF.render(
        React.createElement(doc.component),
        outputPath
      )
      console.log(`   ✅ Success!`)
    } catch (error) {
      console.error(`   ❌ Error: ${error}`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`\n✨ All documents generated in: ${outputDir}\n`)
}

// Run the generator
generatePDFs().catch(console.error)
