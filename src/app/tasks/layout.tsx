import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tasks",
    description: "Internal tasks view.",
    alternates: { canonical: "/tasks/" },
    robots: { index: false, follow: false },
};

export default function TasksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
