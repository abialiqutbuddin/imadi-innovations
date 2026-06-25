import { NextResponse } from "next/server";

const WORDPRESS_API_URL =
    process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

function endpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

function cleanString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
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
        const response = await fetch(endpoint("testimonial-submissions"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
            },
            body: JSON.stringify({
                name,
                email,
                company: cleanString(payload.company),
                role: cleanString(payload.role),
                quote,
                rating: Number(payload.rating) || 5,
                consent,
                website: cleanString(payload.website),
            }),
            cache: "no-store",
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "We could not submit your testimonial right now." },
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
