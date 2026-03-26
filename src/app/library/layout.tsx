import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Library",
    description: "Interactive UI experiments.",
    alternates: { canonical: "/library/" },
};

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
