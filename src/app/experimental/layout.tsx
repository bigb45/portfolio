import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experimental",
    description: "Experimental UI and prototypes.",
    alternates: { canonical: "/experimental/" },
    robots: { index: false, follow: false },
};

export default function ExperimentalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
