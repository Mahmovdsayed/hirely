'use client';

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import SubmitButton from "../ui/SubmitButton";
import { Save } from "lucide-react";

interface FormDrawerProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactNode
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
    submitLabel?: string
    cancelLabel?: string
    onSubmit?: () => void
    loading: boolean
    isSubmitDisabled?: boolean
}

export function FormDrawer({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    className,
    submitLabel = "Save Changes",
    cancelLabel = "Cancel",
    onSubmit,
    loading,
    isSubmitDisabled
}: FormDrawerProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
            <DrawerContent className={cn("md:min-w-3/4 lg:min-w-2/5 min-w-full md:rounded-l-4xl bg-card", className)}>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    {description && <DrawerDescription>{description}</DrawerDescription>}
                </DrawerHeader>

                <div className="no-scrollbar overflow-y-auto px-4 pb-4">
                    {children}
                </div>

                <DrawerFooter>
                    {footer ? footer : (
                        <>
                            {onSubmit && (
                                <SubmitButton
                                    title={loading ? 'Saving...' : submitLabel}
                                    isLoading={loading}
                                    disabled={isSubmitDisabled}
                                    className="rounded-full"
                                    onClick={onSubmit}
                                    type="submit"
                                    size="lg"
                                    icon={<Save />}
                                />
                            )}
                            <DrawerClose asChild>
                                <Button className="rounded-full" size="lg" variant="secondary">
                                    {cancelLabel}
                                </Button>
                            </DrawerClose>
                        </>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
