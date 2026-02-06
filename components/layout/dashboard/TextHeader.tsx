'use client'

import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

interface IProps {
    title: string
    description: string
}

const TextHeader = ({ title, description }: IProps) => {
    const elRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (!elRef.current) return

        const ctx = gsap.context(() => {
            gsap.from('h1, p', {
                y: 12,
                autoAlpha: 0,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.5,
            })
        }, elRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={elRef}>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="lg:max-w-5xl mt-2 text-xs text-muted-foreground">
                {description}
            </p>
        </div>
    )
}

export default TextHeader
