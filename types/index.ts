export interface ProjectMedia {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
}

export interface Project {
    id?: number;
    slug?: string;
    title: string;
    headline: string;
    description: string;
    type: "Web" | "Mobile" | "Web & Mobile";
    features: { title: string; desc: string }[];
    techStack: string;
    desktopImg?: string;
    mobileImg?: string;
    desktopMedia?: ProjectMedia;
    mobileMedia?: ProjectMedia;
    hideDesktop?: boolean;
    industry?: string;
    situation?: string;
    problem?: string;
    objective?: string;
    successCriteria?: string[];
    constraints?: string[];
    decisionTitle?: string;
    decisionRationale?: string;
    outcomeStatement?: string;
    outcomeVerified?: boolean;
    outcomeVerifiedAt?: string;
    outcomeEvidenceOwnerRecorded?: boolean;
    outcomeSourceRecorded?: boolean;
    duration?: string;
    team?: string;
    engagementModel?: string;
    updatedAt?: string;
    _id?: string;
}

export interface Testimonial {
    id?: number;
    name: string;
    company?: string;
    role?: string;
    quote: string;
    rating?: number;
    image?: string | null;
}

export interface SocialProofStat {
    value: string;
    label: string;
}

export interface SocialProofContent {
    eyebrow: string;
    heading: string;
    stats: SocialProofStat[];
    industries: string[];
}
