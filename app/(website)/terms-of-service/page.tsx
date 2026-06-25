import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
    title: "Terms of Service | Imadi Innovations",
    description: "Terms of Service for using the Imadi Innovations website and engaging our software development services.",
    alternates: {
        canonical: "/terms-of-service",
    },
};

const sections = [
    {
        title: "1. Agreement to These Terms",
        body: [
            "These Terms of Service govern your access to the Imadi Innovations website and your engagement with our software development, AI automation, consulting, design, maintenance, integration, support, and related services.",
            "By using our website, contacting us, requesting a proposal, approving a quote, signing a statement of work, or using our services, you agree to these Terms. If you are acting for a company, you confirm that you have authority to bind that company.",
        ],
    },
    {
        title: "2. Our Services",
        body: [
            "Imadi Innovations designs, builds, integrates, deploys, and supports software systems, websites, mobile apps, dashboards, internal tools, automations, AI-enabled workflows, and related digital products.",
            "Specific deliverables, timelines, fees, milestones, support terms, and acceptance criteria may be described in a proposal, quote, invoice, contract, or statement of work. If those documents conflict with these Terms, the signed or approved project document controls for that project.",
        ],
    },
    {
        title: "3. Client Responsibilities",
        items: [
            "Provide accurate requirements, timely feedback, approvals, assets, credentials, access, documentation, and subject matter guidance.",
            "Ensure you have the right to provide any data, content, brand assets, third-party materials, software, APIs, or credentials shared with us.",
            "Review deliverables promptly and report issues with enough detail for us to investigate and resolve them.",
            "Maintain backups of your own systems, data, content, and credentials unless backup services are expressly included in the project scope.",
            "Use our deliverables lawfully and in accordance with applicable third-party platform, API, hosting, payment, and marketplace terms.",
        ],
    },
    {
        title: "4. Proposals, Scope, and Changes",
        body: [
            "A project scope is based on the information available when the proposal or statement of work is prepared. Any request that changes requirements, features, integrations, designs, timelines, platforms, data models, workflows, or acceptance criteria may require a revised estimate, timeline, and fee.",
            "We may pause work if required information, access, approvals, payments, or decisions are delayed.",
        ],
    },
    {
        title: "5. Fees, Invoices, and Payment",
        items: [
            "Fees, deposits, milestone payments, retainers, and payment deadlines are defined in the relevant proposal, invoice, or project agreement.",
            "Unless stated otherwise, fees do not include taxes, bank charges, payment processor fees, hosting fees, domain fees, app store fees, third-party subscriptions, API usage fees, or paid software licenses.",
            "Late payments may result in delayed delivery, paused support, suspension of services, or withholding of source files, deployments, credentials, or transfer assistance until outstanding amounts are paid.",
            "Deposits, milestone payments, and completed work are generally non-refundable unless a written agreement says otherwise.",
        ],
    },
    {
        title: "6. Delivery, Review, and Acceptance",
        body: [
            "We may provide demos, staging links, builds, documents, repositories, or other deliverables for review. You are responsible for reviewing deliverables and providing clear feedback within the review period stated in the project agreement or, if no period is stated, within a reasonable time.",
            "A deliverable may be considered accepted if you approve it, deploy it, use it in production, request further work based on it, or do not report material issues within the agreed review period.",
        ],
    },
    {
        title: "7. Intellectual Property",
        body: [
            "Unless otherwise agreed in writing, after full payment of all amounts due for a project, you receive ownership of the custom deliverables created specifically for you, excluding our pre-existing materials, reusable code, tools, libraries, know-how, templates, development methods, and third-party components.",
            "We retain ownership of our pre-existing intellectual property and general skills, experience, ideas, processes, and reusable components. To the extent our pre-existing materials are included in a deliverable, we grant you a non-exclusive license to use them as part of that deliverable.",
        ],
    },
    {
        title: "8. Third-Party Services and Open Source",
        body: [
            "Projects may rely on third-party services, APIs, hosting providers, app stores, analytics tools, payment processors, AI providers, plugins, frameworks, libraries, or open-source software. These third-party services are governed by their own terms, pricing, uptime, security, and availability policies.",
            "We are not responsible for failures, pricing changes, outages, limitations, policy changes, data loss, or security incidents caused by third-party services outside our control.",
        ],
    },
    {
        title: "9. Confidentiality",
        body: [
            "Each party may receive confidential business, technical, financial, product, customer, credential, or operational information from the other party. The receiving party must use reasonable care to protect confidential information and use it only for the purpose of the relationship.",
            "Confidentiality obligations do not apply to information that is public, already known without restriction, independently developed, lawfully received from another source, or required to be disclosed by law.",
        ],
    },
    {
        title: "10. Data, Security, and Access",
        body: [
            "You are responsible for the accuracy, legality, and backup of data you provide. You should not share production credentials, sensitive data, regulated data, or personal data unless it is necessary for the project and you are authorized to share it.",
            "We use reasonable safeguards when handling client data and access credentials, but no system or transmission is completely secure. You remain responsible for securing your own accounts, environments, users, passwords, and production operations.",
        ],
    },
    {
        title: "11. AI and Automation Features",
        body: [
            "Some projects may include AI-enabled features, predictions, recommendations, automation, generated content, or integrations with AI providers. AI outputs may be incomplete, inaccurate, or unsuitable for certain decisions without human review.",
            "You are responsible for reviewing AI outputs, configuring business rules, monitoring automated workflows, and ensuring your use of AI-enabled features complies with applicable laws and platform terms.",
        ],
    },
    {
        title: "12. Portfolio and Marketing Use",
        body: [
            "Unless you tell us otherwise in writing, we may identify you as a client and describe the general nature of work performed in our portfolio, proposals, website, social media, and marketing materials. We will not intentionally disclose confidential details, private data, or sensitive project information without permission.",
        ],
    },
    {
        title: "13. Warranties and Disclaimers",
        body: [
            "We aim to provide professional services with reasonable skill and care. Except as expressly stated in a written agreement, our website and services are provided on an as-is and as-available basis.",
            "We do not guarantee that any website, app, automation, AI system, integration, or third-party service will be uninterrupted, error-free, vulnerability-free, compatible with all future platform changes, or produce specific business, financial, ranking, conversion, or operational results.",
        ],
    },
    {
        title: "14. Limitation of Liability",
        body: [
            "To the maximum extent permitted by law, Imadi Innovations will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, lost data, business interruption, loss of goodwill, or third-party claims.",
            "To the maximum extent permitted by law, our total liability for any claim related to the website or services will not exceed the amount you paid to us for the specific project or service giving rise to the claim during the three months before the event giving rise to liability.",
        ],
    },
    {
        title: "15. Indemnity",
        body: [
            "You agree to defend, indemnify, and hold harmless Imadi Innovations from claims, losses, damages, liabilities, costs, and expenses arising from your content, data, instructions, misuse of deliverables, violation of law, breach of these Terms, or infringement of third-party rights.",
        ],
    },
    {
        title: "16. Suspension and Termination",
        body: [
            "Either party may terminate a project according to the relevant project agreement. We may suspend or terminate access to services if payments are overdue, required cooperation is not provided, security is at risk, or continued work would violate law, third-party terms, or these Terms.",
            "Upon termination, you remain responsible for payment for completed work, committed costs, approved expenses, third-party charges, and any non-cancellable commitments incurred before termination.",
        ],
    },
    {
        title: "17. Governing Law and Disputes",
        body: [
            "Unless a signed agreement states otherwise, these Terms are governed by the laws of Pakistan. Courts located in Karachi, Pakistan will have jurisdiction over disputes, subject to any mandatory rights available under applicable law.",
        ],
    },
    {
        title: "18. Changes to These Terms",
        body: [
            "We may update these Terms from time to time. The updated version will be posted on this page with a new last updated date. Continued use of our website or services after changes means you accept the updated Terms.",
        ],
    },
    {
        title: "19. Contact Us",
        body: [
            "For questions about these Terms, contact Imadi Innovations at hello@imadi-innovations.com or at Karachi, Pakistan.",
        ],
    },
];

export default function TermsOfServicePage() {
    return (
        <LegalPage
            title="Terms of Service"
            subtitle="The terms that apply when you use our website, request work from us, or engage Imadi Innovations for software, automation, consulting, and support services."
            lastUpdated="June 25, 2026"
            sections={sections}
        />
    );
}
