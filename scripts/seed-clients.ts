#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Your client data - I'll parse the tab-separated data you provided
const clientData = [
  {
    name: "CUSTOMERNAME",
    address1: "Address 1", 
    address2: "Address 2",
    city: "City",
    state: "State", 
    zipCode: "Zip Code",
    contactName: "Contact Name",
    phone: "Phone Number",
    email: "EMAIL ADDRESS"
  },
  // Add all your client data here in the same format
  // I'll help you convert your tab-separated data to this format
]

async function seedClients() {
  try {
    console.log('🌱 Starting client seeding...')

    // Clear existing clients
    console.log('🗑️  Clearing existing clients...')
    await prisma.client.deleteMany()

    // Create clients
    console.log('🏢 Creating clients...')
    const clients = await Promise.all(
      clientData.map(client => 
        prisma.client.create({
          data: {
            name: client.contactName || client.name,
            email: client.email,
            phone: client.phone,
            company: client.name,
            address: `${client.address1}${client.address2 ? ', ' + client.address2 : ''}, ${client.city}, ${client.state} ${client.zipCode}`.trim()
          }
        })
      )
    )

    console.log(`✅ Created ${clients.length} clients`)

    // Summary
    console.log('\n🎉 Client seeding completed successfully!')
    console.log('📊 Summary:')
    console.log(`   • ${clients.length} clients imported`)

    // Test data access
    console.log('\n🔍 Testing data access...')
    const totalClients = await prisma.client.count()
    console.log(`   • Database contains ${totalClients} clients`)

  } catch (error) {
    console.error('❌ Error seeding clients:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding function
seedClients() 