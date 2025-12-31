import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json()

    // Validate input
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 })
    }

    if (!["donor", "receptor"].includes(userType)) {
      return NextResponse.json({ message: "Invalid user type" }, { status: 400 })
    }

    // Mock user creation - in production, save to database
    const newUser = {
      id: "user-" + Math.random().toString(36),
      name,
      email,
      userType,
    }

    return NextResponse.json({
      token: "mock-token-" + Math.random().toString(36),
      userType,
      user: newUser,
    })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
