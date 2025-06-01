'use client';
import React from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import { prisma } from "@/lib/prisma";


import { useEffect, useState } from 'react';
import { BlogObject } from "./[blogPostId]/page";

export default function BlogList() {
    const [blogs, setBlogs] = useState<BlogListItemProps[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('/api/blog'); // calls your API route
            const data = await res.json();
            setBlogs(data);
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            {blogs.map((blogItem) => (
                <BlogListItem key={blogItem.id} {...blogItem} />
            ))}
        </div>
    );
}
