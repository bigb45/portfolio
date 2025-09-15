"use client";
import React, { Suspense, useEffect, useState } from "react";
import BlogList from "./blogList";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../loading";

function BlogPage() {
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
        <div className="relative mb-10 mt-20 flex h-[calc(100vh-8rem)] flex-col gap-3 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl lg:mt-40">
            {blogs && blogs.length !== 0 && (
                <div className="mb-10 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
                    <span className="text-[#fd6463] underline decoration-black decoration-wavy underline-offset-8">
                        Mo&apos;s
                    </span>{" "}
                    Blog
                </div>
            )}

            {/* <BlogList /> */}
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
                    <motion.div
                        key="empty"
                        className="flex flex-1 flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.p className="flex-1 text-center text-3xl text-gray-500">
                            No Blogs found.{" "}
                        </motion.p>
                    </motion.div>
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
        </div>
    );
}

export default BlogPage;
