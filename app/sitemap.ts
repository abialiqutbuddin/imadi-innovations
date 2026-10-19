import { MetadataRoute } from "next";

import { getPublicCaseStudiesFromCms } from "@/lib/cms/case-studies";
import { marketingServices } from "@/lib/content/marketing";

const siteUrl = "https://imadi-innovations.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getPublicCaseStudiesFromCms();
  const corePages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/work/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/industries/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/process/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/products/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/tijarat/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy-policy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-of-service/`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = marketingServices.map((service) => ({
    url: `${siteUrl}/services/${service.slug}/`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${siteUrl}/work/${caseStudy.slug}/`,
    lastModified: new Date(caseStudy.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...corePages, ...servicePages, ...caseStudyPages];
}
