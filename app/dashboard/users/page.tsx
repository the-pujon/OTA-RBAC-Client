"use client"

import { useState } from "react"
import { Crown, Shield, User } from "lucide-react"
// import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetUsersQuery } from "@/redux/features/auth/authApi"
import { useMakeModeratorMutation } from "@/redux/features/moderator/moderatorApi"
import { useMakeAdminMutation } from "@/redux/features/admin/adminApi"
import { withAuth } from "@/components/auth/withAuth"
// import { useAppSelector } from "@/redux/hook"
// import { useCurrentToken } from "@/redux/features/auth/authSlice"
import { parseJwt } from "@/utils/isTokenExpired"
import { getAuthCookie } from "@/utils/cookies"

interface User {
  _id: string
  name: string
  email: string
  avatar: string
  role: "user" | "moderator" | "admin" | "superAdmin"
  status: "Active" | "Inactive"
  createdAt: string
  // lastActive: string
}

// This would typically come from your API/database
// const users: User[] = [
//   {
//     id: "1",
//     name: "Alex Johnson",
//     email: "alex@example.com",
//     avatar: "/placeholder.svg",
//     role: "Admin",
//     status: "Active",
//     joinedDate: "2024-01-15",
//     lastActive: "2024-02-24",
//   },
//   {
//     id: "2",
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     avatar: "/placeholder.svg",
//     role: "Moderator",
//     status: "Active",
//     joinedDate: "2024-01-20",
//     lastActive: "2024-02-23",
//   },
//   {
//     id: "3",
//     name: "Michael Brown",
//     email: "michael@example.com",
//     avatar: "/placeholder.svg",
//     role: "User",
//     status: "Active",
//     joinedDate: "2024-02-01",
//     lastActive: "2024-02-24",
//   },
// ]

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [makeModerator] = useMakeModeratorMutation()
  const [makeAdmin] = useMakeAdminMutation()
  // console.log(admin)
  const token = getAuthCookie();

  const role = parseJwt(token as string).role;
  console.log(role)

 
  const {data: userData} = useGetUsersQuery({})
  const users: User[] = userData?.data || []

  console.log(users)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter
    return matchesSearch && matchesRole
  })
 

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-primary" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "superAdmin":
        return <div className="flex items-center justify-center"><Crown className="h-4 w-4 text-primary" /><Crown className="h-4 w-4 text-primary" /></div>
      default:
        return <User className="h-4 w-4 text-muted-foreground" />
    }
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: User,
    },
    {
      title: "Admins",
      value: users.filter((u) => u.role === "admin").length,
      icon: Crown,
    },
    {
      title: "Moderators",
      value: users.filter((u) => u.role === "moderator").length,
      icon: Shield,
    },
  ]

  return (
    <div className="space-y-8" suppressHydrationWarning={true}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <p className="text-muted-foreground">Manage users and their roles across the platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <div className="absolute right-2 top-2 rounded-full bg-primary/10 p-2.5">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="moderator">Moderators</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  {/* <TableHead>Last Active</TableHead> */}
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.status === "Active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    {/* <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell> */}
                    <TableCell>
                     <div className="flex items-center gap-2">
                        <Button 
                        disabled={role === "admin" || role === "moderator" || user.role === "user" || user.role === "superAdmin"}
                        onClick={()=>
                          makeAdmin(user._id)
                            .then(() => alert("User made admin"))
                            .catch((error) => alert(error.message))
                        } >Make Admin</Button>
                        <Button 
                         disabled={user.role === "superAdmin"}
                        onClick={()=>
                          makeModerator(user._id)
                            .then(() => alert("User made moderator"))
                            .catch((error) => alert(error.message))
                        }>Make Moderator</Button>
                     </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(UsersPage,['admin','superAdmin']);