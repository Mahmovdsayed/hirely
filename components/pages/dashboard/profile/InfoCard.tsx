'use client'

import React from "react";

interface IProps {
    icon: React.ReactNode;
    label: string;
    value: string | null | undefined;
}
const InfoCard = ({ icon, label, value }: IProps) => {
    return <>
        <div className="flex items-start gap-3 p-4 rounded-4xl bg-card border border-neutral-200 dark:border-neutral-800">
            <div className="shrink-0 text-neutral-500 dark:text-neutral-400">
                {icon}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-foreground capitalize tracking-wide mb-0.5">
                    {label}
                </span>
                <span className="text-sm font-medium text-foreground truncate">
                    {value || '—'}
                </span>
            </div>
        </div>
    </>;
};

export default InfoCard;