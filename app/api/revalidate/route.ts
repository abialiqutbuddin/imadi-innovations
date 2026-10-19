import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import {
  CMS_CACHE_TAG_VALUES,
  type CmsCacheTag,
} from "@/lib/cms/cache";

function secretsMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

function isCmsCacheTag(value: unknown): value is CmsCacheTag {
  return (
    typeof value === "string" &&
    CMS_CACHE_TAG_VALUES.includes(value as CmsCacheTag)
  );
}

export async function POST(request: Request) {
  const expectedSecret = process.env.WORDPRESS_REVALIDATE_SECRET;
  const receivedSecret = request.headers.get("x-revalidate-secret") ?? "";

  if (!expectedSecret || !secretsMatch(receivedSecret, expectedSecret)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const payload = (await request.json().catch(() => null)) as {
    tags?: unknown;
  } | null;
  const tags = Array.isArray(payload?.tags)
    ? payload.tags.filter(isCmsCacheTag)
    : [];

  if (tags.length === 0) {
    return NextResponse.json(
      { message: "Provide at least one supported cache tag." },
      { status: 400 },
    );
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: tags });
}
