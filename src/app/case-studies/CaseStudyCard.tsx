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
        <Link href={id} className="group relative flex w-full justify-center">
            <div className="absolute left-0 top-1/2 -z-10 flex h-10 w-full -translate-y-1/2 cursor-pointer items-center justify-start gap-2 text-[18px] font-light text-[#FD6463]">
                Read <ArrowIcon />{" "}
            </div>
            {/* card */}
            <div className="ml-auto flex w-full origin-right items-center justify-between rounded-xl border border-[#D9D9D9] bg-white p-3 transition-all duration-300 ease-out group-hover:w-[calc(100%-100px)]">
                {/* Title */}
                <div className="mr-10 flex w-[400px] flex-col items-start justify-center">
                    <p className="pb-6 text-[28px] font-semibold">{title}</p>
                    <div className="text-[18px] font-normal leading-normal text-[#4D4D4D]">
                        {subtitle}
                    </div>
                </div>

                {/* Images */}
                <Link
                    className="group/parent relative mb-8 h-[140px] cursor-pointer"
                    href={id}
                >
                    <StackedImages images={images} />
                </Link>
            </div>
        </Link>
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
