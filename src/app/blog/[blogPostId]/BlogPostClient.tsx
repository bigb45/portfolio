"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { AnimatePresence, motion } from "framer-motion";
import BlogComponent from "./blog";
import type { BlogObject } from "@/app/blog/blog-types";
import { useParams } from "next/navigation";

type Props = {
    initialBlog: BlogObject | null;
};

export default function BlogPostClient({ initialBlog }: Props) {
    const [blog, setBlog] = useState<BlogObject | null>(initialBlog);
    const [loading, setLoading] = useState(() => !initialBlog);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const slug =
        typeof params?.blogPostId === "string" ? params.blogPostId : undefined;

    useEffect(() => {
        if (initialBlog) {
            setBlog(initialBlog);
            setLoading(false);
            return;
        }
        if (!slug) return;
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/blog/${slug}`);
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const data = await res.json();
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
    }, [slug, initialBlog]);

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
                        ) : blog ? (
                            <BlogComponent {...blog} />
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
