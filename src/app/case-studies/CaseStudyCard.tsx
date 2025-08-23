import React from "react";
import { formatDate } from "../utils";
import Link from "next/link";
import ArrowIcon from "@/assets/icons/arrow_thin.svg";
import { StackedImages } from "../projects/projectCard";

export interface CaseStudyCardProps {
    id: string;
    title: string;
    subtitle: string;
    images: string[];
    publishDate: Date;
}

function CaseStudyCard({
    id,
    title,
    subtitle,
    images,
    publishDate,
}: CaseStudyCardProps) {
    return (
        <div className="group relative flex w-full justify-center">
            {/* card */}
            <Link
                href={id}
                className="ml-auto flex w-full items-end justify-between rounded-xl border border-[#D9D9D9] p-4"
            >
                {/* Title */}
                <div className="mr-10 flex h-full w-[400px] flex-col items-start justify-between">
                    <div>
                        <p className="pb-6 text-[28px] font-semibold">
                            {title}
                        </p>
                        <div className="text-[18px] font-normal leading-normal text-[#4D4D4D]">
                            {subtitle}
                        </div>
                    </div>
                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-4 text-[18px] font-light text-[#FD6463] opacity-0 transition-all duration-200 hover:bg-neutral-100 group-hover:opacity-100">
                        Read <ArrowIcon />{" "}
                    </div>
                </div>

                {/* Images */}
                <div className="group/parent relative flex h-full cursor-pointer items-center justify-center">
                    <StackedImages images={images} />
                </div>
            </Link>
        </div>
    );
}

export default CaseStudyCard;

{
    /* Left image */
}
{
    /* <img
                    draggable={false}
                    className="myshadow-md absolute -left-16 top-4 h-[120px] w-[120px] -rotate-[7deg] rounded-lg transition-all duration-300 group-hover/parent:-translate-x-3 group-hover/parent:-rotate-[10deg]"
                    src={}
                    alt=""
                /> */
}
{
    /* Right image */
}
{
    /* <img
                    draggable={false}
                    className="myshadow-md absolute -right-16 top-4 h-[120px] w-[120px] rotate-[8deg] rounded-lg transition-all duration-300 group-hover/parent:translate-x-3 group-hover/parent:rotate-[10deg]"
                    src={images![1]}
                    alt=""
                /> */
}
{
    /* Center image */
}
{
    /* <img
                    draggable={false}
                    className="relative z-10 h-[130px] w-[130px] rounded-lg shadow-lg transition-all duration-500 group-hover/parent:-translate-y-3"
                    src={images![2]}
                    alt=""
                /> */
}
