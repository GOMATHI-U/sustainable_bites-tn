"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Shield } from "lucide-react"
import { useState } from "react"

interface User {
  id: string
  name: string
  email: string
  userType: "donor" | "receptor"
  joinedDate: string
  donations?: number
  claims?: number
  status: "active" | "suspended"
}

interface UserManagementTableProps {
  users: User[]
  onSuspend: (id: string) => void
  onDelete: (id: string) => void
}

export function UserManagementTable({ users, onSuspend, onDelete }: UserManagementTableProps) {
  const [expandedUser, setExpandedUser] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <Badge variant={user.userType === "donor" ? "default" : "secondary"}>
                      {user.userType === "donor" ? "Donor" : "Receptor"}
                    </Badge>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status === "active" ? "Active" : "Suspended"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">Joined: {user.joinedDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                  >
                    {expandedUser === user.id ? "Hide" : "Details"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSuspend(user.id)}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(user.id)}
                    className="text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {expandedUser === user.id && (
                <div className="mt-3 pt-3 border-t border-border space-y-2 text-sm">
                  {user.userType === "donor" && user.donations && (
                    <p>
                      <span className="text-muted-foreground">Donations Posted:</span>
                      <span className="ml-2 font-semibold">{user.donations}</span>
                    </p>
                  )}
                  {user.userType === "receptor" && user.claims && (
                    <p>
                      <span className="text-muted-foreground">Donations Claimed:</span>
                      <span className="ml-2 font-semibold">{user.claims}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
