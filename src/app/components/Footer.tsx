"use client";

import { useEffect, useState } from "react";
import ContactSection from "./ContactSection";
import WaveMarquee from "./WaveMarquee";

export default function Footer() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const timer = window.setTimeout(() => {
            document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
        return () => window.clearTimeout(timer);
    }, [open]);

    return (
        <footer className="mt-24 w-full">
            <WaveMarquee open={open} onToggle={() => setOpen((v) => !v)} />
            <ContactSection open={open} />
        </footer>
    );
}
