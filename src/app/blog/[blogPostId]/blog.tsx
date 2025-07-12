import { prisma } from "@/lib/prisma";
import React from "react";
import { BlogObject } from "./page";
import { BlogListItemProps } from "@/app/components/BlogItem";

export default function Blog({
    blogText,
    publishDate,
    blogTitle,
    blogSubtitle,
}: BlogObject) {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-2 text-center text-3xl font-bold lg:text-5xl">
                {blogTitle}
            </h1>
            <h2 className="mb-6 text-center text-lg text-gray-600 lg:text-xl">
                {blogSubtitle}
            </h2>
            <p className="prose max-w-none text-justify text-base leading-7 text-gray-800 lg:text-lg">
                {blogText}
            </p>
            {/* <Markdown>*hello* hello</Markdown> */}
        </div>
    );
}
