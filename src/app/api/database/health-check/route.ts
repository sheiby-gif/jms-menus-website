import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    const startTime = Date.now()
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    const connectionTime = Date.now() - startTime

    // Get database performance metrics
    const [tableSizes, slowQueries, connectionCount] = await Promise.all([
      // Get table sizes
      prisma.$queryRaw`
        SELECT 
          schemaname,
          tablename,
          pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
          pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
      `,
      
      // Check for slow queries (simplified version)
      prisma.$queryRaw`
        SELECT 
          query,
          mean_time,
          calls
        FROM pg_stat_statements 
        ORDER BY mean_time DESC 
        LIMIT 5
      `,
      
      // Get connection count
      prisma.$queryRaw`
        SELECT count(*) as active_connections 
        FROM pg_stat_activity 
        WHERE state = 'active'
      `
    ])

    // Get record counts
    const [clientCount, designCount, orderCount, employeeCount] = await Promise.all([
      prisma.client.count(),
      prisma.design.count(),
      prisma.order.count(),
      prisma.employee.count(),
    ])

    // Check for data integrity issues
    const integrityChecks = await Promise.all([
      // Check for orphaned orders (this is handled by foreign key constraints, but we can check for any issues)
      prisma.order.findMany({
        where: {
          clientId: {
            not: {
              in: (await prisma.client.findMany({ select: { id: true } })).map(c => c.id)
            }
          }
        },
        select: { id: true }
      }),
      
      // Check for duplicate emails
      prisma.$queryRaw`
        SELECT email, COUNT(*) as count
        FROM clients
        GROUP BY email
        HAVING COUNT(*) > 1
      `,
      
      // Check for duplicate employee emails
      prisma.$queryRaw`
        SELECT email, COUNT(*) as count
        FROM employees
        GROUP BY email
        HAVING COUNT(*) > 1
      `
    ])

    const healthStatus: {
      status: 'healthy' | 'warning' | 'degraded' | 'unhealthy';
      timestamp: string;
      connection: {
        status: 'connected';
        responseTime: string;
      };
      performance: {
        tableSizes: unknown;
        slowQueries: unknown;
        activeConnections: number;
      };
      data: {
        totalRecords: number;
        clients: number;
        designs: number;
        orders: number;
        employees: number;
      };
      integrity: {
        orphanedOrders: number;
        duplicateClientEmails: number;
        duplicateEmployeeEmails: number;
        issues: string[];
      };
    } = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      connection: {
        status: 'connected' as const,
        responseTime: `${connectionTime}ms`
      },
      performance: {
        tableSizes: tableSizes,
        slowQueries: slowQueries,
        activeConnections: (connectionCount as any[])[0]?.active_connections || 0
      },
      data: {
        totalRecords: clientCount + designCount + orderCount + employeeCount,
        clients: clientCount,
        designs: designCount,
        orders: orderCount,
        employees: employeeCount
      },
      integrity: {
        orphanedOrders: integrityChecks[0].length,
        duplicateClientEmails: (integrityChecks[1] as any[]).length,
        duplicateEmployeeEmails: (integrityChecks[2] as any[]).length,
        issues: [] as string[]
      }
    }

    // Check for issues
    if (integrityChecks[0].length > 0) {
      healthStatus.integrity.issues.push(`Found ${integrityChecks[0].length} orphaned orders`)
    }
    if ((integrityChecks[1] as any[]).length > 0) {
      healthStatus.integrity.issues.push(`Found ${(integrityChecks[1] as any[]).length} duplicate client emails`)
    }
    if ((integrityChecks[2] as any[]).length > 0) {
      healthStatus.integrity.issues.push(`Found ${(integrityChecks[2] as any[]).length} duplicate employee emails`)
    }

    if (healthStatus.integrity.issues.length > 0) {
      healthStatus.status = 'warning'
    }

    if (connectionTime > 1000) {
      healthStatus.status = 'degraded'
      healthStatus.integrity.issues.push('Slow database response time')
    }

    return NextResponse.json(healthStatus)
  } catch (error) {
    console.error('Error performing health check:', error)
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 