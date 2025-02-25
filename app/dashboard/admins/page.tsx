"use client"

import { Crown, MoreHorizontal, Trash } from "lucide-react"
// import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useGetAdminsQuery, useRemoveAdminMutation } from "@/redux/features/admin/adminApi"
import { withAuth } from "@/components/auth/withAuth"


function AdminsPage() {
  const {data: adminData} = useGetAdminsQuery({})
  const [removeAdmin] = useRemoveAdminMutation()
  const admins = adminData?.data || []
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {admins.map((admin: any) => (
          <Card key={admin._id} className="relative overflow-hidden">
            {admin.role === "superAdmin" && (
              <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-2 py-1">
                <Crown className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                {/* <Image
                  src={admin.avatar || "/placeholder.svg"}
                  alt={admin.name}
                  className="rounded-full"
                  width={40}
                  height={40}
                /> */}
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
                  <DropdownMenuItem className="text-red-600" onClick={()=>{removeAdmin(admin._id)}}>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default withAuth(AdminsPage,['superAdmin']);