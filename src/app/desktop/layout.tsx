import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Desktop",
    description: "Desktop-style interactive playground.",
    alternates: { canonical: "/desktop/" },
};

export default function DesktopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
