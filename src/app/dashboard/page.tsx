'use client'

import React, { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen}
        desktopOpen={desktopSidebarOpen}
        setDesktopOpen={setDesktopSidebarOpen}
      />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        desktopSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          onDesktopMenuToggle={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
          desktopOpen={desktopSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Dashboard />
        </main>
      </div>
    </div>
  )
} 