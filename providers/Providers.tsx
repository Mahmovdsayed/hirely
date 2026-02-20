'use client';

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { store } from "@/redux/store";
import LoadingScreen from "@/components/layout/loading/LoadingScreen";
import { AnimatePresence } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient());
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
        const delay = isMobile ? 800 : 1000;

        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return <LoadingScreen />;
    }

    return <>
        <AnimatePresence mode="sync"> 
            {loading ? <LoadingScreen key="loading" /> :
                <Provider store={store}>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem={true}
                        storageKey="hirely-theme"
                    >
                        <Toaster
                            position="top-center"
                            closeButton={true}
                            richColors={true}
                        />
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </NextThemesProvider>
                </Provider>
            }
        </AnimatePresence>
    </>
}