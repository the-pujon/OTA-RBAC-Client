// "use client"

// import { Eye, Home, Plus, Shield, User, Users } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { getAuthCookie } from "@/utils/cookies"
// import { parseJwt } from "@/utils/isTokenExpired"



// export function SidebarNav() {
//   const pathname = usePathname()

//    const token = getAuthCookie();
  
//     const role = parseJwt(token as string).role;
//     console.log(role)


//   const menuItems = {
//     overview: [
//       {
//         title: "Dashboard",
//         href: "/dashboard",
//         icon: Home,
//       },
//     ],
//     role === "moderator" || role === "superAdmin" && posts: [
//       {
//         title: "View Posts",
//         href: "/dashboard/posts",
//         icon: Eye,
//       },
//       {
//         title: "Create Post",
//         href: "/dashboard/posts/create",
//         icon: Plus,
//       },
//     ],
//     role === "admin" || role === "superAdmin" &&  users: [
//       {
//         title: "All Users",
//         href: "/dashboard/users",
//         icon: User,
//       },
//       role === "superAdmin" &&{
//         title: "Admins",
//         href: "/dashboard/admins",
//         icon: Shield,
//       },
//       role === "superAdmin" || role === "admin" &&
//       {
//         title: "Moderators",
//         href: "/dashboard/moderators",
//         icon: Users,
//       },
//     ],
//   }

//   return (
//     <Sidebar>
//       <SidebarHeader className="border-b bg-primary/5">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/dashboard">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//                   <Shield className="h-6 w-6 text-primary-foreground" />
//                 </div>
//                 <div className="flex flex-col gap-0.5">
//                   <span className="font-semibold">Admin Panel</span>
//                   <span className="text-xs text-muted-foreground">v1.0.0</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Overview</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.overview.map((item) => (
//                 <SidebarMenuItem key={item.href}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
//                     <Link href={item.href}>
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarGroup>
//           <SidebarGroupLabel>Posts Management</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.posts.map((item) => (
//                 <SidebarMenuItem key={item.href}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
//                     <Link href={item.href}>
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarGroup>
//           <SidebarGroupLabel>User Management</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.users.map((item) => (
//                 <SidebarMenuItem key={item.href}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
//                     <Link href={item.href}>
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }



"use client"

import { Eye, Home, Plus, Shield, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getAuthCookie } from "@/utils/cookies"
import { parseJwt } from "@/utils/isTokenExpired"

export function SidebarNav() {
  const pathname = usePathname()
  const token = getAuthCookie()
  
  const role = token ? parseJwt(token).role : null;
  console.log(role)

  // Define menu items conditionally
  const menuItems = {
    overview: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
    ],
    posts: (role === "moderator" || role === "superAdmin") ? [
      {
        title: "View Posts",
        href: "/dashboard/posts",
        icon: Eye,
      },
      {
        title: "Create Post",
        href: "/dashboard/posts/create",
        icon: Plus,
      },
    ] : [],
    users: (role === "admin" || role === "superAdmin") ? [
      {
        title: "All Users",
        href: "/dashboard/users",
        icon: User,
      },
      ...(role === "superAdmin" ? [{
        title: "Admins",
        href: "/dashboard/admins",
        icon: Shield,
      }] : []),
      {
        title: "Moderators",
        href: "/dashboard/moderators",
        icon: Users,
      },
    ] : [],
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b bg-primary/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold">Admin Panel</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Overview Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.overview.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Posts Section (Conditional) */}
        {menuItems.posts.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Posts Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.posts.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Users Section (Conditional) */}
        {menuItems.users.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>User Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.users.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
