import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Sustainable Bites</h1>
          <p className="text-muted-foreground">Reduce waste, build community</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
