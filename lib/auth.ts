import crypto from "crypto"

// Simple password hashing using crypto (in production, use bcrypt)
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Generate JWT-like token for session management
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex")
}
