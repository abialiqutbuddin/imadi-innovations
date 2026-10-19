import { NextResponse } from "next/server";

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

const MAX_BODY_BYTES = 24_000;
const UPSTREAM_TIMEOUT_MS = 10_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const projectTypes = new Set([
  "",
  "Custom software",
  "Web application",
  "Mobile application",
  "MVP or SaaS",
  "AI or workflow automation",
  "Integration or modernization",
  "Not sure",
  // Legacy form values retained until those forms are migrated.
  "Mobile App",
  "Web App / Portal",
  "Desktop App",
  "Dashboard / Admin Panel",
  "AI Integration",
  "Automation / Integration",
  "Complete Business System",
  "Tijarat Early Access",
  "Tijarat Demo",
  "Testimonial submission",
]);

const timelines = new Set([
  "",
  "Exploring options",
  "Within 1–3 months",
  "Within 3–6 months",
  "More than 6 months",
  "Existing system needs attention",
]);

const budgets = new Set([
  "",
  "Under $2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
  "Ongoing support",
  "Founder beta",
  // Legacy values retained until the Tijarat and utility forms are migrated.
  "$2,500 - $5,000",
  "$5,000 - $10,000",
]);

type FieldName =
  | "fullName"
  | "email"
  | "company"
  | "projectType"
  | "timeline"
  | "budget"
  | "message"
  | "consent";

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

function confirmedSuccess(request: Request) {
  const response = json({ ok: true });
  response.cookies.set("imadi-contact-receipt", "confirmed", {
    httpOnly: true,
    maxAge: 10 * 60,
    path: "/thank-you",
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
  });
  return response;
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

function cleanAttribution(value: unknown) {
  const source = isRecord(value) ? value : {};
  return {
    utmSource: cleanString(source.utmSource, 120),
    utmMedium: cleanString(source.utmMedium, 120),
    utmCampaign: cleanString(source.utmCampaign, 160),
    utmTerm: cleanString(source.utmTerm, 160),
    utmContent: cleanString(source.utmContent, 160),
    referrer: cleanString(source.referrer, 500),
    landingPage: cleanString(source.landingPage, 500),
  };
}

function validate(payload: Record<string, unknown>) {
  const fullName = cleanString(payload.fullName, 101);
  const email = cleanString(payload.email, 255).toLowerCase();
  const company = cleanString(payload.company, 121);
  const projectType = cleanString(payload.projectType, 100);
  const timeline = cleanString(payload.timeline, 100);
  const budget = cleanString(payload.budget, 100);
  const message = cleanString(payload.message, 2501);
  const formKind = cleanString(payload.formKind, 30);
  const consent = payload.consent === true;
  const fieldErrors: FieldErrors = {};

  if (fullName.length < 2 || fullName.length > 100) {
    fieldErrors.fullName = "Enter a name between 2 and 100 characters.";
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (company.length > 120) {
    fieldErrors.company = "Company name must be 120 characters or fewer.";
  }

  if (!projectTypes.has(projectType)) {
    fieldErrors.projectType = "Choose one of the available work types.";
  }

  if (!timelines.has(timeline)) {
    fieldErrors.timeline = "Choose one of the available timeline options.";
  }

  if (!budgets.has(budget)) {
    fieldErrors.budget = "Choose one of the available engagement ranges.";
  }

  if (message.length < 30 || message.length > 2500) {
    fieldErrors.message = "Describe what needs to change in 30–2,500 characters.";
  }

  if ((formKind === "contact" || formKind === "tijarat") && !consent) {
    fieldErrors.consent = "Confirm that Imadi Innovations may respond to your enquiry.";
  }

  return {
    values: { fullName, email, company, projectType, timeline, budget, message, consent, formKind },
    fieldErrors,
  };
}

function isLikelyAutomated(payload: Record<string, unknown>) {
  if (cleanString(payload.website, 500)) {
    return true;
  }

  const startedAt = Number(payload.startedAt);
  return Number.isFinite(startedAt) && Date.now() - startedAt < 750;
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

  const forwardedFor = cleanString(request.headers.get("x-forwarded-for")?.split(",")[0], 64);

  try {
    const response = await fetch(endpoint("contact-submissions"), {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Forwarded-For": forwardedFor,
      },
      body: JSON.stringify({
        ...values,
        attribution: cleanAttribution(parsed.attribution),
        submittedAt: new Date().toISOString(),
        website: "",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

    if (!response.ok) {
      if (isMissingWordPressRoute(response, data)) {
        return json(
          {
            message:
              "The contact form is not connected right now. Email hello@imadi-innovations.com or use WhatsApp instead.",
          },
          503,
        );
      }

      return json(
        { message: "We could not confirm delivery. Please use email or WhatsApp instead." },
        502,
      );
    }

    return confirmedSuccess(request);
  } catch {
    return json(
      { message: "The contact service is unavailable. Please use email or WhatsApp instead." },
      502,
    );
  }
}
