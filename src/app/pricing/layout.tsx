import React from "react";
import { Metadata } from "next";

const bannerTitle = "Transparent Pricing";
const bannerSubtitle = "Enterprise-grade solutions accessible to everyone";
const ogImageUrl = `/api/og?title=${encodeURIComponent(bannerTitle)}&subtitle=${encodeURIComponent(bannerSubtitle)}`;

export const metadata: Metadata = {
  title: "Transparent Pricing & Packages | Arvo IT",
  description: "View Arvo's transparent pricing packages. We offer accessible enterprise-grade solutions for businesses of all sizes, from startups to large-scale operations.",

  openGraph: {
    title: "Transparent Pricing & Packages | Arvo IT",
    description: "View Arvo's transparent pricing packages. We offer accessible enterprise-grade solutions for businesses of all sizes, from startups to large-scale operations.",
    url: "/pricing", 
    siteName: "Arvo",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Arvo Pricing and Packages",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Transparent Pricing & Packages | Arvo IT",
    description: "View Arvo's transparent pricing packages. We offer accessible enterprise-grade solutions for businesses of all sizes, from startups to large-scale operations.",
    images: [ogImageUrl],
    creator: "@arvo_team",
  },

  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
    {children}
    </>
  )
}