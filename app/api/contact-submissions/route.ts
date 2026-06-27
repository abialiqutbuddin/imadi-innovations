import { NextResponse } from "next/server";

const WORDPRESS_API_URL =
    process.env.WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

function endpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

function cleanString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
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

    const fullName = cleanString(payload.fullName);
    const email = cleanString(payload.email);
    const message = cleanString(payload.message);

    if (!fullName || !email || !message) {
        return NextResponse.json(
            { message: "Full name, email, and message are required." },
            { status: 400 }
        );
    }

    if (message.length < 10 || message.length > 2000) {
        return NextResponse.json(
            { message: "Messages must be between 10 and 2000 characters." },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(endpoint("contact-submissions"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
            },
            body: JSON.stringify({
                fullName,
                email,
                company: cleanString(payload.company),
                projectType: cleanString(payload.projectType),
                budget: cleanString(payload.budget),
                message,
                website: cleanString(payload.website),
            }),
            cache: "no-store",
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            if (isMissingWordPressRoute(response, data)) {
                return NextResponse.json(
                    { message: "The contact form is not connected right now. Please email us at hello@imadi-innovations.com or message us on WhatsApp." },
                    { status: 503 }
                );
            }

            return NextResponse.json(
                { message: "We could not send your message right now." },
                { status: response.status }
            );
        }

        return NextResponse.json({
            message: data.message || "Thank you. Your message has been sent.",
        });
    } catch {
        return NextResponse.json(
            { message: "The contact service is unavailable right now." },
            { status: 502 }
        );
    }
}
