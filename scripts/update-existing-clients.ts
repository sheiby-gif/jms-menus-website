#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateExistingClients() {
  try {
    console.log('🔄 Updating existing clients...')

    // Update all existing clients to have isDeleted = false and deletedAt = null
    const result = await prisma.client.updateMany({
      where: {
        isDeleted: {
          equals: null
        }
      },
      data: {
        isDeleted: false,
        deletedAt: null
      }
    })

    console.log(`✅ Updated ${result.count} clients`)
  } catch (error) {
    console.error('❌ Error updating clients:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateExistingClients() 