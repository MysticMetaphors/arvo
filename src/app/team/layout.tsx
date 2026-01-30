import React from "react";
import { Metadata } from "next";

const bannerTitle = "Develo|pment Team";
const bannerSubtitle = "Arvo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.";
const ogImageUrl = `/api/og?title=${encodeURIComponent(bannerTitle)}&subtitle=${encodeURIComponent(bannerSubtitle)}`;

export const metadata: Metadata = {
  title: "Arvo IT Solutions | Development Team",
  description: "Arvo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.",

  openGraph: {
    title: "Arvo IT Solutions | Development Team",
    description: "Arvo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.",
    url: "/pricing", 
    siteName: "Arvo",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Arvo Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arvo IT Solutions | Development Team",
    description: "Arvo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.",
    images: [ogImageUrl],
    creator: "@arvo_team",
  },

  alternates: {
    canonical: "/team",
  },
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
    {children}
    </>
  )
}