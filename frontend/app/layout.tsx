import React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { Public_Sans } from "next/font/google";
import "./globals.css";

import { TawkLoader } from "@/components/analytics/tawk-loader";
import { NavbarShell } from "@/components/layout/navbar-shell";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/json-ld";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_HOST = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? "https://plausible.io";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — The CRM Platform for Service Businesses`,
    template: `%s — ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {})
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth", publicSans.className, publicSans.variable)}
    >
      <head>
        {PLAUSIBLE_DOMAIN ? (
          <link rel="preconnect" href={PLAUSIBLE_HOST} crossOrigin="anonymous" />
        ) : null}
        {GA_MEASUREMENT_ID ? (
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        ) : null}
        {TAWK_PROPERTY_ID ? (
          <link rel="preconnect" href="https://embed.tawk.to" crossOrigin="anonymous" />
        ) : null}
      </head>
      <body
        className={cn("from-muted to-primary/5 min-h-screen bg-gradient-to-tl")}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarShell />
          {children}
        </ThemeProvider>
        <OrganizationSchema />
        <WebSiteSchema />
        {PLAUSIBLE_DOMAIN ? (
          <>
            <Script
              src={`${PLAUSIBLE_HOST}/js/script.outbound-links.js`}
              strategy="afterInteractive"
              data-domain={PLAUSIBLE_DOMAIN}
            />
            {/* Expose window.plausible() for custom events even before the
                script's own queue is initialised. */}
            <Script id="plausible-shim" strategy="afterInteractive">
              {`window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
          </>
        ) : null}
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
        <TawkLoader />
      </body>
    </html>
  );
}
