'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StepWrapperProps {
    children: React.ReactNode;
    isVisible: boolean;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ children, isVisible }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            gsap.fromTo(
                wrapperRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div ref={wrapperRef} className="w-full">
            {children}
        </div>
    );
};


export default StepWrapper;
