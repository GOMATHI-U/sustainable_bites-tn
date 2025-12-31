"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Trash2 } from "lucide-react"

interface DonationCardProps {
  id: string
  title: string
  description: string
  category: string
  quantity: string
  address: string
  expiryDate: string
  status: "available" | "claimed" | "completed" | "expired"
  claimedBy?: string
  onDelete: (id: string) => void
}

export function DonationCard({
  id,
  title,
  description,
  category,
  quantity,
  address,
  expiryDate,
  status,
  claimedBy,
  onDelete,
}: DonationCardProps) {
  const statusColors = {
    available: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    claimed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    expired: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge className="mt-2 bg-secondary text-secondary-foreground">{category}</Badge>
          </div>
          <Badge className={statusColors[status]}>{status}</Badge>
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
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Expires: {expiryDate}</span>
          </div>
        </div>

        {claimedBy && (
          <div className="bg-muted p-2 rounded text-sm">
            <span className="text-muted-foreground">Claimed by: </span>
            <span className="font-semibold text-foreground">{claimedBy}</span>
          </div>
        )}

        {status === "available" && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Donation
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
