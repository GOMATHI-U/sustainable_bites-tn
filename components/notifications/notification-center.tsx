"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Trash2 } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  type: "donation-claimed" | "new-donation" | "donation-ready" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
  relatedDonationId?: string
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

export function NotificationCenter({ notifications, onMarkAsRead, onDelete }: NotificationCenterProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getTypeColor = (type: string) => {
    switch (type) {
      case "donation-claimed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "new-donation":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "donation-ready":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <Badge variant="secondary">{notifications.filter((n) => !n.read).length} New</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-primary hover:bg-primary/90" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "bg-primary hover:bg-primary/90" : ""}
            >
              Unread
            </Button>
          </div>

          {/* Notifications List */}
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No notifications</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filtered.map((notification) => (
                <div
                  key={notification.id}
                  className={`border border-border rounded-lg p-3 cursor-pointer transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  } hover:bg-muted`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm text-foreground">{notification.title}</p>
                        <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                          {notification.type.replace("-", " ")}
                        </Badge>
                        {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>}
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.createdAt}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(notification.id)
                      }}
                      className="text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
