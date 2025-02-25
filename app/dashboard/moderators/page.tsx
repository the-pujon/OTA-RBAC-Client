import { MoreHorizontal, Shield, Trash, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// This would typically come from your API/database
const moderators = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    role: "Senior Moderator",
    activeStatus: "Active",
    joinedDate: "Feb 2024",
    postsModerated: 234,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg",
    role: "Moderator",
    activeStatus: "Active",
    joinedDate: "Jan 2024",
    postsModerated: 156,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg",
    role: "Junior Moderator",
    activeStatus: "Inactive",
    joinedDate: "Dec 2023",
    postsModerated: 89,
  },
]

export default function ModeratorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Moderators</h1>
          <p className="text-muted-foreground">Manage your site moderators and their permissions.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/moderators/create">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Moderator
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {moderators.map((moderator) => (
          <Card key={moderator.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <Image
                  src={moderator.avatar || "/placeholder.svg"}
                  alt={moderator.name}
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <CardTitle className="text-base">{moderator.name}</CardTitle>
                  <CardDescription>{moderator.email}</CardDescription>
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
                  <span className="text-sm font-medium">{moderator.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      moderator.activeStatus === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {moderator.activeStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm">{moderator.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Posts Moderated</span>
                  <span className="text-sm">{moderator.postsModerated.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

