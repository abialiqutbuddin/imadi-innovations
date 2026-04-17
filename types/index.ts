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
