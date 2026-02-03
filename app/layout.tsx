import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://www.hirely.cc' : 'http://localhost:3000'),
  title: {
    default: 'Hirely - AI-Powered Freelance and Portfolio Platform',
    template: '%s | Hirely',
  },
  description: "AI-Powered Freelance and Portfolio Platform for freelancers and portfolio builders",

  openGraph: {
    title: 'Hirely - AI-Powered Freelance and Portfolio Platform',
    description: "AI-Powered Freelance and Portfolio Platform for freelancers and portfolio builders",
    url: '/',
    siteName: 'Hirely',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hirely',
      },
    ],
  },
  twitter: {
    title: 'Hirely - AI-Powered Freelance and Portfolio Platform',
    description: "AI-Powered Freelance and Portfolio Platform for freelancers and portfolio builders",
    card: 'summary_large_image',
    site: '@hirely',
    creator: '@hirely',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en" className="dark">
      <body className={`${inter.variable} antialiased overflow-x-hidden font-inter`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}