import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    // Fetch all data from all tables
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

    const exportData = {
      exportDate: new Date().toISOString(),
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

    // Create a downloadable JSON file
    const jsonString = JSON.stringify(exportData, null, 2)
    const filename = `database-backup-${new Date().toISOString().split('T')[0]}.json`

    return new NextResponse(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting database:', error)
    return NextResponse.json(
      { error: 'Failed to export database' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 