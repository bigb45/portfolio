import { BlogListItemProps } from "@/app/components/BlogItem";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { blogPostId: string } }) {
    const blog = await prisma.blog.findUnique({
        where: {
            id: params.blogPostId
        },
        select: {
            blogTitle: true,
            blogSubtitle: true,
            publishDate: true,
            blogText: true
        }
    })
    return NextResponse.json(blog)
}

