import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') // 'json', 'csv', 'excel'
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit
    const showDeleted = searchParams.get('showDeleted') === 'true'

    // Build search query
    const whereClause = {
      ...(search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ]
      } : {}),
      // Handle both old and new schema - show clients that are not explicitly deleted
      ...(showDeleted ? {} : {
        OR: [
          { isDeleted: false },
          { isDeleted: null }
        ]
      })
    }

    const [total, clients] = await Promise.all([
      prisma.client.count({ where: whereClause }),
      prisma.client.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    if (format === 'csv') {
      const csv = [
        'ID,Name,Email,Phone,Company,Address,CreatedAt,UpdatedAt,DeletedAt',
        ...clients.map(client =>
          `${client.id},${client.name},${client.email},${client.phone},${client.company},${client.address},${client.createdAt},${client.updatedAt},${client.deletedAt || ''}`
        ),
      ].join('\n')
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=clients.csv',
        },
      })
    }

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
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

    // Check if client already exists (including soft deleted)
    const existingClient = await prisma.client.findUnique({
      where: { email: body.email },
    })
    
    if (existingClient) {
      if (existingClient.isDeleted) {
        // Restore the soft deleted client
        const restoredClient = await prisma.client.update({
          where: { id: existingClient.id },
          data: {
            name: body.name,
            email: body.email,
            phone: body.phone || '',
            company: body.company,
            address: body.address || '',
            isDeleted: false,
            deletedAt: null,
          },
        })
        return NextResponse.json({ 
          client: restoredClient, 
          message: 'Client restored successfully' 
        }, { status: 200 })
      } else {
        return NextResponse.json(
          { error: 'Client with this email already exists' },
          { status: 409 }
        )
      }
    }

    // Create new client
    const newClient = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        company: body.company,
        address: body.address || '',
      },
    })

    return NextResponse.json({ client: newClient }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 