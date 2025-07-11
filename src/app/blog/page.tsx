import React, { Suspense, useEffect, useState } from "react";
import BlogList from "./blogList";
import Loading from "../loading";

function BlogPage() {
    return (
        <div>
            <div className="mb-10 mt-40 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
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
