import React from "react";
import type { BlogObject } from "@/app/blog/blog-types";
import { formatDate } from "@/app/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogComponent({
    blogText,
    publishDate,
    blogTitle,
    blogSubtitle,
    category,
}: BlogObject) {
    return (
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 px-4 py-8">
            {category ? (
                <div className="w-fit rounded-full bg-gray-200 px-3 py-0.5 font-medium text-[#374151]">
                    {category}
                </div>
            ) : null}

            <div>
                <h1 className="mb-2 text-center text-4xl font-bold lg:text-6xl">
                    {blogTitle}
                </h1>
                <h2 className="text-center text-lg text-gray-600 lg:text-xl">
                    {blogSubtitle}
                </h2>
            </div>
            <p className="text-sm text-gray-400">
                Published on {formatDate(publishDate)}
            </p>

            <div className="mt-6 w-full">
                <div className="prose prose-slate max-w-none text-justify text-base leading-7 text-gray-800 lg:text-lg prose-headings:mb-4 prose-headings:mt-8 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:underline">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {blogText}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
