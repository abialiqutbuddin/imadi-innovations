import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Free 1-Feature Demo App Terms | Imadi Innovations",
    description: "Terms and conditions for the Imadi Innovations free 1-feature demo app offer.",
    alternates: {
        canonical: "/free-demo-app",
    },
};

const sections = [
    {
        title: "1. Demo app only",
        body: [
            "The free app is a basic demo/prototype to show one idea or feature in action. It is not a full production-ready app.",
        ],
    },
    {
        title: "2. One simple feature included",
        body: [
            "The offer includes only one simple feature, such as an order form, booking form, product catalog, inquiry form, simple dashboard, or basic request form.",
        ],
    },
    {
        title: "3. No app store publishing included",
        body: [
            "Play Store, App Store, domain, hosting, server setup, and deployment are not included in the free offer.",
        ],
    },
    {
        title: "4. No advanced integrations included",
        body: [
            "Payment gateway, WhatsApp API, SMS, email automation, maps, live tracking, AI features, third-party APIs, and complex admin panels are quoted separately.",
        ],
    },
    {
        title: "5. Limited revisions",
        body: [
            "The free demo includes one basic revision only. Extra changes may be charged separately.",
        ],
    },
    {
        title: "6. Selected businesses only",
        body: [
            "The offer is available for selected serious businesses after discussion and approval by Imadi Innovations.",
        ],
    },
    {
        title: "7. Full app is paid",
        body: [
            "If the client wants to convert the demo into a complete app with login, database, admin panel, reports, mobile/web version, or publishing, it will be quoted separately.",
        ],
    },
    {
        title: "8. Offer can be changed or stopped anytime",
        body: [
            "Imadi Innovations reserves the right to modify or end the offer at any time.",
        ],
    },
];

export default function FreeDemoAppTermsPage() {
    return (
        <LegalPage
            title="Terms & Conditions for Free 1-Feature Demo App"
            subtitle="The conditions that apply to Imadi Innovations' free demo app offer for selected businesses."
            lastUpdated="June 27, 2026"
            sections={sections}
        />
    );
}
