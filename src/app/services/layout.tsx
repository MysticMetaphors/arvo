import React from "react";
import type { Metadata } from "next";

const bannerTitle = "Core Capabilities";
const bannerSubtitle = "Strategic development services for modern enterprises";
const ogImageUrl = `/api/og?title=${encodeURIComponent(bannerTitle)}&subtitle=${encodeURIComponent(bannerSubtitle)}`;

export const metadata: Metadata = {
  title: "Core Capabilities & Services | ARVO IT Services",
  description: "Discover Arvo's core technical capabilities. From scalable web architectures to complex system integration, we provide the strategic foundation for business growth.",

  openGraph: {
    title: "Core Capabilities & Services | ARVO IT Services",
    description: "Discover Arvo's core technical capabilities. From scalable web architectures to complex system integration, we provide the strategic foundation for business growth.",
    url: "/services", 
    siteName: "Arvo",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Arvo Core Capabilities",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Core Capabilities & Services | ARVO IT Services",
    description: "Discover Arvo's core technical capabilities. From scalable web architectures to complex system integration, we provide the strategic foundation for business growth.",
    images: [ogImageUrl],
    creator: "@arvo_team",
  },

  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
    {children}
    </>
  )
}