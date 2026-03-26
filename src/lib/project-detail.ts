import { prisma } from "@/lib/prisma";
import type { ProjectProps } from "@/app/projects/projectCard";

export async function getProjectDetail(id: string) {
    return prisma.project.findUnique({
        where: { id },
        include: {
            project_techstack: {
                select: {
                    technology_id: true,
                    usage: true,
                    tech_stack: {
                        select: {
                            terchstack_name: true,
                            icon_path: true,
                        },
                    },
                },
            },
        },
    });
}

export function toProjectProps(
    data: NonNullable<Awaited<ReturnType<typeof getProjectDetail>>>,
): ProjectProps {
    const techstackDetails = data.project_techstack.map((item) => ({
        id: item.technology_id,
        name: item.tech_stack.terchstack_name,
        logo: item.tech_stack.icon_path,
        usageText: item.usage,
    }));
    return {
        id: data.id,
        startTime: data.startTime?.toISOString(),
        endTime: data.endTime?.toISOString(),
        title: data.title,
        description: data.description,
        isOngoing: data.isOngoing,
        techStack: data.techStack,
        githubLink: data.githubLink ?? undefined,
        playstoreLink: data.playstoreLink ?? undefined,
        otherLink: data.otherLink ?? undefined,
        subtitle: data.subtitle ?? undefined,
        images: data.images,
        techstackDetails,
    };
}
