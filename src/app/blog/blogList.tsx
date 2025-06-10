import React from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import BlogSkeleton from "./blogSkeleton";

export const dynamic = 'force-dynamic';

export default async function BlogList() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/blog`);
    const blogs = await res.json();

    return (
        <div>
            {blogs ?
                blogs.map((blogItem: BlogListItemProps) => (
                    <BlogListItem key={blogItem.id} {...blogItem} />
                )) : <BlogSkeleton />

            }
        </div>
    );
}
