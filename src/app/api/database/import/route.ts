import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Read and parse the JSON file
    const fileContent = await file.text()
    let importData

    try {
      importData = JSON.parse(fileContent)
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON file' },
        { status: 400 }
      )
    }

    // Validate the import data structure
    if (!importData.data || !importData.data.clients || !importData.data.designs || !importData.data.employees || !importData.data.orders) {
      return NextResponse.json(
        { error: 'Invalid backup file format' },
        { status: 400 }
      )
    }

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Clear existing data
      await tx.order.deleteMany()
      await tx.client.deleteMany()
      await tx.design.deleteMany()
      await tx.employee.deleteMany()

      // Import employees first (no dependencies)
      const employees = await Promise.all(
        importData.data.employees.map((employee: any) =>
          tx.employee.create({
            data: {
              name: employee.name,
              email: employee.email,
              role: employee.role,
              isActive: employee.isActive ?? true,
            }
          })
        )
      )

      // Import clients
      const clients = await Promise.all(
        importData.data.clients.map((client: any) =>
          tx.client.create({
            data: {
              name: client.name,
              email: client.email,
              phone: client.phone,
              company: client.company,
              address: client.address,
            }
          })
        )
      )

      // Import designs
      const designs = await Promise.all(
        importData.data.designs.map((design: any) =>
          tx.design.create({
            data: {
              name: design.name,
              description: design.description,
              category: design.category,
              price: design.price,
              imageUrl: design.imageUrl,
              isActive: design.isActive ?? true,
            }
          })
        )
      )

      // Create a mapping of old IDs to new IDs for relationships
      const clientIdMap = new Map()
      const designIdMap = new Map()
      const employeeIdMap = new Map()

      importData.data.clients.forEach((client: any, index: number) => {
        clientIdMap.set(client.id, clients[index].id)
      })

      importData.data.designs.forEach((design: any, index: number) => {
        designIdMap.set(design.id, designs[index].id)
      })

      importData.data.employees.forEach((employee: any, index: number) => {
        employeeIdMap.set(employee.id, employees[index].id)
      })

      // Import orders with updated foreign keys
      const orders = await Promise.all(
        importData.data.orders.map((order: any) =>
          tx.order.create({
            data: {
              quantity: order.quantity,
              totalPrice: order.totalPrice,
              status: order.status,
              notes: order.notes,
              clientId: clientIdMap.get(order.clientId),
              designId: designIdMap.get(order.designId),
              employeeId: employeeIdMap.get(order.employeeId),
            }
          })
        )
      )

      return {
        employees: employees.length,
        clients: clients.length,
        designs: designs.length,
        orders: orders.length
      }
    })

    return NextResponse.json({
      message: 'Database imported successfully',
      summary: result,
      importDate: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error importing database:', error)
    return NextResponse.json(
      { error: 'Failed to import database' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 