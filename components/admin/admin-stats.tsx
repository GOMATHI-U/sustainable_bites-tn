"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminStatsProps {
  totalUsers: number
  totalDonors: number
  totalReceptors: number
  totalDonations: number
  activeDonations: number
  foodSaved: string
  carbonSaved: string
}

export function AdminStats({
  totalUsers,
  totalDonors,
  totalReceptors,
  totalDonations,
  activeDonations,
  foodSaved,
  carbonSaved,
}: AdminStatsProps) {
  const stats = [
    { label: "Total Users", value: totalUsers, color: "text-blue-600" },
    { label: "Donors", value: totalDonors, color: "text-green-600" },
    { label: "Receptors", value: totalReceptors, color: "text-purple-600" },
    { label: "Total Donations", value: totalDonations, color: "text-orange-600" },
    { label: "Active Donations", value: activeDonations, color: "text-primary" },
    { label: "Food Saved", value: foodSaved, color: "text-green-600" },
    { label: "CO₂ Saved", value: carbonSaved, color: "text-emerald-600" },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
