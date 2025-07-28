import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { reseed = false } = await request.json()

    // Clear all data in the correct order (respecting foreign key constraints)
    await prisma.order.deleteMany()
    await prisma.client.deleteMany()
    await prisma.design.deleteMany()
    await prisma.employee.deleteMany()

    let message = 'Database reset successfully'
    
    if (reseed) {
      // Re-seed the database
      const seedResponse = await fetch(`${request.nextUrl.origin}/api/database/seed`, {
        method: 'POST',
      })
      
      if (seedResponse.ok) {
        const seedData = await seedResponse.json()
        message = `Database reset and reseeded successfully. ${seedData.summary.employees} employees, ${seedData.summary.clients} clients, ${seedData.summary.designs} designs, and ${seedData.summary.orders} orders created.`
      } else {
        message = 'Database reset successfully, but reseeding failed'
      }
    }

    return NextResponse.json({
      message,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error resetting database:', error)
    return NextResponse.json(
      { error: 'Failed to reset database' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 