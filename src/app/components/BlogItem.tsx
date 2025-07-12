"use client";
import { Divide, Icon, Pin } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { formatDate } from "../utils";

export interface BlogListItemProps {
    blogTitle: string;
    blogSubtitle: string;
    category: string | null;
    publishDate: Date;
    isPinned: boolean;
    isPublic: boolean;
    color: string | null;
    id: string;
}

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
            <div className="h-[1px] w-full bg-gray-200"></div>
            <div className="group py-4">
                <Link href={`${id}`}>
                    <div className="w-full rounded-lg p-4 transition-all duration-200 group-hover:bg-gray-100">
                        <div className="flex justify-between">
                            {" "}
                            <p className="text-base font-medium lg:text-xl">
                                {blogTitle}
                            </p>{" "}
                            {isPinned ? (
                                <Pin className="text-gray-300" />
                            ) : (
                                <></>
                            )}
                        </div>
                        <p className="text-base text-gray-400 lg:text-xl">
                            Published on {formatDate(publishDate)}
                        </p>
                        <div className="my-2 flex flex-col">
                            <p className="text-base lg:text-xl">
                                {blogSubtitle}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default BlogListItem;
