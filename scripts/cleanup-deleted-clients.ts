#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanupDeletedClients() {
  try {
    console.log('🧹 Starting cleanup of deleted clients...')

    // Find clients deleted more than 30 days ago
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const deletedClients = await prisma.client.findMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lt: thirtyDaysAgo
        }
      }
    })

    if (deletedClients.length === 0) {
      console.log('✅ No clients to permanently delete')
      return
    }

    console.log(`🗑️  Found ${deletedClients.length} clients to permanently delete`)

    // Permanently delete them
    await prisma.client.deleteMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lt: thirtyDaysAgo
        }
      }
    })

    console.log(`✅ Permanently deleted ${deletedClients.length} clients`)
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupDeletedClients() 