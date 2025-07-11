import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } },
): Promise<NextResponse> {
    console.log(params.projectId);
    const project = await prisma.project.findUnique({
        where: { id: params.projectId },
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

    return NextResponse.json(project);
}
