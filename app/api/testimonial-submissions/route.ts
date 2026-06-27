import { NextResponse } from "next/server";

const WORDPRESS_API_URL =
    process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

function endpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

function cleanString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

async function postToWordPress(path: string, request: Request, body: Record<string, unknown>) {
    const response = await fetch(endpoint(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));

    return { response, data };
}

function isMissingWordPressRoute(response: Response, data: Record<string, unknown>) {
    const message = cleanString(data.message);
    return response.status === 404 && (
        data.code === "rest_no_route" ||
        message.toLowerCase().includes("no route was found")
    );
}

export async function POST(request: Request) {
    let payload: Record<string, unknown>;

    try {
        payload = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid submission format." },
            { status: 400 }
        );
    }

    const name = cleanString(payload.name);
    const email = cleanString(payload.email);
    const quote = cleanString(payload.quote);
    const consent = Boolean(payload.consent);

    if (!name || !email || !quote) {
        return NextResponse.json(
            { message: "Name, email, and testimonial are required." },
            { status: 400 }
        );
    }

    if (!consent) {
        return NextResponse.json(
            { message: "Please confirm that we may publish your testimonial." },
            { status: 400 }
        );
    }

    if (quote.length < 20 || quote.length > 1200) {
        return NextResponse.json(
            { message: "Testimonials must be between 20 and 1200 characters." },
            { status: 400 }
        );
    }

    try {
        const testimonialBody = {
            name,
            email,
            company: cleanString(payload.company),
            role: cleanString(payload.role),
            quote,
            rating: Number(payload.rating) || 5,
            consent,
            website: cleanString(payload.website),
        };

        const { response, data } = await postToWordPress("testimonial-submissions", request, testimonialBody);

        if (!response.ok) {
            if (isMissingWordPressRoute(response, data)) {
                const fallbackMessage = [
                    "Testimonial submission",
                    `Name: ${name}`,
                    `Email: ${email}`,
                    testimonialBody.company ? `Company: ${testimonialBody.company}` : "",
                    testimonialBody.role ? `Role: ${testimonialBody.role}` : "",
                    `Rating: ${testimonialBody.rating}`,
                    "",
                    quote,
                ].filter(Boolean).join("\n");

                const fallback = await postToWordPress("contact-submissions", request, {
                    fullName: name,
                    email,
                    company: testimonialBody.company,
                    projectType: "Testimonial submission",
                    budget: "",
                    message: fallbackMessage,
                    website: testimonialBody.website,
                });

                if (fallback.response.ok) {
                    return NextResponse.json({
                        message: "Thank you. Your testimonial has been submitted for review.",
                    });
                }

                if (isMissingWordPressRoute(fallback.response, fallback.data)) {
                    return NextResponse.json(
                        { message: "The testimonial form is not connected to WordPress right now. Please update or activate the IMADI Content Manager plugin." },
                        { status: 503 }
                    );
                }
            }

            return NextResponse.json(
                { message: "We could not submit your testimonial right now." },
                { status: response.status }
            );
        }

        return NextResponse.json({
            message: data.message || "Thank you. Your testimonial has been submitted for review.",
        });
    } catch {
        return NextResponse.json(
            { message: "The testimonial service is unavailable right now." },
            { status: 502 }
        );
    }
}
