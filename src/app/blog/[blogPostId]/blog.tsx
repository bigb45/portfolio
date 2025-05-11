import React from "react";

interface BlogProps {
    articleText: string;
}

export default function Blog({ articleText }: BlogProps) {
    return (
        <div>
            this is the start of the blog
            <p>{articleText}</p>
            {/* <Markdown>*hello* hello</Markdown> */}
            this is the end of the blog
        </div>
    );
}
