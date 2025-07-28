#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function backupDatabase() {
  try {
    console.log('💾 Starting database backup...')

    // Create backups directory if it doesn't exist
    const backupsDir = join(process.cwd(), 'backups')
    mkdirSync(backupsDir, { recursive: true })

    // Fetch all data from all tables
    console.log('📥 Fetching data from database...')
    const [clients, designs, employees, orders] = await Promise.all([
      prisma.client.findMany({
        orderBy: { createdAt: 'asc' }
      }),
      prisma.design.findMany({
        orderBy: { createdAt: 'asc' }
      }),
      prisma.employee.findMany({
        orderBy: { createdAt: 'asc' }
      }),
      prisma.order.findMany({
        include: {
          client: true,
          design: true,
          employee: true
        },
        orderBy: { createdAt: 'asc' }
      })
    ])

    const backupData = {
      backupDate: new Date().toISOString(),
      version: '1.0',
      data: {
        clients,
        designs,
        employees,
        orders
      },
      summary: {
        totalClients: clients.length,
        totalDesigns: designs.length,
        totalEmployees: employees.length,
        totalOrders: orders.length
      }
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const filename = `database-backup-${timestamp}.json`
    const filepath = join(backupsDir, filename)

    // Write backup to file
    console.log(`💾 Writing backup to ${filepath}...`)
    writeFileSync(filepath, JSON.stringify(backupData, null, 2))

    console.log('✅ Database backup completed successfully!')
    console.log('📊 Backup Summary:')
    console.log(`   • ${clients.length} clients`)
    console.log(`   • ${designs.length} designs`)
    console.log(`   • ${employees.length} employees`)
    console.log(`   • ${orders.length} orders`)
    console.log(`   • File: ${filepath}`)

  } catch (error) {
    console.error('❌ Error creating database backup:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the backup function
backupDatabase() 