"use client"

import React from "react"

import {
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  FolderKanban,
  Contact,
  FileText,
  HelpCircle,
  MessageSquareQuote,
  Wrench,
  Mail,
  LifeBuoy,
  PieChart,
  Map,
  Command,
  MessageSquare,
  CreditCard,
  Settings,
  Bot,
} from "lucide-react"


import { NavMain } from "@/components/layout/dashboard/nav-main"
import { NavProjects } from "@/components/layout/dashboard/nav-projects"
import { NavSecondary } from "@/components/layout/dashboard/nav-secondary"
import { NavUser } from "@/components/layout/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Mahmoud",
    email: "mahmoud@hirely.cc",
    avatar: "https://i.pinimg.com/736x/ad/f1/c1/adf1c19ed9550bbf5617416759ab6742.jpg",
  },
  navMain: [
    { title: "Profile Management", url: "#", icon: User },
    { title: "Skills Management", url: "#", icon: Sparkles },
    { title: "Works Management", url: "#", icon: Briefcase },
    { title: "Educations Management", url: "#", icon: GraduationCap },
    { title: "Certificates Management", url: "#", icon: Award },
    { title: "Projects Management", url: "#", icon: FolderKanban },
    { title: "Contacts Management", url: "#", icon: Contact },
    { title: "CV Management", url: "#", icon: FileText },
    { title: "FAQ Management", url: "#", icon: HelpCircle },
    { title: "Testimonials Management", url: "#", icon: MessageSquareQuote },
    { title: "Services Management", url: "#", icon: Wrench },
    { title: "Messages Management", url: "#", icon: Mail },
  ],
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Analytics", url: "#", icon: PieChart },
    { title: "Analysis", url: "#", icon: Map },
    { title: "Feedback", url: "#", icon: MessageSquare },
  ],

  projects: [
    { name: "Subscription", url: "#", icon: CreditCard },
    { name: "Settings", url: "#", icon: Settings },
    { name: "AI Assistant", url: "#", icon: Bot },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">Hirely</span>
                  <span className="truncate text-xs"><strong>Free</strong> Plan</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
