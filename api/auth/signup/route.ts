import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json()

    console.log("[v0] Signup request received:", { name, email, userType })

    // Validate input
    if (!name || !email || !password || !userType) {
      console.log("[v0] Validation failed - missing fields")
      return NextResponse.json({ message: "All fields required" }, { status: 400 })
    }

    if (!["donor", "receptor"].includes(userType)) {
      console.log("[v0] Invalid user type:", userType)
      return NextResponse.json({ message: "Invalid user type" }, { status: 400 })
    }

    // Mock user creation - in production, save to database
    const newUser = {
      id: "user-" + Math.random().toString(36),
      name,
      email,
      userType,
    }

    console.log("[v0] User created successfully:", newUser.id)
    return NextResponse.json({
      token: "mock-token-" + Math.random().toString(36),
      userType,
      user: newUser,
    })
  } catch (error) {
    console.log("[v0] Signup error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ message: error instanceof Error ? error.message : "An error occurred" }, { status: 500 })
  }
}
