import React from "react";
import { Metadata } from "next";

const bannerTitle = "Develo|pment Team";
const bannerSubtitle = "Ar.vo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.";
const ogImageUrl = `/api/og?title=${encodeURIComponent(bannerTitle)}&subtitle=${encodeURIComponent(bannerSubtitle)}`;

export const metadata: Metadata = {
  title: "AR.VO IT Services | Development Team",
  description: "Ar.vo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.",

  openGraph: {
    title: "AR.VO IT Services | Development Team",
    description: "Ar.vo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.",
    url: "/team", 
    siteName: "Ar.vo",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Ar.vo Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AR.VO IT Services | Development Team",
    description: "Ar.vo’s dedicated developers, designer, and researcher turning ideas into reliable digital solutions.",
    images: [ogImageUrl],
    creator: "@arvo_team",
  },

  alternates: {
    canonical: "/members",
  },
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
    {children}
    </>
  )
}