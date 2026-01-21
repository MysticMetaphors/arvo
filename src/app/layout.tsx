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
  title: "Arvo | Creative Web Solutions & Development Studio",
  description:
    "Arvo crafts high-performing websites, e-commerce platforms, and digital experiences through innovation, design, and technology.",
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
  authors: [{ name: "Arvo Team", url: "https://arvo-alpha.vercel.app/" }],
  openGraph: {
    title: "Arvo | Creative Web Solutions & Development Studio",
    description:
      "Building modern, responsive, and impactful digital experiences through design and innovation.",
    url: "https://arvo-alpha.vercel.app/",
    siteName: "Arvo",
    images: [
      {
        url: "https://arvo-alpha.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arvo Web Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvo | Creative Web Solutions & Development Studio",
    description:
      "Arvo creates exceptional web and e-commerce experiences through design, performance, and innovation.",
    images: ["https://arvo-alpha.vercel.app/og-image.png"],
    creator: "@arvo_team",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://arvo-alpha.vercel.app/",
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
        <Analytics
          beforeSend={(event) => {
            const isOptedOut = localStorage.getItem('va-disable');
            if (isOptedOut) {
              return null;
            }

            return event;
          }}
        />
      </body>
    </html>
  );
}