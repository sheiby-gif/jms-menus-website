import { Order } from '@/types'

export interface WebsiteIntegrationData {
  orderId: string
  clientName: string
  designName: string
  quantity: number
  totalPrice: number
  integrationUrl: string
  apiKey: string
  expectedDelivery: string
}

export interface OrderStatusData {
  orderId: string
  clientName: string
  status: string
  updatedAt: string
  notes?: string
}

/**
 * Generate website integration data for an order
 */
export function generateWebsiteIntegrationData(order: Order): WebsiteIntegrationData {
  const expectedDelivery = new Date()
  expectedDelivery.setDate(expectedDelivery.getDate() + 14) // 2 weeks from now

  return {
    orderId: order.id,
    clientName: order.client.name,
    designName: order.design.name,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    integrationUrl: `${process.env.WEBSITE_API_URL}/orders/${order.id}`,
    apiKey: generateApiKey(order.id),
    expectedDelivery: expectedDelivery.toISOString().split('T')[0],
  }
}

/**
 * Generate order status data for notifications
 */
export function generateOrderStatusData(order: Order, status: string, notes?: string): OrderStatusData {
  return {
    orderId: order.id,
    clientName: order.client.name,
    status,
    updatedAt: new Date().toISOString(),
    notes,
  }
}

/**
 * Send order confirmation to client
 */
export async function sendOrderConfirmation(order: Order) {
  const integrationData = generateWebsiteIntegrationData(order)
  
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'order_confirmation',
        recipient: order.client.email,
        data: {
          orderId: order.id,
          clientName: order.client.name,
          designName: order.design.name,
          quantity: order.quantity,
          totalPrice: order.totalPrice,
          expectedDelivery: integrationData.expectedDelivery,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send order confirmation')
    }

    // Also send website integration email
    await sendWebsiteIntegrationEmail(order, integrationData)

    return { success: true }
  } catch (error) {
    console.error('Error sending order confirmation:', error)
    return { success: false, error }
  }
}

/**
 * Send order status update to client
 */
export async function sendOrderStatusUpdate(order: Order, status: string, notes?: string) {
  const statusData = generateOrderStatusData(order, status, notes)
  
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'order_status_update',
        recipient: order.client.email,
        data: statusData,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send status update')
    }

    // Update website if order is completed
    if (status === 'completed') {
      await updateWebsiteOrderStatus(order, status)
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending status update:', error)
    return { success: false, error }
  }
}

/**
 * Send website integration email with setup instructions
 */
async function sendWebsiteIntegrationEmail(order: Order, integrationData: WebsiteIntegrationData) {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'website_integration',
        recipient: order.client.email,
        data: integrationData,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send website integration email')
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending website integration email:', error)
    return { success: false, error }
  }
}

/**
 * Update order status on the client's website
 */
async function updateWebsiteOrderStatus(order: Order, status: string) {
  try {
    const response = await fetch(`${process.env.WEBSITE_API_URL}/orders/${order.id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBSITE_API_KEY}`,
      },
      body: JSON.stringify({
        status,
        updatedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update website order status')
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating website order status:', error)
    return { success: false, error }
  }
}

/**
 * Generate a unique API key for website integration
 */
function generateApiKey(orderId: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return `md_${orderId}_${timestamp}_${random}`.toUpperCase()
}

/**
 * Get next steps for website integration based on order status
 */
export function getNextSteps(order: Order): string[] {
  const steps = []

  switch (order.status) {
    case 'pending':
      steps.push('Order has been received and is being reviewed')
      steps.push('You will receive a confirmation email shortly')
      steps.push('Production will begin once order is confirmed')
      break

    case 'confirmed':
      steps.push('Order has been confirmed and production has started')
      steps.push('Design files are being prepared')
      steps.push('You will receive updates on production progress')
      break

    case 'in_production':
      steps.push('Your menu design is currently in production')
      steps.push('Quality checks are being performed')
      steps.push('You will be notified when production is complete')
      break

    case 'completed':
      steps.push('Your order has been completed!')
      steps.push('Design files are ready for download')
      steps.push('Website integration instructions have been sent')
      steps.push('Contact support if you need assistance with setup')
      break

    case 'cancelled':
      steps.push('Order has been cancelled')
      steps.push('Please contact us if you have any questions')
      break

    default:
      steps.push('Order is being processed')
  }

  return steps
}

/**
 * Get website integration instructions
 */
export function getWebsiteIntegrationInstructions(order: Order): string[] {
  return [
    '1. Log into your website dashboard',
    '2. Navigate to the menu management section',
    '3. Upload the provided design files',
    '4. Configure the menu layout settings',
    '5. Test the menu display on your website',
    '6. Contact support if you encounter any issues',
  ]
} 