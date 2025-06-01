import React from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import { prisma } from "@/lib/prisma";

export default async function BlogList() {
    const blogList = await getBlogs();
    return (
        <div>
            {blogList.map((blogItem) => {
                return <BlogListItem key={blogItem.id} {...blogItem} />;
            })}
        </div>
    );
}

async function getBlogs(): Promise<BlogListItemProps[]> {

    const blog = await prisma.blog.findMany({
        orderBy: [
            { isPinned: 'desc' },
            { publishDate: 'desc' }
        ]
    })

    return blog
}
