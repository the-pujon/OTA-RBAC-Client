import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className="mx-auto w-full max-w-screen-2xl">
      <SidebarProvider className="">
      <div className="relative flex min-h-screen mx-auto w-full max-w-screen-2xl ">
        <SidebarNav />
        <div className="flex-1">
          <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger />
            <div className="font-semibold">Admin Dashboard</div>
          </div>
          <div className="mx-auto w-full max-w-6xl p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  </div>
  )
}

