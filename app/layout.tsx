import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'Hirely - AI-Powered Freelance and Portfolio Platform',
    template: '%s | Hirely',
  },
  description: "AI-Powered Freelance and Portfolio Platform for freelancers and portfolio builders",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en" className="light">
      <body className={`${montserrat.variable} antialiased overflow-x-hidden font-montserrat`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}