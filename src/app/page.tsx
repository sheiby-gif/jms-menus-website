'use client'

import React from 'react'
import Link from 'next/link'
import { ServerIcon, ShoppingCartIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full flex flex-col items-center">
        <div className="flex items-center mb-6">
          <ServerIcon className="w-10 h-10 text-green-600 mr-3" />
          <span className="text-2xl font-bold text-gray-900">JMS Menus Internal Orders - LIVE!</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Welcome to the JMS Menus Internal Order System
        </h1>
        <p className="text-gray-600 text-center mb-8">
          <span className="font-semibold text-green-700">For JMS Menus employees only.</span><br/>
          This tool is strictly for placing and managing menu design orders within the company. If you are not a JMS Menus employee, please close this page.
        </p>
        <Link
          href="/dashboard"
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-lg w-full mb-3"
        >
          <ShoppingCartIcon className="w-5 h-5 mr-2" />
          Go to Order Dashboard
        </Link>
        <Link
          href="/view-script"
          className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base w-full"
        >
          <CodeBracketIcon className="w-4 h-4 mr-2" />
          View Fix Clients Script
        </Link>
      </div>
    </div>
  )
} 