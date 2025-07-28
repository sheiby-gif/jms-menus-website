'use client'

import React, { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Order, OrderFormData, Client, Design } from '@/types'

interface OrderFormProps {
  order?: Order | null
  onClose: () => void
  onSubmit: (data: OrderFormData) => void
}

// Mock data - in a real app, this would come from an API
const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@restaurant.com',
    phone: '+1-555-0123',
    company: 'Smith Restaurant',
    address: '123 Main St, City, State',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@cafe.com',
    phone: '+1-555-0124',
    company: 'Johnson Cafe',
    address: '456 Oak Ave, City, State',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockDesigns: Design[] = [
  {
    id: '1',
    name: 'Classic Menu Design',
    description: 'Traditional restaurant menu layout',
    category: 'Restaurant',
    price: 150,
    imageUrl: '/api/placeholder/150/100',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Modern Cafe Menu',
    description: 'Contemporary cafe menu design',
    category: 'Cafe',
    price: 120,
    imageUrl: '/api/placeholder/150/100',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Luxury Restaurant Menu',
    description: 'Premium restaurant menu with elegant design',
    category: 'Restaurant',
    price: 200,
    imageUrl: '/api/placeholder/150/100',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function OrderForm({ order, onClose, onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    clientId: '',
    designId: '',
    quantity: 1,
    notes: '',
  })
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (order) {
      setFormData({
        clientId: order.clientId,
        designId: order.designId,
        quantity: order.quantity,
        notes: order.notes,
      })
      setSelectedDesign(order.design)
      setTotalPrice(order.totalPrice)
    }
  }, [order])

  useEffect(() => {
    if (formData.designId && formData.quantity) {
      const design = mockDesigns.find(d => d.id === formData.designId)
      if (design) {
        setSelectedDesign(design)
        setTotalPrice(design.price * formData.quantity)
      }
    }
  }, [formData.designId, formData.quantity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof OrderFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {order ? 'Edit Order' : 'Create New Order'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select
                  value={formData.clientId}
                  onChange={(e) => handleInputChange('clientId', e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select a client</option>
                  {mockClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Design Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Design
                </label>
                <select
                  value={formData.designId}
                  onChange={(e) => handleInputChange('designId', e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select a design</option>
                  {mockDesigns.map((design) => (
                    <option key={design.id} value={design.id}>
                      {design.name} - ${design.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Design Preview */}
              {selectedDesign && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedDesign.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{selectedDesign.description}</p>
                  <p className="text-sm text-gray-600">Category: {selectedDesign.category}</p>
                  <p className="text-sm text-gray-600">Price: ${selectedDesign.price}</p>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                  className="input-field"
                  required
                />
              </div>

              {/* Total Price */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Price:</span>
                  <span className="text-lg font-semibold text-blue-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Any special requirements or notes..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {order ? 'Update Order' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 