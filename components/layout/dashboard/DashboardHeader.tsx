'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ModeToggle from './ModeToggle'
import React from 'react'

const DashboardHeader = () => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b mb-5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ms-1" />
                <Separator orientation="vertical" className="me-2 h-4" />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {segments.slice(1).map((segment, index) => {
                            const href = `/dashboard/${segments.slice(1, index + 2).join('/')}`
                            const isLast = index === segments.length - 2

                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="capitalize">
                                                {segment}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={href} className="capitalize">
                                                    {segment}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>

            </div>

            <div className="flex items-center gap-2 px-4">
                <ModeToggle />
            </div>
        </header>
    )
}

export default DashboardHeader
