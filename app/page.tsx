import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Users, MapPin, TrendingUp, ArrowRight, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Sustainable Bites</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
                  Reduce Waste, <span className="text-primary">Build Community</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Connect food donors with those in need. Share surplus food responsibly and make a real difference in
                  your community while reducing environmental impact.
                </p>
                <div className="flex gap-3 pt-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 h-80 flex items-center justify-center border border-primary/20">
                <div className="text-center space-y-4">
                  <Leaf className="h-24 w-24 text-primary mx-auto opacity-80" />
                  <p className="text-sm text-muted-foreground">Every donation matters</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Active Donors", value: "2,340+" },
                { label: "Food Shared", value: "15,680 lbs" },
                { label: "People Helped", value: "8,920+" },
                { label: "CO₂ Saved", value: "42 tons" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">How It Works</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Simple steps to share food and make an impact in your community
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Create Account",
                  description: "Sign up as a donor to share food or as a receptor to find available meals nearby.",
                },
                {
                  icon: MapPin,
                  title: "Find Nearby",
                  description: "Browse donations in your area using our location-based search and interactive map.",
                },
                {
                  icon: TrendingUp,
                  title: "Make Impact",
                  description: "Reduce waste, help others, and track your environmental contribution in real-time.",
                },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-3" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-8 h-80 flex items-center justify-center border border-primary/20">
                <div className="text-center space-y-4">
                  <Shield className="h-24 w-24 text-accent mx-auto opacity-80" />
                  <p className="text-sm text-muted-foreground">Safe, trusted platform</p>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">Why Join Us?</h2>
                <ul className="space-y-4">
                  {[
                    "Help reduce food waste in your community",
                    "Connect with like-minded individuals",
                    "Track your environmental impact",
                    "Access verified donors and recipients",
                    "Real-time notifications for opportunities",
                    "Build a sustainable future together",
                  ].map((benefit) => (
                    <li key={benefit} className="flex gap-3 items-start">
                      <Leaf className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to make a difference?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of community members reducing waste and helping others.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-bold">Sustainable Bites</span>
                </div>
                <p className="text-sm text-muted-foreground">Reducing food waste and building community.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 Sustainable Bites. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
