'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  ShoppingCartIcon,
  ServerIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function WelcomePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Client Management',
      description: 'Efficiently manage restaurant clients and their information with our comprehensive client database.',
      color: 'bg-green-600'
    },
    {
      icon: DocumentTextIcon,
      title: 'Menu Design Catalog',
      description: 'Browse through our extensive collection of professional menu designs for every restaurant type.',
      color: 'bg-green-500'
    },
    {
      icon: ShoppingCartIcon,
      title: 'Order Processing',
      description: 'Streamlined order management with real-time status tracking and automated workflows.',
      color: 'bg-green-700'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Reports',
      description: 'Powerful insights into your business performance with detailed analytics and reporting.',
      color: 'bg-green-600'
    },
    {
      icon: ServerIcon,
      title: 'Database Management',
      description: 'Complete database control with backup, restore, and monitoring capabilities.',
      color: 'bg-green-500'
    },
    {
      icon: CogIcon,
      title: 'System Settings',
      description: 'Customize your system preferences and manage user roles and permissions.',
      color: 'bg-green-700'
    }
  ]

  const stats = [
    { label: 'Total Orders', value: '156', change: '+12%', changeType: 'positive' },
    { label: 'Active Clients', value: '89', change: '+8%', changeType: 'positive' },
    { label: 'Menu Designs', value: '45', change: '+15%', changeType: 'positive' },
    { label: 'Revenue', value: '$45.6K', change: '+23%', changeType: 'positive' }
  ]

  const benefits = [
    'Streamlined order management workflow',
    'Professional menu design templates',
    'Real-time order status tracking',
    'Comprehensive client database',
    'Advanced analytics and reporting',
    'Secure data backup and restore',
    'User-friendly interface',
    '24/7 system availability'
  ]

  return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JMS Menus</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/database" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Database
              </Link>
                             <Link 
                 href="/dashboard" 
                 className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2"
               >
                 <span>Get Started</span>
                 <ArrowRightIcon className="w-4 h-4" />
               </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
                         <div className="flex justify-center mb-6">
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                 <StarIcon className="w-4 h-4 mr-2" />
                 Professional Menu Design System
               </div>
             </div>
            
                         <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
               Transform Your
               <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Menu Design</span>
               <br />
               Business
             </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your menu design operations with our comprehensive order management system. 
              From client management to order processing, we've got everything you need to grow your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <Link 
                 href="/dashboard" 
                 className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
               >
                 <RocketLaunchIcon className="w-5 h-5" />
                 <span>Launch Dashboard</span>
               </Link>
              <Link 
                href="/database" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ServerIcon className="w-5 h-5" />
                <span>Manage Database</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive system provides all the tools you need to manage your menu design business efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose MenuDesign Pro?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our system is designed to help you focus on what matters most - creating amazing menu designs for your clients.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
                         <div className="relative">
               <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">All Systems Operational</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Database</span>
                      <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">API Services</span>
                      <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">File Storage</span>
                      <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Backup System</span>
                      <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
             <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
                     <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of successful menu designers who trust our system to manage their operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <Link 
               href="/dashboard" 
               className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
             >
               <RocketLaunchIcon className="w-5 h-5" />
               <span>Start Now</span>
             </Link>
                         <Link 
               href="/database" 
               className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
             >
               <ServerIcon className="w-5 h-5" />
               <span>Explore Database</span>
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                               <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                 <SparklesIcon className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-bold">JMS Menus</span>
              </div>
                             <p className="text-gray-400">
                 Professional menu design order management system by JMS Menus.
               </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/database" className="hover:text-white transition-colors">Database Management</Link></li>
                <li><Link href="/clients" className="hover:text-white transition-colors">Client Management</Link></li>
                <li><Link href="/designs" className="hover:text-white transition-colors">Menu Designs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MenuDesign Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 