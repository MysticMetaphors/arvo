import type { Metadata } from "next";
import { BadApplePlayer } from "@/components/badapple/BadApplePlayer";

export const metadata: Metadata = {
  title: "・",
  robots: { index: false, follow: false },
};

export default function BadApplePage() {
  return <BadApplePlayer />;
}
