import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, total, customer, shipping } = body

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      )
    }

    if (!customer || !customer.firstName || !customer.lastName || !customer.email) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      )
    }

    if (!shipping || !shipping.address || !shipping.city || !shipping.zipCode) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      )
    }

    // Create or find customer
    let existingCustomer = await prisma.customer.findUnique({
      where: { email: customer.email }
    })

    if (!existingCustomer) {
      existingCustomer = await prisma.customer.create({
        data: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone || null,
        }
      })
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: existingCustomer.id,
        total,
        status: 'PENDING',
        shippingName: `${customer.firstName} ${customer.lastName}`,
        shippingEmail: customer.email,
        shippingPhone: customer.phone || null,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingState: shipping.state || null,
        shippingZip: shipping.zipCode,
        shippingCountry: shipping.country || 'US',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        customer: true
      }
    })

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
    }

    return NextResponse.json(order, { status: 201 })

  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}