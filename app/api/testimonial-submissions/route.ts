import { NextResponse } from "next/server";

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

const MAX_BODY_BYTES = 20_000;
const UPSTREAM_TIMEOUT_MS = 10_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "company" | "role" | "quote" | "rating" | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;

function endpoint(path: string) {
  return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTrustedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const allowedOrigins = new Set([new URL(request.url).origin]);
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    try {
      allowedOrigins.add(new URL(configuredSiteUrl).origin);
    } catch {
      // A malformed optional site URL should not crash form handling.
    }
  }

  return allowedOrigins.has(origin);
}

function isLikelyAutomated(payload: Record<string, unknown>) {
  if (cleanString(payload.website, 500)) {
    return true;
  }

  const startedAt = Number(payload.startedAt);
  return Number.isFinite(startedAt) && Date.now() - startedAt < 750;
}

function validate(payload: Record<string, unknown>) {
  const name = cleanString(payload.name, 121);
  const email = cleanString(payload.email, 255).toLowerCase();
  const company = cleanString(payload.company, 141);
  const role = cleanString(payload.role, 141);
  const quote = cleanString(payload.quote, 1201);
  const consent = payload.consent === true;
  const rating = payload.rating === null || payload.rating === undefined || payload.rating === ""
    ? null
    : Number(payload.rating);
  const fieldErrors: FieldErrors = {};

  if (name.length < 2 || name.length > 120) {
    fieldErrors.name = "Enter a name between 2 and 120 characters.";
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (company.length > 140) {
    fieldErrors.company = "Company name must be 140 characters or fewer.";
  }

  if (role.length > 140) {
    fieldErrors.role = "Role must be 140 characters or fewer.";
  }

  if (quote.length < 20 || quote.length > 1200) {
    fieldErrors.quote = "Write between 20 and 1,200 characters.";
  }

  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
    fieldErrors.rating = "Choose a rating from 1 to 5, or leave it unselected.";
  }

  if (!consent) {
    fieldErrors.consent = "Confirm that Imadi Innovations may review and publish your submission.";
  }

  return {
    values: { name, email, company, role, quote, rating, consent },
    fieldErrors,
  };
}

async function postToWordPress(
  path: string,
  request: Request,
  body: Record<string, unknown>,
) {
  const forwardedFor = cleanString(request.headers.get("x-forwarded-for")?.split(",")[0], 64);
  const response = await fetch(endpoint(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Forwarded-For": forwardedFor,
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { response, data };
}

function isMissingWordPressRoute(response: Response, data: Record<string, unknown>) {
  const message = cleanString(data.message, 500);
  return response.status === 404 && (
    data.code === "rest_no_route" ||
    message.toLowerCase().includes("no route was found")
  );
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return json({ message: "This submission origin is not allowed." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ message: "Send the form as JSON." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ message: "The submission is too large." }, 413);
  }

  const parsed = await request.json().catch(() => null);
  if (!isRecord(parsed)) {
    return json({ message: "Invalid submission format." }, 400);
  }

  if (isLikelyAutomated(parsed)) {
    return json({ ok: true });
  }

  const { values, fieldErrors } = validate(parsed);
  if (Object.keys(fieldErrors).length > 0) {
    return json(
      { message: "Review the highlighted fields and try again.", fieldErrors },
      400,
    );
  }

  const submission = {
    ...values,
    submittedAt: new Date().toISOString(),
    website: "",
  };

  try {
    const primary = await postToWordPress("testimonial-submissions", request, submission);

    if (primary.response.ok) {
      return json({ ok: true });
    }

    if (!isMissingWordPressRoute(primary.response, primary.data)) {
      return json({ message: "We could not confirm delivery. Please use email instead." }, 502);
    }

    const fallbackMessage = [
      "Testimonial submission for editorial review",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : "",
      values.role ? `Role: ${values.role}` : "",
      `Rating: ${values.rating ?? "Not provided"}`,
      "Consent to review and publish: Yes",
      "",
      values.quote,
    ].filter(Boolean).join("\n");

    const fallback = await postToWordPress("contact-submissions", request, {
      fullName: values.name,
      email: values.email,
      company: values.company,
      projectType: "Testimonial submission",
      timeline: "",
      budget: "",
      message: fallbackMessage,
      formKind: "testimonial",
      consent: true,
      submittedAt: submission.submittedAt,
      website: "",
    });

    if (fallback.response.ok) {
      return json({ ok: true });
    }

    if (isMissingWordPressRoute(fallback.response, fallback.data)) {
      return json(
        { message: "The testimonial form is not connected right now. Email hello@imadi-innovations.com instead." },
        503,
      );
    }

    return json({ message: "We could not confirm delivery. Please use email instead." }, 502);
  } catch {
    return json(
      { message: "The testimonial service is unavailable. Email hello@imadi-innovations.com instead." },
      502,
    );
  }
}
