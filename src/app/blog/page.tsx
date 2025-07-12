import React, { Suspense, useEffect, useState } from "react";
import BlogList from "./blogList";

function BlogPage() {
    return (
        <div>
            <div className="mb-10 mt-20 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl lg:mt-40">
                <span className="text-[#fd6463] underline decoration-black decoration-wavy underline-offset-8">
                    Mo&apos;s
                </span>{" "}
                Blog
            </div>

            <BlogList />
        </div>
    );
}

export default BlogPage;
