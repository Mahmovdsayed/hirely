'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import InputMotion from '@/components/motion/InputsMotion';

interface RoleCardProps {
    id: string;
    title: string;
    description: string;
    badge?: string;
    icon: LucideIcon;
    selected: boolean;
    onClick: () => void;
    delay?: number;
}

const RoleCard: React.FC<RoleCardProps> = ({
    id,
    title,
    description,
    badge,
    icon: Icon,
    selected,
    onClick,
    delay = 0,
}) => {
    return (
        <InputMotion delay={delay} isFullWidth>
            <button
                onClick={onClick}
                className={cn(
                    "group relative flex flex-col items-start p-4 md:p-4 rounded-4xl border text-left transition-all duration-300 w-full hover:shadow-lg min-h-[150px]",
                    selected
                        ? "border-primary ring-2 ring-primary/10 bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                )}
            >
                <div className={cn(
                    "p-1.5 md:p-2 rounded-xl mb-4 transition-colors duration-300 shrink-0",
                    selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-primary/10"
                )}>
                    <Icon size={22} className="md:w-6 md:h-6" />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-semibold text-base md:text-lg">{title}</span>
                    {badge && (
                        <span className="text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                            {badge}
                        </span>
                    )}
                </div>

                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {selected && (
                    <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                )}
            </button>
        </InputMotion>
    );
};

export default RoleCard;

