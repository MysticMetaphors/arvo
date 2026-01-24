import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import Navigation from "@/components/layouts/Navigation";
import ArvoScrollToTopButton from "@/components/ui/arvo/ArvoScrollToTopButton";
// import { ThemeProvider } from "next-themes";
// import { ToggleTheme } from "@/components/ui/ToggleTheme";
import localFont from "next/font/local";
import { CurrencyProvider } from "@/providers/currencyProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontEthnocentric = localFont({
  src: "../../fonts/Ethnocentric-Regular.otf",
  variable: "--font-ethnocentric-local",
});

export const metadata: Metadata = {
  title: "Arvo | IT Solutions",
  description:
    "Arvo develops enterprise solutions for individuals, growing businesses, and professional environments. We help develop and launch already proven solutions for your business.",
  keywords: [
    "Arvo",
    "web development",
    "UI/UX design",
    "Next.js",
    "React",
    "Shopify development",
    "WordPress development",
    "CRM integration",
    "frontend development",
    "creative agency",
  ],
  authors: [{ name: "Arvo Team", url: "https://arvo.team/" }],
  openGraph: {
    title: "Arvo | IT Solutions",
    description:
      "Arvo develops enterprise solutions for individuals, growing businesses, and professional environments. We help develop and launch already proven solutions for your business.",
    url: "https://arvo.team/",
    siteName: "Arvo",
    images: [
      {
        url: "https://arvo.team/og-image_v2.png",
        width: 1200,
        height: 630,
        alt: "Arvo IT Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvo | IT Solutions",
    description:
      "Arvo develops enterprise solutions for individuals, growing businesses, and professional environments. We help develop and launch already proven solutions for your business.",
    images: [
      {
        url: "https://arvo.team/og-image_v2.png",
        width: 1200,
        height: 630,
        alt: "Arvo IT Solutions",
      },
    ],
    creator: "@arvo_team",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://arvo.team/",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontEthnocentric.variable} antialiased bg-white text-gray-900 dark:bg-black-primary dark:text-gray-100 transition-colors duration-300`}>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* <ThemeProvider attribute="class" defaultTheme="system"> */}
        <CurrencyProvider>
          <Navigation />
          {children}
          <Footer />
          <ArvoScrollToTopButton />
        </CurrencyProvider>
        {/* <ToggleTheme className="fixed bottom-20 right-6 z-100 py-2 px-2 bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700" animationType="fade-in-out"/> */}
        {/* </ThemeProvider> */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}