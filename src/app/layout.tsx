import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import Navigation from "@/components/layouts/Navigation";
import SiteBanner from "@/components/layouts/Banner";
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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}`
  : 'http://localhost:3000';

const ogTitle = "Enterprise-Grade IT Solutions.";
const ogSubtitle = "Scalable software infrastructure for modern businesses";
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: "AR.VO IT Services",
  description:
    "Ar.vo develops enterprise solutions for individuals, growing businesses, and professional environments. We help develop and launch already proven solutions for your business.",
  keywords: [
    "Ar.vo",
    "web development",
    "UI/UX design",
    "Next.js",
    "React",
    "Shopify development",
    "WordPress development",
    "CRM integration",
    "frontend development",
    "creative agency",
    "it services",
    "enterprise software",
    "it solutions",
    "enterprise solutions",
    "software development",
    "business applications",
  ],
  authors: [{ name: "Ar.vo Team", url: "https://arvo.team/" }],
  openGraph: {
    title: "AR.VO IT Services",
    description:
      "Ar.vo develops enterprise solutions for individuals, growing businesses, and professional environments. We help develop and launch already proven solutions for your business.",
    url: "/",
    siteName: "Ar.vo",
    images: [
      {
        url: ogImageUrl,
        width: 1080,
        height: 1080,
        alt: "Ar.vo Enterprise IT Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AR.VO IT Services",
    description:
      "Ar.vo develops enterprise solutions for individuals, growing businesses, and professional environments. We help develop and launch already proven solutions for your business.",
    images: [ogImageUrl],
    creator: "@ar.vo_team",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ar.vo.team/#organization",
        "name": "Ar.vo Team",
        "url": "https://ar.vo.team/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ar.vo.team/icon.svg",
          "width": "1000",
          "height": "1000",
          "caption": "Ar.vo Team Logo"
        },
        "description": "Ar.vo develops enterprise solutions for individuals, growing businesses, and professional environments.",
        "sameAs": [
          "https://www.linkedin.com/in/jerrytagle/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ar.vo.team/#website",
        "url": "https://ar.vo.team/",
        "name": "Ar.vo Team",
        "alternateName": ["Ar.vo", "ar.vo.team"],
        "publisher": {
          "@id": "https://ar.vo.team/#organization"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body className={`${fontEthnocentric.variable} antialiased bg-white text-gray-900 dark:bg-black-primary dark:text-gray-100 transition-colors duration-300`}>
        {/* <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" /> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <SiteBanner />
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}