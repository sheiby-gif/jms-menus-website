import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get counts for all entities
    const [totalClients, totalDesigns, totalOrders, totalEmployees] = await Promise.all([
      prisma.client.count(),
      prisma.design.count(),
      prisma.order.count(),
      prisma.employee.count(),
    ])

    // Get database size (PostgreSQL specific)
    let databaseSize = 'N/A'
    try {
      const result = await prisma.$queryRaw`
        SELECT pg_size_pretty(pg_database_size(current_database())) as size
      `
      if (Array.isArray(result) && result.length > 0) {
        databaseSize = (result[0] as any).size
      }
    } catch (error) {
      console.warn('Could not get database size:', error)
    }

    // Get last backup time (you can implement this based on your backup strategy)
    const lastBackup = null // This would be implemented based on your backup system

    return NextResponse.json({
      totalClients,
      totalDesigns,
      totalOrders,
      totalEmployees,
      databaseSize,
      lastBackup,
    })
  } catch (error) {
    console.error('Error fetching database stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch database statistics' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 