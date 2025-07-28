import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.type || !body.recipient || !body.data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Handle different notification types
    switch (body.type) {
      case 'order_confirmation':
        await sendOrderConfirmation(body.recipient, body.data)
        break
      case 'order_status_update':
        await sendOrderStatusUpdate(body.recipient, body.data)
        break
      case 'order_completion':
        await sendOrderCompletion(body.recipient, body.data)
        break
      case 'website_integration':
        await sendWebsiteIntegration(body.recipient, body.data)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid notification type' },
          { status: 400 }
        )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Notification sent successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

async function sendOrderConfirmation(recipient: string, data: any) {
  // In a real app, this would send an email
  console.log('=== ORDER CONFIRMATION EMAIL ===')
  console.log(`To: ${recipient}`)
  console.log(`Subject: Order Confirmation - #${data.orderId}`)
  console.log(`Body: Dear ${data.clientName},`)
  console.log(`Your order #${data.orderId} has been confirmed.`)
  console.log(`Design: ${data.designName}`)
  console.log(`Quantity: ${data.quantity}`)
  console.log(`Total: $${data.totalPrice}`)
  console.log(`Expected delivery: ${data.expectedDelivery}`)
  console.log('Next steps: We will begin production and keep you updated.')
  console.log('================================')
}

async function sendOrderStatusUpdate(recipient: string, data: any) {
  // In a real app, this would send an email
  console.log('=== ORDER STATUS UPDATE EMAIL ===')
  console.log(`To: ${recipient}`)
  console.log(`Subject: Order Status Update - #${data.orderId}`)
  console.log(`Body: Dear ${data.clientName},`)
  console.log(`Your order #${data.orderId} status has been updated to: ${data.status}`)
  console.log(`Current status: ${data.status}`)
  console.log(`Updated on: ${data.updatedAt}`)
  if (data.notes) {
    console.log(`Notes: ${data.notes}`)
  }
  console.log('================================')
}

async function sendOrderCompletion(recipient: string, data: any) {
  // In a real app, this would send an email
  console.log('=== ORDER COMPLETION EMAIL ===')
  console.log(`To: ${recipient}`)
  console.log(`Subject: Order Completed - #${data.orderId}`)
  console.log(`Body: Dear ${data.clientName},`)
  console.log(`Great news! Your order #${data.orderId} has been completed.`)
  console.log(`Design: ${data.designName}`)
  console.log(`Quantity: ${data.quantity}`)
  console.log(`Completed on: ${data.completedAt}`)
  console.log('Your order is ready for pickup/delivery.')
  console.log('Thank you for choosing our services!')
  console.log('================================')
}

async function sendWebsiteIntegration(recipient: string, data: any) {
  // In a real app, this would send an email with website integration details
  console.log('=== WEBSITE INTEGRATION EMAIL ===')
  console.log(`To: ${recipient}`)
  console.log(`Subject: Website Integration Setup - Order #${data.orderId}`)
  console.log(`Body: Dear ${data.clientName},`)
  console.log(`Your order #${data.orderId} has been processed and is ready for website integration.`)
  console.log(`Design: ${data.designName}`)
  console.log(`Integration URL: ${data.integrationUrl}`)
  console.log(`API Key: ${data.apiKey}`)
  console.log(`Next steps:`)
  console.log(`1. Visit your website dashboard`)
  console.log(`2. Navigate to the menu section`)
  console.log(`3. Upload the design files we've provided`)
  console.log(`4. Configure the menu layout settings`)
  console.log(`5. Test the integration`)
  console.log(`Need help? Contact our support team.`)
  console.log('================================')
} 