'use client';

import { Button } from "@/components/ui/button";

interface IProps {
    title: string;
    isLoading: boolean;
    icon?: React.ReactNode;
    className?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined
}
const SubmitButton = ({ title, isLoading, icon, className, variant = 'default', size = 'default' }: IProps) => {
    return <>
        <Button
            disabled={isLoading}
            className={`w-full font-semibold rounded-full cursor-pointer ${className || ''}`}
            variant={variant}
            type="submit"
            size={size}
        >
            {icon && icon}
            {title}
        </Button >
    </>;
};

export default SubmitButton;