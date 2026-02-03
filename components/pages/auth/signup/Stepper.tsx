'use client';

import { cn } from '@/lib/utils';

interface StepperProps {
    steps: string[];
    currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
    return (
        <div className="w-full  mx-auto mb-10 px-2 md:px-4">
            <div className="flex gap-2 md:gap-4 transition-all duration-500">
                {steps.map((step, index) => {
                    const isActive = index <= currentStep;
                    
                    return (
                        <div key={step} className="flex-1">
                            <div className="relative h-1 mb-2 md:mb-3 rounded-full overflow-hidden bg-secondary/50">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-primary transition-all duration-700 ease-out origin-left",
                                        isActive ? "scale-x-100" : "scale-x-0"
                                    )}
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                                    isActive ? "text-primary" : "text-muted-foreground/40"
                                )}>
                                    Step 0{index + 1}
                                </span>
                                <span className={cn(
                                    "text-xs md:text-sm font-semibold truncate transition-colors duration-300",
                                    isActive ? "text-foreground" : "text-muted-foreground/40"
                                )}>
                                    {step}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
