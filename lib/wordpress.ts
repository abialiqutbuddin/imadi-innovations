import { Project, ProjectMedia, SocialProofContent, Testimonial } from "@/types";
import {
    CMS_CACHE_TAGS,
    CMS_REVALIDATE_SECONDS,
    type CmsCacheTag,
} from "@/lib/cms/cache";

const WORDPRESS_API_URL =
    process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

const EMPTY_SOCIAL_PROOF: SocialProofContent = {
    eyebrow: "",
    heading: "",
    stats: [],
    industries: [],
};

function endpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

function decodeText(value = "") {
    return value
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .trim();
}

function normalizeProjectMedia(media?: Partial<ProjectMedia>): ProjectMedia | undefined {
    if (!media?.src || !media.width || !media.height) {
        return undefined;
    }

    return {
        src: media.src,
        width: Number(media.width),
        height: Number(media.height),
        alt: decodeText(media.alt),
        caption: decodeText(media.caption) || undefined,
    };
}

function normalizeStringList(value?: string[]) {
    return Array.isArray(value)
        ? value.map((item) => decodeText(item)).filter(Boolean)
        : [];
}

async function fetchJson<T>(path: string, fallback: T, tag: CmsCacheTag): Promise<T> {
    try {
        const response = await fetch(endpoint(path), {
            next: {
                revalidate: CMS_REVALIDATE_SECONDS,
                tags: [tag],
            },
        });

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
        id: typeof project.id === "number" ? project.id : undefined,
        slug: project.slug || undefined,
        title: decodeText(project.title),
        headline: decodeText(project.headline),
        description: decodeText(project.description),
        type: type as Project["type"],
        features: Array.isArray(project.features)
            ? project.features.flatMap((feature) => {
                const title = decodeText(feature?.title);
                const desc = decodeText(feature?.desc);
                return title || desc ? [{ title, desc }] : [];
            })
            : [],
        techStack: project.techStack || "",
        desktopImg: project.desktopImg || undefined,
        mobileImg: project.mobileImg || undefined,
        desktopMedia: normalizeProjectMedia(project.desktopMedia),
        mobileMedia: normalizeProjectMedia(project.mobileMedia),
        hideDesktop: Boolean(project.hideDesktop),
        industry: decodeText(project.industry),
        situation: decodeText(project.situation),
        problem: decodeText(project.problem),
        objective: decodeText(project.objective),
        successCriteria: normalizeStringList(project.successCriteria),
        constraints: normalizeStringList(project.constraints),
        decisionTitle: decodeText(project.decisionTitle),
        decisionRationale: decodeText(project.decisionRationale),
        outcomeStatement: decodeText(project.outcomeStatement),
        outcomeVerified: project.outcomeVerified === true,
        outcomeVerifiedAt: project.outcomeVerifiedAt || undefined,
        outcomeEvidenceOwnerRecorded: project.outcomeEvidenceOwnerRecorded === true,
        outcomeSourceRecorded: project.outcomeSourceRecorded === true,
        duration: decodeText(project.duration),
        team: decodeText(project.team),
        engagementModel: decodeText(project.engagementModel),
        updatedAt: project.updatedAt || undefined,
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
        rating: testimonial.rating
            ? Math.max(1, Math.min(5, Number(testimonial.rating)))
            : undefined,
        image: testimonial.image || null,
    };
}

export async function getWordPressProjects(): Promise<Project[]> {
    const projects = await fetchJson<Partial<Project>[]>(
        "projects",
        [],
        CMS_CACHE_TAGS.projects,
    );
    return projects.map(normalizeProject).filter(Boolean) as Project[];
}

export async function getWordPressTestimonials(): Promise<Testimonial[]> {
    const testimonials = await fetchJson<Partial<Testimonial>[]>(
        "testimonials",
        [],
        CMS_CACHE_TAGS.testimonials,
    );
    return testimonials.map(normalizeTestimonial).filter(Boolean) as Testimonial[];
}

export async function getWordPressSocialProof(): Promise<SocialProofContent> {
    const content = await fetchJson<Partial<SocialProofContent>>(
        "social-proof",
        EMPTY_SOCIAL_PROOF,
        CMS_CACHE_TAGS.socialProof,
    );

    return {
        eyebrow: content.eyebrow || "",
        heading: content.heading || "",
        stats: Array.isArray(content.stats) ? content.stats : [],
        industries: Array.isArray(content.industries) ? content.industries : [],
    };
}
