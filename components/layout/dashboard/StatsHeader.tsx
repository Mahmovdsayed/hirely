'use client'

import { ReactNode } from "react";

interface IProps {
    label: string;
    count?: number;
    unit?: string;
    emptyTitle: string;
    emptyDescription: string;
    tip?: ReactNode;
    action?: ReactNode;
}
const StatsHeader = ({ label, count = 0, unit, emptyTitle, emptyDescription, tip, action }: IProps) => {
    const hasData = count > 0;

    return <>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            {hasData ? (
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{label}</p>

                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold">{count}</h2>
                        {unit && (
                            <span className="text-sm text-muted-foreground">{unit}</span>
                        )}
                    </div>

                    {tip}
                </div>
            ) : (
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{emptyTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                        {emptyDescription}
                    </p>
                </div>
            )}

            {action}
        </div>
    </>;
};

export default StatsHeader;