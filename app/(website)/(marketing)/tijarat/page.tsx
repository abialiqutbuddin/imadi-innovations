import type { Metadata } from "next";

import { TijaratPage } from "@/components/products/TijaratPage";

export const metadata: Metadata = {
  title: "Tijarat POS | Billing & Inventory Software by Imadi Innovations",
  description:
    "Tijarat POS connects billing, inventory, purchasing, customer and supplier balances, and reporting for Pakistani retail and wholesale businesses.",
  alternates: { canonical: "/tijarat/" },
  openGraph: {
    title: "Tijarat POS | Billing & Inventory Software",
    description:
      "Billing, inventory, purchasing, balances, and reporting in one offline-capable business system by Imadi Innovations.",
    url: "https://imadi-innovations.com/tijarat/",
    siteName: "Imadi Innovations",
    type: "website",
    images: [{
      url: "/tijarat/tijarat-pos-launch.png",
      width: 1254,
      height: 1254,
      alt: "Tijarat POS for retail and wholesale operations",
    }],
  },
};

export default function Page() {
  return <TijaratPage />;
}
