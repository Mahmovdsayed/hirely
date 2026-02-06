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
import Link from "next/link"

const data = {
  user: {
    name: "Mahmoud",
    email: "mahmoud@hirely.cc",
    avatar: "https://i.pinimg.com/736x/ad/f1/c1/adf1c19ed9550bbf5617416759ab6742.jpg",
  },
  navMain: [
    { title: "Profile Management", url: "/dashboard/profile", icon: User },
    { title: "Skills Management", url: "/dashboard/skills", icon: Sparkles },
    { title: "Works Management", url: "/dashboard/works", icon: Briefcase },
    { title: "Educations Management", url: "/dashboard/educations", icon: GraduationCap },
    { title: "Certificates Management", url: "/dashboard/certificates", icon: Award },
    { title: "Projects Management", url: "/dashboard/projects", icon: FolderKanban },
    { title: "Contacts Management", url: "/dashboard/contacts", icon: Contact },
    { title: "CV Management", url: "/dashboard/cv", icon: FileText },
    { title: "FAQ Management", url: "/dashboard/faq", icon: HelpCircle },
    { title: "Testimonials Management", url: "/dashboard/testimonials", icon: MessageSquareQuote },
    { title: "Services Management", url: "/dashboard/services", icon: Wrench },
    { title: "Messages Management", url: "/dashboard/messages", icon: Mail },
  ],
  navSecondary: [
    { title: "Support", url: "/dashboard/support", icon: LifeBuoy },
    { title: "Analytics", url: "/dashboard/analytics", icon: PieChart },
    { title: "Feedback", url: "/dashboard/feedback", icon: MessageSquare },
  ],

  projects: [
    { name: "Subscription", url: "/dashboard/subscription", icon: Map },
    { name: "Billing", url: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
    { name: "AI Assistant", url: "/dashboard/ai-assistant", icon: Bot },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">Hirely</span>
                  <span className="truncate text-xs"><strong>Free</strong> Plan</span>
                </div>
              </Link>
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
