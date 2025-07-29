'use client'

import React from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  CogIcon,
  ServerIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  desktopOpen?: boolean
  setDesktopOpen?: (open: boolean) => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Clients', href: '/clients', icon: UserGroupIcon },
  { name: 'Designs', href: '/designs', icon: DocumentTextIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Database', href: '/database', icon: ServerIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export default function Sidebar({ open, setOpen, desktopOpen = true, setDesktopOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setOpen(false)} />
        
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h2 className="text-lg font-semibold text-gray-900">Menu Design</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${
        desktopOpen ? 'lg:w-64' : 'lg:w-0'
      }`}>
        <div className={`flex flex-col flex-grow bg-white border-r border-gray-200 overflow-hidden ${
          desktopOpen ? 'w-64' : 'w-0'
        }`}>
          <div className="flex h-16 items-center justify-between px-4">
            <h2 className={`text-lg font-semibold text-gray-900 transition-opacity duration-300 ${
              desktopOpen ? 'opacity-100' : 'opacity-0'
            }`}>Menu Design</h2>
            {setDesktopOpen && (
              <button
                onClick={() => setDesktopOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <nav className={`flex-1 space-y-1 px-2 py-4 transition-opacity duration-300 ${
            desktopOpen ? 'opacity-100' : 'opacity-0'
          }`}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
} 