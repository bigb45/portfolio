"use client";

import React, { useEffect, useState } from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import BlogSkeleton from "./blogSkeleton";

export default function BlogList() {
    const [blogs, setBlogs] = useState<BlogListItemProps[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog", { cache: "no-store" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data: BlogListItemProps[]) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <BlogSkeleton />;

    if (!blogs || blogs.length === 0) return <p>No blogs found.</p>;

    return (
        <div>
            {blogs.map((blogItem) => (
                <BlogListItem key={blogItem.id} {...blogItem} />
            ))}
        </div>
    );
}
