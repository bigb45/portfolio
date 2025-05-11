"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { headers } from "next/headers";
import Blog from "./blog";

interface BlogObject {
    blogTitle: string;
    blogText: string;
    publishDate: string;
}

function BlogBlog() {
    const [blog, setBlog] = useState<BlogObject>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const blogId = window.location.pathname;
        setLoading(true);
        const fetchedBlog = fetchBlogById(blogId).then((res) => {
            console.log(res);
            setBlog(res);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex h-full w-full items-center justify-center">
                    Loading...
                </div>
            ) : (
                <Blog articleText={blog?.blogText ?? ""} />
            )}
        </div>
    );
}

async function fetchBlogById(id: string): Promise<BlogObject> {
    const blogApiUrl = "https://6818d0b05a4b07b9d1d0f526.mockapi.io/api/blog/";
    const blog = await fetch(blogApiUrl + id);
    return blog.json();
}
export default BlogBlog;
