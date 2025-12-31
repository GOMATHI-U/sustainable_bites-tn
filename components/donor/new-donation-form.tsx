"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface NewDonationFormProps {
  onSuccess: () => void
}

export function NewDonationForm({ onSuccess }: NewDonationFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "vegetables",
    quantity: "",
    address: "",
    expiryDate: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = ["vegetables", "fruits", "grains", "dairy", "proteins", "prepared-meals", "bakery", "other"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to create donation")
        return
      }

      setFormData({
        title: "",
        description: "",
        category: "vegetables",
        quantity: "",
        address: "",
        expiryDate: "",
      })
      onSuccess()
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post New Donation</CardTitle>
        <CardDescription>Share surplus food with your community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium">
                Food Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Fresh Organic Vegetables"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Details about the food, condition, and any allergen information"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="e.g., 5 kg, 10 portions"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">
                Pickup Location
              </label>
              <Input
                id="address"
                name="address"
                placeholder="Full address for pickup"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="expiryDate" className="text-sm font-medium">
                Expiry Date / Best Before
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="datetime-local"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Posting..." : "Post Donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
