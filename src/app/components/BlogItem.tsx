import { Divide, Icon, Pin } from "lucide-react";
import Link from "next/link";
import React from "react";

interface props {
    blogTitle: string;
    blogSubtitle: string;
    category: string;
    publishDate: Date;
    isPinned: boolean;
    isPublic: boolean;
    color: string;
    id: string;
}

export type BlogListItemProps = props;

function BlogListItem({
    blogTitle,
    blogSubtitle,
    category,
    publishDate,
    isPinned,
    isPublic,
    color,
    id,
}: BlogListItemProps) {
    return (
        <div>
            <div className="h-[2px] w-full bg-gray-300"></div>

            <div className="group py-4">
                <Link href={`blog/${id}`}>
                    <div className="w-full rounded-lg p-4 group-hover:bg-gray-100">
                        <div className="flex justify-between">
                            {" "}
                            <p className="text-3xl">{blogTitle}</p>{" "}
                            {isPinned ? (
                                <Pin className="text-gray-400" />
                            ) : (
                                <></>
                            )}
                        </div>
                        <p className="text-sm text-gray-400">
                            published on 23/4/2025
                        </p>
                        <div className="my-2 flex flex-col">
                            <p>{blogSubtitle}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default BlogListItem;
