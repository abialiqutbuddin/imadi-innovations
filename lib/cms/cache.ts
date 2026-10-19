export const CMS_CACHE_TAGS = {
  projects: "cms:projects",
  socialProof: "cms:social-proof",
  testimonials: "cms:testimonials",
  services: "cms:services",
  caseStudies: "cms:case-studies",
  team: "cms:team",
  globalSettings: "cms:global-settings",
} as const;

export type CmsCacheTag = (typeof CMS_CACHE_TAGS)[keyof typeof CMS_CACHE_TAGS];

export const CMS_CACHE_TAG_VALUES = Object.values(CMS_CACHE_TAGS);

export const CMS_REVALIDATE_SECONDS = 30 * 60;
