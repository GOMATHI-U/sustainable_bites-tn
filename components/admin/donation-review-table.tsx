"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

interface DonationReview {
  id: string
  title: string
  donor: string
  status: "pending" | "approved" | "flagged"
  reason?: string
  createdDate: string
}

interface DonationReviewTableProps {
  donations: DonationReview[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function DonationReviewTable({ donations, onApprove, onReject }: DonationReviewTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {donations.map((donation) => (
            <div key={donation.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{donation.title}</p>
                    <Badge
                      variant={
                        donation.status === "approved"
                          ? "default"
                          : donation.status === "flagged"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {donation.status === "pending" && "Pending Review"}
                      {donation.status === "approved" && "Approved"}
                      {donation.status === "flagged" && "Flagged"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">By {donation.donor}</p>
                  {donation.reason && <p className="text-xs text-destructive mt-1">{donation.reason}</p>}
                  <p className="text-xs text-muted-foreground mt-1">Posted: {donation.createdDate}</p>
                </div>

                {donation.status === "pending" && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onApprove(donation.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReject(donation.id)}
                      className="text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
