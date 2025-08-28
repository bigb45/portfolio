import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { blogPostId: string } },
) {
    const blog = await prisma.blog.findUnique({
        where: {
            slug: params.blogPostId,
        },
        select: {
            blogTitle: true,
            blogSubtitle: true,
            publishDate: true,
            blogText: true,
            category: true,
            slug: true,
        },
    });
    return NextResponse.json(blog);
}

export async function DELETE(
    request: Request,
    { params }: { params: { blogPostId: string } },
) {
    console.log("blog id: " + params.blogPostId);
    try {
        const result = await prisma.blog.delete({
            where: { id: params.blogPostId },
        });
        if (result.id == params.blogPostId)
            return NextResponse.json({ result: "success" });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ result: "error" }, { status: 400 });
    }
}
