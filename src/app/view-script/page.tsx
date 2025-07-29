'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ViewScriptPage() {
  const scriptContent = `#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixClients() {
  try {
    console.log('🔧 Starting client fixes...')

    // TODO: Add your specific client fixing logic here
    // Examples of common fixes:
    // - Fix missing required fields
    // - Update data formats
    // - Clean up invalid data
    // - Set default values for null fields

    console.log('✅ Client fixes completed')
  } catch (error) {
    console.error('❌ Error during client fixes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixClients()`

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-green-400">fix-clients.ts</h1>
          <pre className="text-sm overflow-x-auto bg-gray-900 p-4 rounded border border-gray-700">
            <code className="text-gray-100">
              {scriptContent}
            </code>
          </pre>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            This script can be run using: <code className="bg-gray-800 px-2 py-1 rounded">npm run fix-clients</code>
          </p>
        </div>
      </div>
    </div>
  )
} 