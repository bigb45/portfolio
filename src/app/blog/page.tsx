// "use client";
import React, { Suspense, useEffect, useState } from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";
import { Key } from "lucide-react";
import Loading from "../loading";
import BlogList from "./blogList";
import blogSkeleton from "./blogSkeleton";
import BlogSkeleton from "./blogSkeleton";

function BlogPage() {
    // const [blogList, setBlogList] = useState<BlogItemProps[]>([]);
    // todo: get blog items from supabase database

    // useEffect(() => {
    //     getBlogs();
    // }, []);
    // async function getBlogs() {}
    return (
        <div>
            <div className="mb-10 mt-40 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
                <span className="text-[#fd6463] underline decoration-black decoration-wavy underline-offset-8">
                    Mo&apos;s
                </span>{" "}
                Blog
            </div>
            <div>
                <Suspense
                    fallback={
                        <div className="flex h-full w-full items-center justify-center">
                            <p>Loading blogs</p>
                        </div>
                    }
                    // fallback={Array.from({ length: 10 }).map((_, index) => (
                    //     <BlogSkeleton key={index} />
                    // ))}
                >
                    <BlogList />{" "}
                </Suspense>
            </div>
        </div>
    );
}

export default BlogPage;
