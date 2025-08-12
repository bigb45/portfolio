import { generateRandomId } from "@/app/utils";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// todo: handle errors
export async function GET() {
    console.log("getting the blogs");
    const caseStudies = await prisma.case_study.findMany();
    return NextResponse.json(caseStudies);
}
