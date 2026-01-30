import React from "react";
import { Metadata } from "next";

const bannerTitle = "Develo|pment Team";
const bannerSubtitle = "Let’s talk—reach out to Arvo and start building solutions together.";
const ogImageUrl = `/api/og?title=${encodeURIComponent(bannerTitle)}&subtitle=${encodeURIComponent(bannerSubtitle)}`;

export const metadata: Metadata = {
  title: "Arvo IT Solutions | Development Team",
  description: "Have a question or a project in mind? Arvo is here to help you turn your vision into reality. Reach out to us today — let’s collaborate and create something exceptional together.",

  openGraph: {
    title: "Arvo IT Solutions | Development Team",
    description: "Have a question or a project in mind? Arvo is here to help you turn your vision into reality. Reach out to us today — let’s collaborate and create something exceptional together.",
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
    description: "Have a question or a project in mind? Arvo is here to help you turn your vision into reality. Reach out to us today — let’s collaborate and create something exceptional together.",
    images: [ogImageUrl],
    creator: "@arvo_team",
  },

  alternates: {
    canonical: "/team",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
    {children}
    </>
  )
}