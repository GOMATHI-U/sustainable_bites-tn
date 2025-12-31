"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchFilters } from "@/components/receptor/search-filters"
import { AvailableDonationCard } from "@/components/receptor/available-donation-card"
import { Leaf, LogOut, Settings } from "lucide-react"

interface Donation {
  id: string
  title: string
  description: string
  category: string
  quantity: string
  address: string
  distance: string
  expiryDate: string
  donorName: string
  isClaimed?: boolean
}

export default function ReceptorDashboard() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDistance, setSelectedDistance] = useState("all")
  const [stats, setStats] = useState({ total: 0, claimed: 0, saved: "0 lbs" })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    const userType = localStorage.getItem("userType")
    if (!token || userType !== "receptor") {
      router.push("/login")
      return
    }

    // Mock data - available donations
    const mockDonations: Donation[] = [
      {
        id: "1",
        title: "Fresh Organic Vegetables",
        description: "Just harvested this morning - carrots, lettuce, and broccoli",
        category: "vegetables",
        quantity: "5 kg",
        address: "123 Green St, Portland, OR",
        distance: "2.3 km",
        expiryDate: "2025-01-03",
        donorName: "Green Farm Co-op",
      },
      {
        id: "2",
        title: "Artisan Bread Assortment",
        description: "Various freshly baked breads from this morning",
        category: "bakery",
        quantity: "8 loaves",
        address: "789 Baker's Lane, Portland, OR",
        distance: "5.1 km",
        expiryDate: "2025-01-02",
        donorName: "Sweet Bread Bakery",
      },
      {
        id: "3",
        title: "Mixed Berries",
        description: "Blueberries, raspberries, and strawberries",
        category: "fruits",
        quantity: "3 kg",
        address: "456 Orchard Way, Beaverton, OR",
        distance: "8.7 km",
        expiryDate: "2025-01-02",
        donorName: "Berry Fresh Farm",
      },
      {
        id: "4",
        title: "Rice and Pasta Bundle",
        description: "Brown rice and whole wheat pasta",
        category: "grains",
        quantity: "10 kg",
        address: "321 Pantry St, Portland, OR",
        distance: "3.2 km",
        expiryDate: "2025-01-05",
        donorName: "Community Food Bank",
      },
    ]

    setDonations(mockDonations)
    setFilteredDonations(mockDonations)
    setStats({
      total: mockDonations.length,
      claimed: 0,
      saved: "22 lbs",
    })
    setLoading(false)
  }, [router])

  // Filter donations based on search and filters
  useEffect(() => {
    let filtered = donations

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((d) => d.category === selectedCategory)
    }

    // Distance filter
    if (selectedDistance !== "all") {
      const maxDistance = Number.parseInt(selectedDistance)
      filtered = filtered.filter((d) => {
        const distance = Number.parseFloat(d.distance)
        return distance <= maxDistance
      })
    }

    setFilteredDonations(filtered)
  }, [searchQuery, selectedCategory, selectedDistance, donations])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const handleClaimDonation = (id: string) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, isClaimed: true } : d)))
    // Call API to claim donation in production
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
            <h1 className="text-xl font-bold">Sustainable Bites - Find Food</h1>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{filteredDonations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Claimed So Far</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.claimed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Food Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.saved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <SearchFilters
              onSearch={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onDistanceChange={setSelectedDistance}
              selectedCategory={selectedCategory}
              selectedDistance={selectedDistance}
            />
          </div>

          {/* Donations List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Available Near You</h2>
              {filteredDonations.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No donations found matching your filters. Try adjusting your search.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredDonations.map((donation) => (
                    <AvailableDonationCard key={donation.id} {...donation} onClaim={handleClaimDonation} />
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
