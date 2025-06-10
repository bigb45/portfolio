import React from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import BlogSkeleton from "./blogSkeleton";

export const dynamic = "force-dynamic";

export default async function BlogList() {
    try {
        const res = await fetch(
            `${process.env.SITE_URL || "http://localhost:3000"}/api/blog`,
            {
                cache: "no-store",
            },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const blogs: BlogListItemProps[] = await res.json();

        return (
            <div>
                {blogs.length ? (
                    blogs.map((blogItem) => (
                        <BlogListItem key={blogItem.id} {...blogItem} />
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        );
    } catch (err) {
        console.error("Blog fetch error:", err);
        return <BlogSkeleton />;
    }
}
