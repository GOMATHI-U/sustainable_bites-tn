"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagementTable } from "@/components/admin/user-management-table"
import { DonationReviewTable } from "@/components/admin/donation-review-table"
import { Leaf, LogOut } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  userType: "donor" | "receptor"
  joinedDate: string
  donations?: number
  claims?: number
  status: "active" | "suspended"
}

interface DonationReview {
  id: string
  title: string
  donor: string
  status: "pending" | "approved" | "flagged"
  reason?: string
  createdDate: string
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [donations, setDonations] = useState<DonationReview[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In production, verify admin role
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // Mock data
    const mockUsers: User[] = [
      {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        userType: "donor",
        joinedDate: "2024-12-01",
        donations: 12,
        status: "active",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        userType: "receptor",
        joinedDate: "2024-12-10",
        claims: 5,
        status: "active",
      },
      {
        id: "3",
        name: "Mike Davis",
        email: "mike@example.com",
        userType: "donor",
        joinedDate: "2024-11-15",
        donations: 8,
        status: "active",
      },
    ]

    const mockDonations: DonationReview[] = [
      {
        id: "1",
        title: "Fresh Vegetables",
        donor: "Green Farm Co-op",
        status: "approved",
        createdDate: "2025-01-01",
      },
      {
        id: "2",
        title: "Suspicious Items",
        donor: "Unknown Donor",
        status: "flagged",
        reason: "Missing allergen information and unclear food condition",
        createdDate: "2024-12-30",
      },
      {
        id: "3",
        title: "Homemade Pasta",
        donor: "Jane's Kitchen",
        status: "pending",
        createdDate: "2024-12-31",
      },
    ]

    setUsers(mockUsers)
    setDonations(mockDonations)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const handleSuspendUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)),
    )
  }

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const handleApproveDonation = (id: string) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status: "approved" as const } : d)))
  }

  const handleRejectDonation = (id: string) => {
    setDonations((prev) => prev.filter((d) => d.id !== id))
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const stats = {
    totalUsers: users.length,
    totalDonors: users.filter((u) => u.userType === "donor").length,
    totalReceptors: users.filter((u) => u.userType === "receptor").length,
    totalDonations: donations.length,
    activeDonations: donations.filter((d) => d.status === "approved").length,
    foodSaved: "156 lbs",
    carbonSaved: "42 tons",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <AdminStats {...stats} />

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto">
            <TabsTrigger
              value="users"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="donations"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Review Donations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagementTable users={users} onSuspend={handleSuspendUser} onDelete={handleDeleteUser} />
          </TabsContent>

          <TabsContent value="donations">
            <DonationReviewTable
              donations={donations}
              onApprove={handleApproveDonation}
              onReject={handleRejectDonation}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
