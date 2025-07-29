import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const restoredClient = await prisma.client.update({
      where: { id: params.id },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    })

    return NextResponse.json({ 
      message: 'Client restored successfully',
      client: restoredClient 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to restore client' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 