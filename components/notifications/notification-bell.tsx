"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface NotificationBellProps {
  unreadCount: number
  onClick: () => void
}

export function NotificationBell({ unreadCount, onClick }: NotificationBellProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="relative">
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-bold">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Button>
  )
}
