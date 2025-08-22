import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { caseStudyId: string };
    },
): Promise<NextResponse> {
    try {
        console.log({ params });
        const res = await prisma.case_study.findUnique({
            where: {
                id: params.caseStudyId,
            },
            select: {
                id: true,
                title: true,
                subtitle: true,
                images: true,
            },
        });
        return NextResponse.json(res);
    } catch (error) {
        console.error("GET /api/case-study failed:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
