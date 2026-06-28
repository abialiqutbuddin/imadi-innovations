import type { Metadata } from "next";

import TijaratLandingPage from "@/components/TijaratLandingPage";

export const metadata: Metadata = {
    title: "Tijarat | Business Software Built for Pakistan",
    description:
        "Join early access for Tijarat, Pakistan-first business management software for billing, inventory, accounting, reports, customers, suppliers and SMEs.",
    alternates: {
        canonical: "/tijarat",
    },
    openGraph: {
        title: "Tijarat | Business Software Built for Pakistan",
        description:
            "Help Imadi Innovations build Pakistan's best business management software and get lifetime early adopter benefits.",
        url: "https://imadi-innovations.com/tijarat",
        siteName: "Imadi Innovations",
        type: "website",
    },
};

export default function TijaratPage() {
    return <TijaratLandingPage />;
}
