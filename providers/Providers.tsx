'use client';

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";
import { store } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return <>
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
    </>
}