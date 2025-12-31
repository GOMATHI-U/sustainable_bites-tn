"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MapMarker {
  id: string
  lat: number
  lng: number
  title: string
  category: string
  distance: string
}

interface DonationMapProps {
  markers: MapMarker[]
  onMarkerClick?: (marker: MapMarker) => void
}

export function DonationMap({ markers, onMarkerClick }: DonationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Simple canvas-based map visualization since we can't use external map APIs
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = mapContainer.current.clientWidth
    canvas.height = 400

    // Background
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw markers
    markers.forEach((marker, index) => {
      const x = 100 + index * 120
      const y = 200 + Math.sin(index) * 50

      // Marker circle
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Marker outline
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Label
      ctx.fillStyle = "#000"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(marker.title.substring(0, 8), x, y + 25)
    })

    // Add canvas to DOM
    mapContainer.current.innerHTML = ""
    mapContainer.current.appendChild(canvas)
  }, [markers])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Donations</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainer}
          className="w-full h-96 bg-muted rounded-lg flex items-center justify-center border border-border"
        >
          <p className="text-muted-foreground">Map loading...</p>
        </div>
      </CardContent>
    </Card>
  )
}
