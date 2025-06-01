import React, { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
import BlogList from "./blogList";
import BlogSkeleton from "./blogSkeleton";

function BlogPage() {


    return (
        <div>
            <div className="mb-10 mt-40 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
                <span className="text-[#fd6463] underline decoration-black decoration-wavy underline-offset-8">
                    Mo&apos;s
                </span>{" "}
                Blog
            </div>
            <Suspense
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <p><BlogSkeleton /></p>
                    </div>
                }
            >
                <BlogList />
            </Suspense>
        </div>
    );
}

export default BlogPage;
