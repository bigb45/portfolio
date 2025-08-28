import { Divide, Icon, Pin } from "lucide-react";
import Link from "next/link";
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
    slug: string;
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
    slug,
}: BlogListItemProps) {
    return (
        <div>
            <div className="divider h-[1px] w-full bg-gray-200"></div>
            <div className="group py-4">
                <Link href={`${slug}`}>
                    <div className="w-full rounded-lg p-4 transition-all duration-200 group-hover:bg-gray-100">
                        <div className="flex justify-between">
                            {" "}
                            <p className="text-xl font-medium lg:text-2xl">
                                {blogTitle}
                            </p>{" "}
                            {isPinned ? (
                                <Pin className="text-gray-500" />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="my-2 flex flex-col">
                            <p className="text-sm lg:text-base">
                                {blogSubtitle}
                            </p>
                        </div>
                        <div className="mt-6 flex flex-row items-center gap-6 text-sm">
                            <div className="w-fit rounded-full bg-gray-200 px-4 py-1 font-medium text-[#374151]">
                                {category}
                            </div>

                            <p className="text-gray-600">
                                Published on {formatDate(publishDate)}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default BlogListItem;
