import type {
  EvidenceItem,
  CaseStudy,
  PublicCaseStudy,
  PublicEvidenceItem,
  VerifiedTestimonial,
} from "@/lib/cms/types";

function mayRender(disclosureLevel: EvidenceItem["disclosureLevel"]) {
  return disclosureLevel !== "private";
}

export function getPublicEvidence(items: EvidenceItem[]): PublicEvidenceItem[] {
  return items.flatMap((item) => {
    if (
      item.verificationStatus !== "verified" ||
      !mayRender(item.disclosureLevel) ||
      !item.verifiedAt ||
      !item.evidenceOwner ||
      !item.sourceNote
    ) {
      return [];
    }

    return [
      {
        id: item.id,
        label: item.label,
        statement: item.statement,
        type: item.type,
        verificationStatus: item.verificationStatus,
        verifiedAt: item.verifiedAt,
        publicSourceLabel: item.publicSourceLabel,
        publicSourceUrl: item.publicSourceUrl,
        disclosureLevel: item.disclosureLevel,
      },
    ];
  });
}

export function getPublicTestimonials(
  items: VerifiedTestimonial[],
): VerifiedTestimonial[] {
  return items.filter(
    (item) =>
      item.status === "published" &&
      item.verificationStatus === "verified" &&
      item.disclosureLevel !== "private" &&
      Boolean(item.permissionRecordedAt),
  );
}

function publicCaseImage(image: CaseStudy["media"][number]) {
  return (
    image.disclosureLevel !== "private" &&
    Boolean(image.permissionRecordedAt) &&
    Boolean(image.sanitizedAt)
  );
}

export function getPublicCaseStudies(items: CaseStudy[]): PublicCaseStudy[] {
  return items.flatMap((item) => {
    const hasRequiredContent = Boolean(
      item.id &&
      item.slug &&
      item.title &&
      item.deliveredSystem &&
      item.summary &&
      item.updatedAt,
    );

    if (
      item.status !== "published" ||
      item.verificationStatus !== "verified" ||
      !mayRender(item.disclosureLevel) ||
      !item.permissionRecordedAt ||
      !hasRequiredContent
    ) {
      return [];
    }

    const publicItem = { ...item };
    delete publicItem.contentOwner;
    delete publicItem.internalSourceNote;

    return [
      {
        ...publicItem,
        clientDisplayName:
          item.disclosureLevel === "anonymous" ? undefined : item.clientDisplayName,
        media: item.media.filter(publicCaseImage),
        outcomes: getPublicEvidence(item.outcomes),
        seo: {
          ...item.seo,
          socialImage:
            item.seo.socialImage && publicCaseImage(item.seo.socialImage)
              ? item.seo.socialImage
              : undefined,
        },
      },
    ];
  });
}
