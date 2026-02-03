'use client';

import { Button } from "@/components/ui/button";

interface IProps {
    title: string;
    isLoading: boolean;
    icon?: React.ReactNode;
    className?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
}
const SubmitButton = ({ title, isLoading, icon, className, variant = 'default', size = 'default', onClick, type = 'button', disabled = false }: IProps) => {
    return <>
        <Button
            disabled={isLoading || disabled}
            className={`w-full font-semibold rounded-full cursor-pointer ${className || ''}`}
            variant={variant}
            type={type}
            size={size}
            onClick={onClick}
        >
            {icon && icon}
            {title}
        </Button >
    </>;
};

export default SubmitButton;