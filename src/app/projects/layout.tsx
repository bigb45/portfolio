import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Selected mobile and software projects by Mohammed Natour — tech stack, links, and galleries.",
    alternates: { canonical: "/projects/" },
    openGraph: {
        title: "Projects | Mohammed Natour",
        description:
            "Selected mobile and software projects by Mohammed Natour — tech stack, links, and galleries.",
        url: "/projects/",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
