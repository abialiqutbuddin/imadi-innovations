export type PublishStatus = "draft" | "published" | "archived";

export type VerificationStatus =
  | "draft"
  | "needs_verification"
  | "verified"
  | "expired"
  | "rejected";

export type DisclosureLevel = "public" | "limited" | "anonymous" | "private";

export type CmsImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  disclosureLevel?: DisclosureLevel;
  permissionRecordedAt?: string;
  sanitizedAt?: string;
};

export type SeoFields = {
  title: string;
  description: string;
  canonicalPath: string;
  socialImage?: CmsImage;
  noIndex?: boolean;
};

export type EvidenceItem = {
  id: string;
  label: string;
  statement: string;
  type: "quantitative" | "qualitative" | "delivery" | "artifact";
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  evidenceOwner?: string;
  sourceNote?: string;
  publicSourceLabel?: string;
  publicSourceUrl?: string;
  disclosureLevel: DisclosureLevel;
};

export type PublicEvidenceItem = Omit<
  EvidenceItem,
  "evidenceOwner" | "sourceNote"
>;

export type VerifiedTestimonial = {
  id: string;
  status: PublishStatus;
  verificationStatus: VerificationStatus;
  disclosureLevel: DisclosureLevel;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating?: number;
  image?: CmsImage;
  permissionRecordedAt?: string;
};

export type CaseStudyDecision = {
  title: string;
  rationale: string;
};

export type CaseStudyTechnology = {
  name: string;
  rationale: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  status: PublishStatus;
  verificationStatus: VerificationStatus;
  disclosureLevel: DisclosureLevel;
  permissionRecordedAt?: string;
  title: string;
  clientDisplayName?: string;
  industry: string;
  deliveredSystem: string;
  summary: string;
  situation: string;
  problem: string;
  objective: string;
  successCriteria: string[];
  constraints: string[];
  decisions: CaseStudyDecision[];
  deliveredScope: string[];
  deliveredWorkflows: Array<{ title: string; detail?: string }>;
  outcomes: EvidenceItem[];
  duration?: string;
  team?: string;
  engagementModel?: string;
  technologies: CaseStudyTechnology[];
  media: CmsImage[];
  testimonialId?: string;
  relatedServiceIds: string[];
  seo: SeoFields;
  updatedAt: string;
  contentOwner?: string;
  internalSourceNote?: string;
};

export type PublicCaseStudy = Omit<
  CaseStudy,
  "contentOwner" | "internalSourceNote" | "outcomes"
> & {
  outcomes: PublicEvidenceItem[];
};
