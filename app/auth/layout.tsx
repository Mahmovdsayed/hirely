import SilkWrapper from "@/components/layout/auth/SilkWrapper";
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
            <SilkWrapper />
        </div>
    );
}