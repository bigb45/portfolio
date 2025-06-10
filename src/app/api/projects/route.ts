import { ProjectProps } from "@/app/projects/projectCard";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    const projects: ProjectProps[] = [];
    return NextResponse.json(projects);
}
