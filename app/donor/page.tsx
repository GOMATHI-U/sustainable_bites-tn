"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewDonationForm } from "@/components/donor/new-donation-form"
import { DonationCard } from "@/components/donor/donation-card"
import { Leaf, LogOut, Settings } from "lucide-react"

interface Donation {
  id: string
  title: string
  description: string
  category: string
  quantity: string
  address: string
  expiryDate: string
  status: "available" | "claimed" | "completed" | "expired"
  claimedBy?: string
}

export default function DonorDashboard() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewForm, setShowNewForm] = useState(false)
  const [stats, setStats] = useState({ total: 0, available: 0, claimed: 0 })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    const userType = localStorage.getItem("userType")
    if (!token || userType !== "donor") {
      router.push("/login")
      return
    }

    // Fetch donations (mock data for now)
    const mockDonations: Donation[] = [
      {
        id: "1",
        title: "Fresh Organic Vegetables",
        description: "Just harvested this morning - carrots, lettuce, and broccoli",
        category: "vegetables",
        quantity: "5 kg",
        address: "123 Green St, Portland, OR",
        expiryDate: "2025-01-03",
        status: "available",
      },
      {
        id: "2",
        title: "Homemade Lasagna",
        description: "Fresh lasagna with vegetarian filling, stored properly",
        category: "prepared-meals",
        quantity: "3 portions",
        address: "456 Oak Ave, Portland, OR",
        expiryDate: "2025-01-02",
        status: "claimed",
        claimedBy: "Sarah M.",
      },
    ]

    setDonations(mockDonations)
    setStats({
      total: mockDonations.length,
      available: mockDonations.filter((d) => d.status === "available").length,
      claimed: mockDonations.filter((d) => d.status === "claimed").length,
    })
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const handleDeleteDonation = (id: string) => {
    setDonations((prev) => prev.filter((d) => d.id !== id))
    // Call API to delete in production
  }

  const handleNewDonation = () => {
    setShowNewForm(false)
    // Refresh donations list
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Sustainable Bites - Donor</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.available}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Claimed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.claimed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <NewDonationForm onSuccess={handleNewDonation} />
          </div>

          {/* Donations List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Donations</h2>
              {donations.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No donations yet. Post your first donation above!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {donations.map((donation) => (
                    <DonationCard key={donation.id} {...donation} onDelete={handleDeleteDonation} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
