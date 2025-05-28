import { prisma } from "@/lib/prisma";
import React from "react";
import { BlogObject } from "./page";

interface BlogProps {
    articleText: string;
}

export default function Blog({ articleText }: BlogProps) {

    return (
        <div>
            <p>{articleText}</p>
            {/* <Markdown>*hello* hello</Markdown> */}

        </div>
    );
}

