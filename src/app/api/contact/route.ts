import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const honeypot = asString(body.company);
    if (honeypot) {
        return NextResponse.json({ ok: true });
    }

    const name = asString(body.name);
    const email = asString(body.email);
    const message = asString(body.message);

    if (name.length < 1 || name.length > 80) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 120) {
        return NextResponse.json(
            { error: "A valid email is required." },
            { status: 400 },
        );
    }
    if (message.length < 10 || message.length > 2000) {
        return NextResponse.json(
            { error: "Message should be at least 10 characters." },
            { status: 400 },
        );
    }

    try {
        await prisma.contactMessage.create({
            data: { name, email, message },
        });
    } catch (error) {
        console.error("POST /api/contact db failed:", error);
        return NextResponse.json(
            { error: "Could not save your message." },
            { status: 500 },
        );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (resendKey && to) {
        try {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${resendKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Portfolio <noreply@natour.dev>",
                    to,
                    subject: `New inquiry from ${name}`,
                    text: `${name} <${email}>\n\n${message}`,
                }),
            });
        } catch (error) {
            console.error("POST /api/contact email failed:", error);
        }
    }

    return NextResponse.json({ ok: true });
}
