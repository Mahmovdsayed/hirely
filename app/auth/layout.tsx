'use client'
import Silk from "@/components/sections/Silk";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col ">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full lg:max-w-xl">
                        {children}
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Silk
                    speed={5}
                    scale={1}
                    color="#2563EB"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
        </div>
    );
}