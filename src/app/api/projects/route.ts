import { ProjectProps } from "@/app/projects/projectCard";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Subtitles } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    try {
        const res = await prisma.project.findMany({
            select: {
                id: true,
                title: true,
                subtitle: true,
                images: true,
            },
        });
        return NextResponse.json(res);
    } catch (error) {
        console.error("GET /api/projects failed:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
