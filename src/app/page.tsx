import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getSiteUrl } from "@/lib/site";

const description =
    "Mohammed Natour — mobile app developer and designer. Portfolio, projects, case studies, and blog.";

export const metadata: Metadata = {
    description,
    alternates: { canonical: "/" },
    openGraph: {
        title: "Mohammed Natour",
        description,
        url: "/",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mohammed Natour",
        description,
    },
};

export default function Page() {
    const url = getSiteUrl();
    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Mohammed Natour",
        url,
        jobTitle: "Mobile App Developer",
        description:
            "I develop mobile apps and create designs on Figma sometimes.",
        sameAs: [
            process.env.NEXT_PUBLIC_LINKEDIN_URL,
            process.env.NEXT_PUBLIC_GITHUB_URL,
        ].filter(Boolean),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personJsonLd),
                }}
            />
            <HomeClient />
        </>
    );
}
