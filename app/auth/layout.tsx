import SilkWrapper from "@/components/layout/auth/SilkWrapper";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="grid min-h-svh xl:grid-cols-2">
            <div className="flex flex-col ">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full py-20 xl:max-w-2xl px-4 md:px-8">
                        {children}
                    </div>
                </div>
            </div>
            <SilkWrapper />
        </div>
    );
}