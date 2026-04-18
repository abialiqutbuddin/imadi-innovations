import { Project, SocialProofContent, Testimonial } from "@/types";

const WORDPRESS_API_URL =
    process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

const DEFAULT_SOCIAL_PROOF: SocialProofContent = {
    eyebrow: "Our Impact",
    heading: "Trusted By Businesses Across Industries",
    stats: [
        { value: "10+", label: "Completed Systems" },
        { value: "6+", label: "Countries Served" },
        { value: "90%", label: "Client Return Rate" },
    ],
    industries: [
        "Logistics",
        "Education",
        "Wellness",
        "Hospitality",
        "Community Platforms",
        "Retail",
    ],
};

function endpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
    try {
        const response = await fetch(endpoint(path));

        if (!response.ok) {
            return fallback;
        }

        return (await response.json()) as T;
    } catch {
        return fallback;
    }
}

function normalizeProject(project: Partial<Project>): Project | null {
    if (!project.title || !project.headline || !project.description) {
        return null;
    }

    const type = ["Web", "Mobile", "Web & Mobile"].includes(project.type || "")
        ? project.type
        : "Web";

    return {
        title: project.title,
        headline: project.headline,
        description: project.description,
        type: type as Project["type"],
        features: Array.isArray(project.features) ? project.features : [],
        techStack: project.techStack || "",
        desktopImg: project.desktopImg || undefined,
        mobileImg: project.mobileImg || undefined,
        hideDesktop: Boolean(project.hideDesktop),
        _id: project._id,
    };
}

function normalizeTestimonial(testimonial: Partial<Testimonial>): Testimonial | null {
    if (!testimonial.name || !testimonial.quote) {
        return null;
    }

    return {
        id: testimonial.id,
        name: testimonial.name,
        company: testimonial.company || "",
        role: testimonial.role || "",
        quote: testimonial.quote,
        rating: Math.max(1, Math.min(5, Number(testimonial.rating || 5))),
        image: testimonial.image || null,
    };
}

export async function getWordPressProjects(): Promise<Project[]> {
    const projects = await fetchJson<Partial<Project>[]>("projects", []);
    return projects.map(normalizeProject).filter(Boolean) as Project[];
}

export async function getWordPressTestimonials(): Promise<Testimonial[]> {
    const testimonials = await fetchJson<Partial<Testimonial>[]>("testimonials", []);
    return testimonials.map(normalizeTestimonial).filter(Boolean) as Testimonial[];
}

export async function getWordPressSocialProof(): Promise<SocialProofContent> {
    const content = await fetchJson<Partial<SocialProofContent>>(
        "social-proof",
        DEFAULT_SOCIAL_PROOF
    );

    return {
        eyebrow: content.eyebrow || DEFAULT_SOCIAL_PROOF.eyebrow,
        heading: content.heading || DEFAULT_SOCIAL_PROOF.heading,
        stats: Array.isArray(content.stats) && content.stats.length
            ? content.stats
            : DEFAULT_SOCIAL_PROOF.stats,
        industries: Array.isArray(content.industries) && content.industries.length
            ? content.industries
            : DEFAULT_SOCIAL_PROOF.industries,
    };
}
