import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'

const prisma = new PrismaClient()
const execAsync = promisify(exec)

export async function GET() {
  try {
    // Check if _prisma_migrations table exists
    const migrations = await prisma.$queryRaw`
      SELECT 
        id,
        checksum,
        finished_at,
        migration_name,
        logs,
        rolled_back_at,
        started_at,
        applied_steps_count
      FROM _prisma_migrations 
      ORDER BY started_at ASC
    `

    const migrationStatus = (migrations as any[]).map(migration => ({
      id: migration.id,
      name: migration.migration_name,
      applied: !!migration.finished_at,
      appliedAt: migration.finished_at,
      rolledBack: !!migration.rolled_back_at,
    }))

    return NextResponse.json(migrationStatus)
  } catch (error) {
    console.error('Error fetching migrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch migrations' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (action === 'migrate') {
      // Run Prisma migrations
      const { stdout, stderr } = await execAsync('npx prisma migrate deploy')
      
      if (stderr) {
        console.error('Migration stderr:', stderr)
      }

      return NextResponse.json({
        message: 'Migrations applied successfully',
        output: stdout
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error running migrations:', error)
    return NextResponse.json(
      { error: 'Failed to run migrations' },
      { status: 500 }
    )
  }
} 