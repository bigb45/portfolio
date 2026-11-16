"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationLinks = ({ className = "", linkClassName = "" }) => {
    const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        const host = window.location.host;
        if (host.includes("courses.")) {
            setBaseUrl("https://natour.dev");
        }
    }, []);

    const links = [
        { href: "/blog/", label: "Blog" },
        { href: "/case-studies/", label: "Case studies" },
        { href: "/projects/", label: "Projects" },
        { href: "/secret/", label: "Secret" },
    ];

    return (
        <div className={className}>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={baseUrl ? `${baseUrl}${link.href}` : link.href}
                    className={`squiggle ${linkClassName}`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default NavigationLinks;
