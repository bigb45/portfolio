"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { AnimatePresence, motion } from "framer-motion";
import BlogComponent from "./blog";

export interface BlogObject {
    blogTitle: string;
    blogText: string;
    blogSubtitle: string;
    publishDate: Date;
    category: string;
}

function BlogPage() {
    const [blog, setBlog] = useState<BlogObject | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const blogId = window.location.pathname;

        const fetchBlog = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api${blogId}`);
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const data = await res.json();
                console.log({ data });
                setBlog(data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, []);

    return (
        <div className="items-center overflow-hidden">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        className="h-screen"
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Loading />
                    </motion.div>
                ) : (
                    <motion.div
                        key="blog"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {error ? (
                            <p>Something went wrong: {error}</p>
                        ) : (
                            <BlogComponent {...blog!} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default BlogPage;
