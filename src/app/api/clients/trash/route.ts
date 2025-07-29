import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const [total, clients] = await Promise.all([
      prisma.client.count({ where: { isDeleted: true } }),
      prisma.client.findMany({
        where: { isDeleted: true },
        skip,
        take: limit,
        orderBy: {
          deletedAt: 'desc',
        },
      }),
    ])

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
      { error: 'Failed to fetch deleted clients' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}