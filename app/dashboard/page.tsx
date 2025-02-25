import { ArrowUpRight, Eye, Shield, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from your API/database
const stats = [
  {
    title: "Total Posts",
    value: "2,345",
    description: "Posts created this month",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Eye,
  },
  {
    title: "Active Moderators",
    value: "12",
    description: "Active in last 7 days",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Shield,
  },
  {
    title: "Total Users",
    value: "1,234",
    description: "Registered users",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Users,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "post",
    title: "New Post Created",
    description: "A new post was created by John Doe",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "moderator",
    title: "New Moderator Added",
    description: "Sarah Smith was promoted to moderator",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "user",
    title: "User Report",
    description: "Multiple reports on post #123",
    time: "1 day ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/dashboard/moderators">
              <Users className="mr-2 h-4 w-4" />
              View Team
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/posts/create">
              <Eye className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
              <div
                className={`mt-3 inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                <ArrowUpRight className="mr-1 h-3 w-3" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-4">
              <div className="absolute left-3 top-0 h-full w-px bg-muted" />
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="relative grid gap-1 pl-8 before:absolute before:left-2 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary"
                >
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/posts/create">
                <Eye className="mr-2 h-4 w-4" />
                Create New Post
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/moderators/create">
                <Shield className="mr-2 h-4 w-4" />
                Add Moderator
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

