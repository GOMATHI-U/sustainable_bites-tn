import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 })
    }

    // Mock authentication - in production, verify against database
    if (email === "donor@example.com" && password === "password123") {
      return NextResponse.json({
        token: "mock-token-" + Math.random().toString(36),
        userType: "donor",
      })
    } else if (email === "receptor@example.com" && password === "password123") {
      return NextResponse.json({
        token: "mock-token-" + Math.random().toString(36),
        userType: "receptor",
      })
    } else {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
