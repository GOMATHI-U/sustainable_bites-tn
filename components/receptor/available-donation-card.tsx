"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Truck, Heart } from "lucide-react"
import { useState } from "react"

interface AvailableDonationCardProps {
  id: string
  title: string
  description: string
  category: string
  quantity: string
  address: string
  distance: string
  expiryDate: string
  donorName: string
  onClaim: (id: string) => void
  isClaimed?: boolean
}

export function AvailableDonationCard({
  id,
  title,
  description,
  category,
  quantity,
  address,
  distance,
  expiryDate,
  donorName,
  onClaim,
  isClaimed = false,
}: AvailableDonationCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">by {donorName}</p>
            <Badge className="mt-2 bg-accent text-accent-foreground">{category}</Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)} className="h-8 w-8">
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-foreground">Quantity:</span>
            <span className="text-muted-foreground">{quantity}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{distance} away</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Available until: {expiryDate}</span>
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => onClaim(id)} disabled={isClaimed}>
          {isClaimed ? "Already Claimed" : "Claim This Donation"}
        </Button>
      </CardContent>
    </Card>
  )
}
