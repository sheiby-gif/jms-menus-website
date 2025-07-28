import { NextRequest, NextResponse } from 'next/server'
import { Order, OrderFormData } from '@/types'

// Mock database - in a real app, this would be a database
let orders: Order[] = [
  {
    id: '1',
    clientId: '1',
    client: {
      id: '1',
      name: 'John Smith',
      email: 'john@restaurant.com',
      phone: '+1-555-0123',
      company: 'Smith Restaurant',
      address: '123 Main St, City, State',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    designId: '1',
    design: {
      id: '1',
      name: 'Classic Menu Design',
      description: 'Traditional restaurant menu layout',
      category: 'Restaurant',
      price: 150,
      imageUrl: '/api/placeholder/150/100',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    quantity: 100,
    totalPrice: 15000,
    status: 'pending',
    notes: 'Rush order needed',
    employeeId: '1',
    employee: {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@company.com',
      role: 'sales',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock clients and designs data
const clients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@restaurant.com',
    phone: '+1-555-0123',
    company: 'Smith Restaurant',
    address: '123 Main St, City, State',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const designs = [
  {
    id: '1',
    name: 'Classic Menu Design',
    description: 'Traditional restaurant menu layout',
    category: 'Restaurant',
    price: 150,
    imageUrl: '/api/placeholder/150/100',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const employees = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@company.com',
    role: 'sales' as const,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET() {
  try {
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderFormData = await request.json()
    
    // Validate required fields
    if (!body.clientId || !body.designId || !body.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find client and design
    const client = clients.find(c => c.id === body.clientId)
    const design = designs.find(d => d.id === body.designId)
    const employee = employees[0] // In a real app, this would be the authenticated user

    if (!client || !design) {
      return NextResponse.json(
        { error: 'Client or design not found' },
        { status: 404 }
      )
    }

    // Calculate total price
    const totalPrice = design.price * body.quantity

    // Create new order
    const newOrder: Order = {
      id: (orders.length + 1).toString(),
      clientId: body.clientId,
      client,
      designId: body.designId,
      design,
      quantity: body.quantity,
      totalPrice,
      status: 'pending',
      notes: body.notes || '',
      employeeId: employee.id,
      employee,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    orders.push(newOrder)

    // Send notification to client (in a real app, this would be an email)
    await sendOrderNotification(newOrder)

    return NextResponse.json({ order: newOrder }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

async function sendOrderNotification(order: Order) {
  // In a real app, this would send an email to the client
  console.log(`Order notification sent to ${order.client.email}`)
  console.log(`Order #${order.id} created for ${order.client.name}`)
  console.log(`Design: ${order.design.name}`)
  console.log(`Quantity: ${order.quantity}`)
  console.log(`Total: $${order.totalPrice}`)
} 