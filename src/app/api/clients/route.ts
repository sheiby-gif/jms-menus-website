import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@/types'

// Mock database - in a real app, this would be a database
let clients: Client[] = [
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
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@cafe.com',
    phone: '+1-555-0124',
    company: 'Johnson Cafe',
    address: '456 Oak Ave, City, State',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET() {
  try {
    return NextResponse.json({ clients })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if client already exists
    const existingClient = clients.find(c => c.email === body.email)
    if (existingClient) {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      )
    }

    // Create new client
    const newClient: Client = {
      id: (clients.length + 1).toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company,
      address: body.address || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    clients.push(newClient)

    return NextResponse.json({ client: newClient }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  }
} 