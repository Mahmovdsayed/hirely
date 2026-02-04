'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface IProps {
    children: React.ReactNode
    delay: number
    isFullWidth?: boolean
    isMotionDisabled?: boolean
}

const InputMotion = ({ children, delay, isFullWidth = false, isMotionDisabled = false }: IProps) => {
    const elRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!elRef.current || isMotionDisabled) return
        gsap.fromTo(
            elRef.current,
            { opacity: 0, y: 20, filter: 'blur(5px)' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 0.4,
                delay,
                ease: "power1.inOut",
            }
        )
    }, [delay])

    return (
        <div
            ref={elRef}
            className={`${isFullWidth ? 'w-full' : 'w-auto'}`}
        >
            {children}
        </div>
    )
}

export default InputMotion;
