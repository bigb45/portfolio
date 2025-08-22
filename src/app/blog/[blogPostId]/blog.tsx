import { prisma } from "@/lib/prisma";
import React from "react";
import { BlogObject } from "./page";
import { BlogListItemProps } from "@/app/components/BlogItem";
import { formatDate } from "@/app/utils";

export default function BlogComponent({
    blogText,
    publishDate,
    blogTitle,
    blogSubtitle,
    category,
}: BlogObject) {
    return (
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 px-4 py-8">
            <div className="w-fit rounded-full bg-gray-200 px-4 py-1 font-medium text-[#374151]">
                {category}
            </div>

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
                <p className="prose max-w-none text-justify text-base leading-7 text-gray-800 lg:text-lg">
                    {blogText}
                </p>
                {/* <Markdown>*hello* hello</Markdown> */}
            </div>
        </div>
    );
}
