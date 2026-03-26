import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Courses",
    description:
        "Course challenges and chapters — learning content from Mohammed Natour.",
    alternates: { canonical: "/courses/" },
    openGraph: {
        title: "Courses | Mohammed Natour",
        description:
            "Course challenges and chapters — learning content from Mohammed Natour.",
        url: "/courses/",
    },
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
