import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// todo: handle errors
export async function GET() {
    console.log("getting the case studies");
    const caseStudies = await prisma.case_study.findMany();
    return NextResponse.json(caseStudies);
}
