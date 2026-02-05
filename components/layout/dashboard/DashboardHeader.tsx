'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ModeToggle from "./ModeToggle";

const DashboardHeader = () => {
    const pathName = usePathname();
    const segments = pathName.split('/').filter(Boolean);

    return <>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b mb-5">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ms-1" />
                <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem >
                            <BreadcrumbLink asChild>
                                <Link className="capitalize" href="/dashboard">
                                    {segments}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {segments.map((segment, index) => {
                            if (index === 0 && segment === "dashboard") return null;
                            const href = `/${segments.slice(0, index + 1).join('/')}`;
                            const isLast = index === segments.length - 1;

                            return (
                                <React.Fragment key={segment}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>
                                                {segment}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link className="capitalize" href={href}>
                                                    {segment}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
                <ModeToggle />
            </div>
        </header>
    </>;
};

export default DashboardHeader;