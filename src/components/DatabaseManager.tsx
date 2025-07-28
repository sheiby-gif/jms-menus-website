'use client'

import React, { useState, useEffect } from 'react'
import { 
  DatabaseIcon, 
  CloudArrowUpIcon, 
  CloudArrowDownIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  CogIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface DatabaseStats {
  totalClients: number
  totalDesigns: number
  totalOrders: number
  totalEmployees: number
  lastBackup?: string
  databaseSize?: string
}

interface MigrationStatus {
  id: string
  name: string
  applied: boolean
  appliedAt?: string
}

export default function DatabaseManager() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<DatabaseStats | null>(null)
  const [migrations, setMigrations] = useState<MigrationStatus[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  useEffect(() => {
    fetchDatabaseStats()
    fetchMigrations()
  }, [])

  const fetchDatabaseStats = async () => {
    try {
      const response = await fetch('/api/database/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching database stats:', error)
    }
  }

  const fetchMigrations = async () => {
    try {
      const response = await fetch('/api/database/migrations')
      if (response.ok) {
        const data = await response.json()
        setMigrations(data)
      }
    } catch (error) {
      console.error('Error fetching migrations:', error)
    }
  }

  const handleDatabaseOperation = async (operation: string) => {
    setIsLoading(true)
    setMessage(null)
    
    try {
      const response = await fetch(`/api/database/${operation}`, {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        if (operation === 'seed' || operation === 'migrate') {
          fetchDatabaseStats()
          fetchMigrations()
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Operation failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'import' | 'backup') => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/database/${type}`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        fetchDatabaseStats()
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Upload failed' })
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: DatabaseIcon },
    { id: 'operations', name: 'Operations', icon: CogIcon },
    { id: 'migrations', name: 'Migrations', icon: DocumentArrowUpIcon },
    { id: 'backup', name: 'Backup & Restore', icon: CloudArrowUpIcon },
    { id: 'monitoring', name: 'Monitoring', icon: ChartBarIcon },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
        <p className="mt-2 text-gray-600">Manage your database operations, migrations, and monitoring</p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 border border-green-200' :
          message.type === 'error' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              ) : message.type === 'error' ? (
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              ) : (
                <ClockIcon className="h-5 w-5 text-blue-400" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm ${
                message.type === 'success' ? 'text-green-800' :
                message.type === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {message.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DatabaseIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats?.totalClients || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentArrowUpIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Designs</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats?.totalDesigns || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats?.totalOrders || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CogIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats?.totalEmployees || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Database Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleDatabaseOperation('seed')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <DatabaseIcon className="h-5 w-5 mr-2" />
                Seed Database
              </button>
              
              <button
                onClick={() => handleDatabaseOperation('reset')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                Reset Database
              </button>
            </div>
          </div>
        )}

        {activeTab === 'migrations' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Database Migrations</h3>
              <button
                onClick={() => handleDatabaseOperation('migrate')}
                disabled={isLoading}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                Run Migrations
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Migration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {migrations.map((migration) => (
                    <tr key={migration.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {migration.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          migration.applied
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {migration.applied ? 'Applied' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {migration.appliedAt || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Backup & Restore</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">Export Data</h4>
                <button
                  onClick={() => handleDatabaseOperation('export')}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                  Export Database
                </button>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="import-file" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Import Database
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          Click to select a backup file
                        </span>
                      </label>
                      <input
                        id="import-file"
                        type="file"
                        accept=".json,.sql"
                        onChange={(e) => handleFileUpload(e, 'import')}
                        className="sr-only"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Database Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">Performance</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Database Size: {stats?.databaseSize || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Last Backup: {stats?.lastBackup || 'Never'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">Health Check</h4>
                <button
                  onClick={() => handleDatabaseOperation('health-check')}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Run Health Check
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 