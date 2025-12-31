"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void
  initialLocation?: string
}

export function LocationPicker({ onLocationSelect, initialLocation = "" }: LocationPickerProps) {
  const [address, setAddress] = useState(initialLocation)
  const [loading, setLoading] = useState(false)

  const handleGetCurrentLocation = async () => {
    setLoading(true)
    try {
      const position = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
        )
      })

      // Mock reverse geocoding - in production, use actual geocoding service
      const mockAddress = `Location: ${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}`
      setAddress(mockAddress)
      onLocationSelect({
        address: mockAddress,
        lat: position.latitude,
        lng: position.longitude,
      })
    } catch (err) {
      console.error("Error getting location:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleConfirm = () => {
    if (address.trim()) {
      // Mock geocoding - in production, use actual geocoding service
      onLocationSelect({
        address: address.trim(),
        lat: 45.5152 + Math.random() * 0.1,
        lng: -122.6784 + Math.random() * 0.1,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <Input
            placeholder="Enter pickup/delivery address"
            value={address}
            onChange={handleAddressChange}
            type="text"
          />
        </div>
        <Button
          onClick={handleGetCurrentLocation}
          variant="outline"
          className="w-full bg-transparent"
          disabled={loading}
        >
          {loading ? "Getting location..." : "Use Current Location"}
        </Button>
        <Button onClick={handleConfirm} className="w-full bg-primary hover:bg-primary/90">
          Confirm Location
        </Button>
      </CardContent>
    </Card>
  )
}
