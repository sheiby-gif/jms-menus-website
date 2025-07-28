import { NextRequest, NextResponse } from 'next/server'
import { Design } from '@/types'

// Mock database - in a real app, this would be a database
let designs: Design[] = [
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
  {
    id: '2',
    name: 'Modern Cafe Menu',
    description: 'Contemporary cafe menu design',
    category: 'Cafe',
    price: 120,
    imageUrl: '/api/placeholder/150/100',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Luxury Restaurant Menu',
    description: 'Premium restaurant menu with elegant design',
    category: 'Restaurant',
    price: 200,
    imageUrl: '/api/placeholder/150/100',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET() {
  try {
    return NextResponse.json({ designs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch designs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.description || !body.category || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new design
    const newDesign: Design = {
      id: (designs.length + 1).toString(),
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      imageUrl: body.imageUrl || '/api/placeholder/150/100',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    designs.push(newDesign)

    return NextResponse.json({ design: newDesign }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create design' },
      { status: 500 }
    )
  }
} 