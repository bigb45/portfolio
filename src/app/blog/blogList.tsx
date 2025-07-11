"use client";

import React, { useEffect, useState } from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../loading";

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

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loading"
                    className="flex h-64 items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Loading />
                </motion.div>
            ) : !blogs || blogs.length === 0 ? (
                <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-500"
                >
                    No blogs found.
                </motion.p>
            ) : (
                <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {blogs.map((blogItem) => (
                        <BlogListItem key={blogItem.id} {...blogItem} />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
