import { Crown, MoreHorizontal, Shield, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// This would typically come from your API/database
const admins = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg",
    role: "Super Admin",
    activeStatus: "Active",
    joinedDate: "Jan 2023",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg",
    role: "System Admin",
    activeStatus: "Active",
    joinedDate: "Mar 2023",
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "/placeholder.svg",
    role: "Content Admin",
    activeStatus: "Inactive",
    joinedDate: "Jun 2023",
    lastActive: "3 days ago",
  },
]

export default function AdminsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Administrators</h1>
          <p className="text-muted-foreground">Manage your system administrators and their roles.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admins/create">
            <Crown className="mr-2 h-4 w-4" />
            Add Admin
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => (
          <Card key={admin.id} className="relative overflow-hidden">
            {admin.role === "Super Admin" && (
              <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-2 py-1">
                <Crown className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <Image
                  src={admin.avatar || "/placeholder.svg"}
                  alt={admin.name}
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <CardTitle className="text-base">{admin.name}</CardTitle>
                  <CardDescription>{admin.email}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <span className="text-sm font-medium">{admin.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      admin.activeStatus === "Active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {admin.activeStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm">{admin.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <span className="text-sm">{admin.lastActive}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

