import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Mock authentication - in production, verify against database
    if (username === "admin" && password === "admin123") {
      const user = { id: "1", username: "admin", role: "admin" }
      const token = "mock-jwt-token" // In production, generate a real JWT

      return NextResponse.json({ user, token })
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Invalid request",error: error }, { status: 400 })
  }
}
