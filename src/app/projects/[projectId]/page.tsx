import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectPageClient from "./ProjectPageClient";
import { getProjectDetail, toProjectProps } from "@/lib/project-detail";
import { getS3Url } from "@/lib/utils";

type Props = {
    params: { projectId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = await getProjectDetail(params.projectId);
    if (!project) {
        return { title: "Project" };
    }
    const description =
        project.subtitle?.trim() ||
        project.description.slice(0, 160) ||
        project.title;
    const ogImage = project.images?.[0] ? getS3Url(project.images[0]) : undefined;
    return {
        title: project.title,
        description,
        alternates: { canonical: `/projects/${params.projectId}/` },
        openGraph: {
            title: project.title,
            description,
            type: "website",
            url: `/projects/${params.projectId}/`,
            images: ogImage ? [{ url: ogImage }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export default async function Page({ params }: Props) {
    const project = await getProjectDetail(params.projectId);
    if (!project) notFound();
    return <ProjectPageClient initialProject={toProjectProps(project)} />;
}
