"use client";
import React, { useEffect, useState } from "react";
import Blog from "./blog";
import Loading from "@/app/loading";
import { AnimatePresence, motion } from "framer-motion";

export interface BlogObject {
    blogTitle: string;
    blogText: string;
    blogSubtitle: string;
    publishDate: Date;
    category: string;
}

function BlogComponent() {
    const [blog, setBlog] = useState<BlogObject | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const blogId = window.location.pathname;
        setLoading(true);
        fetch(`/api${blogId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log({ data });
                setBlog(data);
                setLoading(false);
            });
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
                        <Blog {...blog!} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default BlogComponent;
