import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, quantity, address, expiryDate } = await request.json()

    // Validate input
    if (!title || !category || !quantity || !address || !expiryDate) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Mock donation creation - in production, save to database
    const newDonation = {
      id: "donation-" + Math.random().toString(36),
      title,
      description,
      category,
      quantity,
      address,
      expiryDate,
      status: "available",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newDonation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock donation retrieval - in production, fetch from database
    const donations = [
      {
        id: "1",
        title: "Fresh Vegetables",
        description: "Organic vegetables",
        category: "vegetables",
        quantity: "5 kg",
        address: "123 Green St",
        status: "available",
      },
    ]

    return NextResponse.json(donations)
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
