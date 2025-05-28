"use client";
import React, { useEffect, useState } from "react";
import Blog from "./blog";


export interface BlogObject {
    blogTitle: string;
    blogText: string;
    publishDate: Date;
}

function BlogBlog() {
    const [blog, setBlog] = useState<BlogObject | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const blogId = window.location.pathname;
        setLoading(true);
        fetch(`/api${blogId}`)
            .then((res) =>
                res.json()
            )
            .then((data) => {
                setBlog(data)
                setLoading(false)

            })
    }, []);

    return (
        <div>
            {/* <p>blog: {blog?.blogText}</p> */}

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

export default BlogBlog;
