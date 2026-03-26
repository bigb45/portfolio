import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import type { BlogObject } from "@/app/blog/blog-types";
import { getSiteUrl } from "@/lib/site";

type Props = {
    params: { blogPostId: string };
};

function toBlogObject(row: {
    blogTitle: string;
    blogText: string;
    blogSubtitle: string;
    publishDate: Date;
    category: string | null;
}): BlogObject {
    return {
        blogTitle: row.blogTitle,
        blogText: row.blogText,
        blogSubtitle: row.blogSubtitle,
        publishDate: row.publishDate,
        category: row.category,
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const blog = await prisma.blog.findUnique({
        where: { slug: params.blogPostId },
        select: {
            blogTitle: true,
            blogSubtitle: true,
            blogText: true,
            slug: true,
        },
    });
    if (!blog) {
        return { title: "Blog post" };
    }
    const description =
        blog.blogSubtitle?.trim() ||
        blog.blogText.slice(0, 160).replace(/\s+/g, " ").trim() ||
        blog.blogTitle;
    return {
        title: blog.blogTitle,
        description,
        alternates: { canonical: `/blog/${blog.slug}/` },
        openGraph: {
            title: blog.blogTitle,
            description,
            type: "article",
            url: `/blog/${blog.slug}/`,
        },
        twitter: {
            card: "summary_large_image",
            title: blog.blogTitle,
            description,
        },
    };
}

export default async function Page({ params }: Props) {
    const row = await prisma.blog.findUnique({
        where: { slug: params.blogPostId },
        select: {
            blogTitle: true,
            blogText: true,
            blogSubtitle: true,
            publishDate: true,
            category: true,
            slug: true,
        },
    });
    if (!row) notFound();

    const blog = toBlogObject(row);
    const site = getSiteUrl();
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.blogTitle,
        description: blog.blogSubtitle,
        datePublished: blog.publishDate.toISOString(),
        author: {
            "@type": "Person",
            name: "Mohammed Natour",
            url: site,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${site.replace(/\/+$/, "")}/blog/${row.slug}/`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />
            <BlogPostClient initialBlog={blog} />
        </>
    );
}
