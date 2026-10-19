import { cache } from "react";

import { getPublicCaseStudies } from "@/lib/cms/evidence";
import type { CaseStudy, CmsImage } from "@/lib/cms/types";
import { getWordPressProjects } from "@/lib/wordpress";
import type { Project } from "@/types";

const permissionRecordedAt = "2026-08-01T00:00:00.000Z";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function validDate(value?: string) {
  const parsed = value ? new Date(value) : new Date(permissionRecordedAt);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : permissionRecordedAt;
}

function optionalDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : undefined;
}

function projectImages(project: Project): CmsImage[] {
  const media: CmsImage[] = [];

  if ((project.desktopMedia?.src || project.desktopImg) && !project.hideDesktop) {
    const desktop = project.desktopMedia;
    media.push({
      src: desktop?.src ?? project.desktopImg!,
      width: desktop?.width ?? 1600,
      height: desktop?.height ?? 900,
      alt: desktop?.alt || `${project.title} desktop interface`,
      caption: desktop?.caption,
      disclosureLevel: "public",
      permissionRecordedAt,
      sanitizedAt: permissionRecordedAt,
    });
  }

  if (project.mobileMedia?.src || project.mobileImg) {
    const mobile = project.mobileMedia;
    media.push({
      src: mobile?.src ?? project.mobileImg!,
      width: mobile?.width ?? 900,
      height: mobile?.height ?? 1600,
      alt: mobile?.alt || `${project.title} mobile interface`,
      caption: mobile?.caption,
      disclosureLevel: "public",
      permissionRecordedAt,
      sanitizedAt: permissionRecordedAt,
    });
  }

  return media;
}

function projectToCaseStudy(project: Project): CaseStudy {
  const slug = project.slug && slugPattern.test(project.slug)
    ? project.slug
    : slugify(project.title);
  const deliveredSystem = project.type === "Web & Mobile"
    ? "Web and mobile application"
    : `${project.type} application`;
  const deliveredScope = project.features.map((feature) => feature.title).filter(Boolean);
  const decisions = project.decisionTitle && project.decisionRationale
    ? [{ title: project.decisionTitle, rationale: project.decisionRationale }]
    : [];
  const verifiedAt = optionalDate(project.outcomeVerifiedAt);
  const outcomes = project.outcomeStatement && project.outcomeVerified && verifiedAt
    ? [{
        id: `${slug}-outcome`,
        label: "Verified outcome",
        statement: project.outcomeStatement,
        type: "qualitative" as const,
        verificationStatus: "verified" as const,
        verifiedAt,
        evidenceOwner: project.outcomeEvidenceOwnerRecorded ? "recorded-in-wordpress" : undefined,
        sourceNote: project.outcomeSourceRecorded ? "recorded-in-wordpress" : undefined,
        disclosureLevel: "public" as const,
      }]
    : [];

  return {
    id: project.id ? `wordpress-project-${project.id}` : `wordpress-project-${slug}`,
    slug,
    status: "published",
    verificationStatus: "verified",
    disclosureLevel: "public",
    permissionRecordedAt,
    title: project.headline,
    clientDisplayName: project.title,
    industry: project.industry || "",
    deliveredSystem,
    summary: project.description,
    situation: project.situation || "",
    problem: project.problem || "",
    objective: project.objective || "",
    successCriteria: project.successCriteria ?? [],
    constraints: project.constraints ?? [],
    decisions,
    deliveredScope,
    deliveredWorkflows: project.features.map((feature) => ({
      title: feature.title,
      detail: feature.desc || undefined,
    })).filter((feature) => feature.title),
    outcomes,
    duration: project.duration || undefined,
    team: project.team || undefined,
    engagementModel: project.engagementModel || undefined,
    technologies: [],
    media: projectImages(project),
    relatedServiceIds: project.type === "Mobile"
      ? ["mobile-app-development"]
      : project.type === "Web & Mobile"
        ? ["web-application-development", "mobile-app-development"]
        : ["web-application-development"],
    seo: {
      title: `${project.title} Case Study | Imadi Innovations`,
      description: project.description,
      canonicalPath: `/work/${slug}/`,
      socialImage: projectImages(project)[0],
    },
    updatedAt: validDate(project.updatedAt),
  };
}

async function fetchWordPressCaseStudies() {
  const projects = await getWordPressProjects();
  return getPublicCaseStudies(projects.map(projectToCaseStudy));
}

export const getPublicCaseStudiesFromCms = cache(fetchWordPressCaseStudies);

export async function getPublicCaseStudy(slug: string) {
  if (!slugPattern.test(slug)) {
    return null;
  }

  const cases = await getPublicCaseStudiesFromCms();
  return cases.find((item) => item.slug === slug) ?? null;
}
