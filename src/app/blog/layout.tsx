import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Articles by Mohammed Natour on mobile development, design, and engineering.",
    alternates: { canonical: "/blog/" },
    openGraph: {
        title: "Blog | Mohammed Natour",
        description:
            "Articles by Mohammed Natour on mobile development, design, and engineering.",
        url: "/blog/",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
