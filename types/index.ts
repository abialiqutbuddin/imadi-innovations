export interface Project {
    title: string;
    headline: string;
    description: string;
    type: "Web" | "Mobile" | "Web & Mobile";
    features: { title: string; desc: string }[];
    techStack: string;
    desktopImg?: string;
    mobileImg?: string;
    hideDesktop?: boolean;
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
