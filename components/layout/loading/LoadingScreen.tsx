"use client";

import { motion } from "framer-motion";

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-background">
            <div className="relative flex flex-col items-center">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="h-20 w-20 rounded-full border-b-2 border-l-2 border-primary"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-5 h-10 w-10 rounded-full bg-primary/20 backdrop-blur-sm"
                />

                <motion.div
                    animate={{
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mt-8 flex flex-col items-center gap-1"
                >
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        Hirely
                    </span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
                        Loading
                    </span>
                </motion.div>

                <div className="absolute -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            </div>
        </div>
    );
};

export default LoadingScreen;
