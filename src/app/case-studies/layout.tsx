import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case studies",
    description:
        "In-depth case studies on product and engineering work by Mohammed Natour.",
    alternates: { canonical: "/case-studies/" },
    openGraph: {
        title: "Case studies | Mohammed Natour",
        description:
            "In-depth case studies on product and engineering work by Mohammed Natour.",
        url: "/case-studies/",
    },
};

export default function CaseStudiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
