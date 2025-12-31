"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import type React from "react"

interface SearchFiltersProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  onDistanceChange: (distance: string) => void
  selectedCategory: string
  selectedDistance: string
}

const categories = ["all", "vegetables", "fruits", "grains", "dairy", "proteins", "prepared-meals", "bakery"]
const distances = ["all", "5km", "10km", "25km", "50km"]

export function SearchFilters({
  onSearch,
  onCategoryChange,
  onDistanceChange,
  selectedCategory,
  selectedDistance,
}: SearchFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search by Title</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
            <Input placeholder="Search donations..." className="pl-10" onChange={handleSearchChange} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Distance</label>
          <select
            value={selectedDistance}
            onChange={(e) => onDistanceChange(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {distances.map((dist) => (
              <option key={dist} value={dist}>
                {dist === "all" ? "Any Distance" : `Within ${dist}`}
              </option>
            ))}
          </select>
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
