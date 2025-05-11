import React from "react";
import BlogListItem, { BlogListItemProps } from "../components/BlogItem";

export default async function BlogList() {
    const blogList = await getBlogs();
    return (
        <div>
            {blogList.map((blogItem) => {
                return <BlogListItem key={blogItem.id} {...blogItem} />;
            })}
        </div>
    );
}

async function getBlogs(): Promise<BlogListItemProps[]> {
    const blogApiUrl = "https://6818d0b05a4b07b9d1d0f526.mockapi.io/api/blog/";
    const blogListEndpoint = "blogList";

    const response = await fetch(blogApiUrl + blogListEndpoint);

    // error handling here
    // await new Promise((response) => setTimeout(response, 2000));
    return response.json();
}
