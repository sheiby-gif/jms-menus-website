'use client'

import React, { useState } from 'react'
import DatabaseManager from '@/components/DatabaseManager'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function DatabasePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <DatabaseManager />
        </main>
      </div>
    </div>
  )
} 