import React from "react";
import type { Metadata } from "next";

const bannerTitle = "Enterprise-Grade IT Solutions.";
const bannerSubtitle = "Scalable software infrastructure for modern businesses";
const ogImageUrl = `/api/og?title=${encodeURIComponent(bannerTitle)}&subtitle=${encodeURIComponent(bannerSubtitle)}`;

export const metadata: Metadata = {
  title: "Enterprise-Grade IT Solutions. | AR.VO IT Services",
  description: "Discover Ar.vo's IT Solutions. From scalable web architectures to complex system integration, we provide the strategic foundation for business growth.",

  openGraph: {
    title: "Enterprise-Grade IT Solutions. | AR.VO IT Services",
    description: "Discover Ar.vo's IT Solutions. From scalable web architectures to complex system integration, we provide the strategic foundation for business growth.",
    url: "/solutions", 
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
    title: "Enterprise-Grade IT Solutions. | AR.VO IT Services",
    description: "Discover Ar.vo's IT Solutions. From scalable web architectures to complex system integration, we provide the strategic foundation for business growth.",
    images: [ogImageUrl],
    creator: "@arvo_team",
  },

  alternates: {
    canonical: "/solutions",
  },
};

export default function SolutionsLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
    {children}
    </>
  )
}