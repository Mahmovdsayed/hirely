'use client';

import { Moon, Sun, Check, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ModeToggle = () => {
    const { setTheme, theme } = useTheme();

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border shadow-none transition-all duration-300">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-30 rounded-xl p-1 shadow-lg border-muted/50 backdrop-blur-md bg-background/80">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun /> Light
                    {theme === 'light' && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon /> Dark
                    {theme === 'dark' && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Settings /> System
                    {theme === 'system' && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>;
};

export default ModeToggle;