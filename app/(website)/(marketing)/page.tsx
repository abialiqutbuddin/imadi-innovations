import type { Metadata } from "next";

import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Custom Software for Operational Work | Imadi Innovations",
  description:
    "Imadi Innovations designs web platforms, mobile apps, and workflow automation for teams outgrowing spreadsheets, manual follow-ups, and disconnected systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Custom Software for Operational Work | Imadi Innovations",
    description:
      "Web platforms, mobile apps, and workflow automation built around the way your operation needs to work.",
    url: "/",
    siteName: "Imadi Innovations",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
