import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    try {
        const res = await prisma.case_study.findMany({
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
