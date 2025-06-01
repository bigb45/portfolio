import { prisma } from "@/lib/prisma";
import React from "react";
import { BlogObject } from "./page";
import { BlogListItemProps } from "@/app/components/BlogItem";


export default function Blog(
    { blogText, publishDate, blogTitle, blogSubtitle }: BlogObject
) {

    return (
        <div>
            <p>{blogTitle}</p>
            <p>{blogSubtitle}</p>
            <p>{blogText}</p>
            {/* <Markdown>*hello* hello</Markdown> */}

        </div>
    );
}

