import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Privacy Policy | Imadi Innovations",
    description: "Privacy Policy for Imadi Innovations software development, AI automation, and digital product services.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

const sections = [
    {
        title: "1. Introduction",
        body: [
            "This Privacy Policy explains how Imadi Innovations collects, uses, stores, and protects information when you visit our website, contact us, request a proposal, or work with us on software development, automation, consulting, design, maintenance, or related services.",
            "By using our website or sharing information with us, you agree to the practices described in this Privacy Policy.",
        ],
    },
    {
        title: "2. Information We Collect",
        body: [
            "We collect information that you provide directly, information generated through your use of our website, and information needed to deliver our services.",
        ],
        items: [
            "Contact and business information, such as your name, email address, phone number, company name, job title, country, and communication preferences.",
            "Project information, such as product ideas, requirements, briefs, files, workflows, technical details, credentials you choose to share, and feedback.",
            "Billing and transaction information, such as invoice details, payment status, billing address, and tax or company registration details where required.",
            "Technical and usage information, such as IP address, browser type, device information, pages visited, referring URLs, approximate location, and interaction data.",
            "Communication records, such as emails, messages, meeting notes, support requests, and call summaries.",
        ],
    },
    {
        title: "3. How We Use Information",
        items: [
            "To respond to inquiries, schedule calls, prepare proposals, and communicate with you.",
            "To plan, design, build, test, deploy, support, and improve software products and automation systems.",
            "To manage client relationships, contracts, invoices, payments, reporting, and administrative operations.",
            "To secure our website, systems, client projects, and business operations.",
            "To analyze website performance, improve user experience, and understand service interest.",
            "To comply with legal, tax, accounting, security, and regulatory obligations.",
            "To send relevant business updates or marketing communications where permitted. You can opt out of marketing messages at any time.",
        ],
    },
    {
        title: "4. Client Data and Project Materials",
        body: [
            "When we work on a client project, we may process data, files, credentials, database exports, logs, documents, and other materials provided by the client. We use these materials only to deliver the agreed services, troubleshoot issues, provide support, or meet contractual obligations.",
            "Clients are responsible for ensuring they have the right to share any personal, confidential, regulated, or third-party data with us. If a separate agreement, data processing agreement, or statement of work applies, that agreement controls where it conflicts with this Privacy Policy.",
        ],
    },
    {
        title: "5. Cookies and Analytics",
        body: [
            "Our website may use cookies, analytics tools, server logs, and similar technologies to keep the website working, measure traffic, understand page performance, and improve our content. You can control cookies through your browser settings, but some website features may not work correctly if cookies are disabled.",
        ],
    },
    {
        title: "6. How We Share Information",
        body: [
            "We do not sell personal information. We may share information only where necessary for business operations, service delivery, security, legal compliance, or with your direction.",
        ],
        items: [
            "Service providers, such as hosting, cloud infrastructure, analytics, email, payment, project management, communication, and security tools.",
            "Professional advisors, such as accountants, lawyers, auditors, insurers, or financial institutions.",
            "Client-approved collaborators, subcontractors, or technical partners involved in delivering a project.",
            "Authorities or third parties when required by law, court order, regulatory request, or to protect rights, safety, and security.",
            "Successors if our business is involved in a merger, acquisition, restructuring, or asset transfer.",
        ],
    },
    {
        title: "7. International Transfers",
        body: [
            "We are based in Karachi, Pakistan and may work with clients, tools, and service providers in other countries. Your information may be processed or stored outside your country of residence. Where required, we use reasonable safeguards to protect transferred information.",
        ],
    },
    {
        title: "8. Data Retention",
        body: [
            "We keep information for as long as needed to provide services, manage client relationships, meet legal and accounting requirements, resolve disputes, enforce agreements, maintain security, and preserve business records. Project materials may be deleted, returned, archived, or retained according to the relevant project agreement or support needs.",
        ],
    },
    {
        title: "9. Security",
        body: [
            "We use reasonable technical, organizational, and administrative safeguards designed to protect information from unauthorized access, loss, misuse, disclosure, alteration, or destruction. No online system is completely secure, and we cannot guarantee absolute security.",
        ],
    },
    {
        title: "10. Your Rights and Choices",
        body: [
            "Depending on your location, you may have rights to request access, correction, deletion, restriction, portability, or objection to certain processing of your personal information. You may also opt out of marketing communications.",
            "To make a privacy request, contact us using the details below. We may need to verify your identity before completing a request.",
        ],
    },
    {
        title: "11. Children",
        body: [
            "Our website and services are intended for businesses and individuals who are at least 18 years old. We do not knowingly collect personal information from children.",
        ],
    },
    {
        title: "12. Third-Party Links and Tools",
        body: [
            "Our website or project communications may include links to third-party websites, tools, platforms, or services. Their privacy practices are controlled by their own policies, not by this Privacy Policy.",
        ],
    },
    {
        title: "13. Changes to This Policy",
        body: [
            "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new last updated date. Continued use of our website or services after changes means you accept the updated policy.",
        ],
    },
    {
        title: "14. Contact Us",
        body: [
            "For privacy questions, requests, or concerns, contact Imadi Innovations at hello@imadi-innovations.com or at Karachi, Pakistan.",
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <LegalPage
            title="Privacy Policy"
            subtitle="How we collect, use, protect, and share information across our website, client communications, and software service delivery."
            lastUpdated="June 25, 2026"
            sections={sections}
        />
    );
}
