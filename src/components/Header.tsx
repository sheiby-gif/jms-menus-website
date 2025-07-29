'use client'

import React from 'react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  onMenuClick: () => void
  onDesktopMenuToggle?: () => void
  desktopOpen?: boolean
}

export default function Header({ onMenuClick, onDesktopMenuToggle, desktopOpen = true }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          {/* Desktop menu toggle button */}
          {onDesktopMenuToggle && (
            <button
              onClick={onDesktopMenuToggle}
              className="hidden lg:flex p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-900">
              Menu Design Order System
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <BellIcon className="h-6 w-6" />
          </button>
          
          <div className="relative">
            <button className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
              <span className="hidden md:block text-gray-700">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 