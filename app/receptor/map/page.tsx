"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonationMap } from "@/components/map/donation-map"
import { LocationPicker } from "@/components/location/location-picker"
import { Leaf, LogOut } from "lucide-react"

interface MapMarker {
  id: string
  lat: number
  lng: number
  title: string
  category: string
  distance: string
}

export default function MapPage() {
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    const userType = localStorage.getItem("userType")
    if (!token || userType !== "receptor") {
      router.push("/login")
      return
    }

    // Mock markers for donations
    const mockMarkers: MapMarker[] = [
      {
        id: "1",
        lat: 45.5152,
        lng: -122.6784,
        title: "Fresh Vegetables",
        category: "vegetables",
        distance: "2.3 km",
      },
      {
        id: "2",
        lat: 45.52,
        lng: -122.68,
        title: "Bread Assortment",
        category: "bakery",
        distance: "5.1 km",
      },
      {
        id: "3",
        lat: 45.51,
        lng: -122.67,
        title: "Mixed Berries",
        category: "fruits",
        distance: "8.7 km",
      },
      {
        id: "4",
        lat: 45.525,
        lng: -122.69,
        title: "Rice & Pasta",
        category: "grains",
        distance: "3.2 km",
      },
    ]

    setMarkers(mockMarkers)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const handleLocationSelect = (location: { address: string; lat: number; lng: number }) => {
    setUserLocation({ lat: location.lat, lng: location.lng })
    // In production, refetch donations based on new location
  }

  const handleMarkerClick = (marker: MapMarker) => {
    // Navigate to donation details or show modal
    router.push(`/receptor/donation/${marker.id}`)
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
            <h1 className="text-xl font-bold">Find Food Near You</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Location Picker */}
          <div className="lg:col-span-1">
            <LocationPicker onLocationSelect={handleLocationSelect} />

            {/* Nearby Donations Count */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Nearby Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{markers.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <DonationMap markers={markers} onMarkerClick={handleMarkerClick} />

            {/* Marker List */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Nearby Donations List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {markers.map((marker) => (
                    <div
                      key={marker.id}
                      className="flex justify-between items-center p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleMarkerClick(marker)}
                    >
                      <div>
                        <p className="font-semibold text-foreground">{marker.title}</p>
                        <p className="text-sm text-muted-foreground">{marker.distance} away</p>
                      </div>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {marker.category}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
