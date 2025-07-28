import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST() {
  try {
    // Clear existing data (optional - you might want to skip this)
    await prisma.order.deleteMany()
    await prisma.client.deleteMany()
    await prisma.design.deleteMany()
    await prisma.employee.deleteMany()

    // Seed employees
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    const employees = await Promise.all([
      prisma.employee.create({
        data: {
          name: 'John Admin',
          email: 'admin@menu-design.com',
          role: 'admin',
        }
      }),
      prisma.employee.create({
        data: {
          name: 'Sarah Sales',
          email: 'sarah@menu-design.com',
          role: 'sales',
        }
      }),
      prisma.employee.create({
        data: {
          name: 'Mike Designer',
          email: 'mike@menu-design.com',
          role: 'designer',
        }
      }),
      prisma.employee.create({
        data: {
          name: 'Lisa Manager',
          email: 'lisa@menu-design.com',
          role: 'manager',
        }
      })
    ])

    // Seed clients
    const clients = await Promise.all([
      prisma.client.create({
        data: {
          name: 'Restaurant ABC',
          email: 'contact@restaurantabc.com',
          phone: '+1-555-0101',
          company: 'ABC Restaurant Group',
          address: '123 Main St, City, State 12345'
        }
      }),
      prisma.client.create({
        data: {
          name: 'Cafe XYZ',
          email: 'info@cafexyz.com',
          phone: '+1-555-0202',
          company: 'XYZ Cafe Chain',
          address: '456 Oak Ave, City, State 12345'
        }
      }),
      prisma.client.create({
        data: {
          name: 'Pizzeria Delicious',
          email: 'orders@pizzeriadelicious.com',
          phone: '+1-555-0303',
          company: 'Delicious Pizza Co.',
          address: '789 Pine Rd, City, State 12345'
        }
      }),
      prisma.client.create({
        data: {
          name: 'Sushi Master',
          email: 'hello@sushimaster.com',
          phone: '+1-555-0404',
          company: 'Sushi Master Inc.',
          address: '321 Elm St, City, State 12345'
        }
      }),
      prisma.client.create({
        data: {
          name: 'Burger Joint',
          email: 'contact@burgerjoint.com',
          phone: '+1-555-0505',
          company: 'Burger Joint LLC',
          address: '654 Maple Dr, City, State 12345'
        }
      })
    ])

    // Seed designs
    const designs = await Promise.all([
      prisma.design.create({
        data: {
          name: 'Classic Restaurant Menu',
          description: 'Elegant and traditional menu design perfect for fine dining establishments',
          category: 'Fine Dining',
          price: 299.99,
          imageUrl: '/images/designs/classic-menu.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Modern Cafe Menu',
          description: 'Contemporary design with clean lines and modern typography',
          category: 'Cafe',
          price: 199.99,
          imageUrl: '/images/designs/modern-cafe.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Pizza Menu Design',
          description: 'Fun and appetizing design specifically for pizza restaurants',
          category: 'Pizza',
          price: 179.99,
          imageUrl: '/images/designs/pizza-menu.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Sushi Menu Template',
          description: 'Sophisticated design highlighting fresh ingredients and Japanese aesthetics',
          category: 'Sushi',
          price: 249.99,
          imageUrl: '/images/designs/sushi-menu.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Fast Food Menu',
          description: 'Bold and energetic design perfect for quick-service restaurants',
          category: 'Fast Food',
          price: 149.99,
          imageUrl: '/images/designs/fast-food.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Wedding Menu Design',
          description: 'Luxurious and romantic design for special events and weddings',
          category: 'Events',
          price: 399.99,
          imageUrl: '/images/designs/wedding-menu.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Seasonal Menu Template',
          description: 'Flexible design that adapts to seasonal changes and special promotions',
          category: 'Seasonal',
          price: 229.99,
          imageUrl: '/images/designs/seasonal-menu.jpg'
        }
      }),
      prisma.design.create({
        data: {
          name: 'Kids Menu Design',
          description: 'Colorful and playful design perfect for family-friendly restaurants',
          category: 'Family',
          price: 159.99,
          imageUrl: '/images/designs/kids-menu.jpg'
        }
      })
    ])

    // Seed orders
    const orders = await Promise.all([
      prisma.order.create({
        data: {
          clientId: clients[0].id,
          designId: designs[0].id,
          quantity: 1,
          totalPrice: designs[0].price,
          status: 'completed',
          notes: 'Classic design for our main restaurant',
          employeeId: employees[1].id
        }
      }),
      prisma.order.create({
        data: {
          clientId: clients[1].id,
          designId: designs[1].id,
          quantity: 1,
          totalPrice: designs[1].price,
          status: 'in_production',
          notes: 'Modern design for our new cafe location',
          employeeId: employees[1].id
        }
      }),
      prisma.order.create({
        data: {
          clientId: clients[2].id,
          designId: designs[2].id,
          quantity: 2,
          totalPrice: designs[2].price * 2,
          status: 'confirmed',
          notes: 'Two menus for our two locations',
          employeeId: employees[0].id
        }
      }),
      prisma.order.create({
        data: {
          clientId: clients[3].id,
          designId: designs[3].id,
          quantity: 1,
          totalPrice: designs[3].price,
          status: 'pending',
          notes: 'Sushi menu with custom modifications',
          employeeId: employees[2].id
        }
      }),
      prisma.order.create({
        data: {
          clientId: clients[4].id,
          designId: designs[4].id,
          quantity: 1,
          totalPrice: designs[4].price,
          status: 'completed',
          notes: 'Fast food menu for our new location',
          employeeId: employees[3].id
        }
      })
    ])

    return NextResponse.json({
      message: 'Database seeded successfully',
      summary: {
        employees: employees.length,
        clients: clients.length,
        designs: designs.length,
        orders: orders.length
      }
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 