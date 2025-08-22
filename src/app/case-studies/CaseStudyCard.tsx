import React from "react";
import { formatDate } from "../utils";
import Link from "next/link";
import ArrowIcon from "@/assets/icons/arrow_thin.svg";

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
        <Link
            href={id}
            className="flex h-[360px] w-full max-w-[400px] flex-col items-center justify-center rounded-xl border border-[#D9D9D9] p-3"
        >
            <p className="mb-4 w-full pb-6 text-center text-[28px] font-semibold">
                {title}
            </p>
            <Link
                className="group/parent relative mx-auto mb-8 h-[140px] w-fit cursor-pointer"
                // onClick={onShowImagesClick}
                href={id}
            >
                {/* Left image */}
                <img
                    draggable={false}
                    className="myshadow-md absolute -left-16 top-4 h-[120px] w-[120px] -rotate-[7deg] rounded-lg transition-all duration-300 group-hover/parent:-translate-x-3 group-hover/parent:-rotate-[10deg]"
                    src={images![0]}
                    alt=""
                />
                {/* Right image */}
                <img
                    draggable={false}
                    className="myshadow-md absolute -right-16 top-4 h-[120px] w-[120px] rotate-[8deg] rounded-lg transition-all duration-300 group-hover/parent:translate-x-3 group-hover/parent:rotate-[10deg]"
                    src={images![1]}
                    alt=""
                />
                {/* Center image */}
                <img
                    draggable={false}
                    className="relative z-10 h-[130px] w-[130px] rounded-lg shadow-lg transition-all duration-500 group-hover/parent:-translate-y-3"
                    src={images![2]}
                    alt=""
                />
            </Link>
            <div className="mb-6 text-[18px] font-normal leading-normal text-[#4D4D4D]">
                {subtitle}{" "}
            </div>

            <Link
                href={id}
                className="group/clickable flex h-10 w-full cursor-pointer items-center justify-start gap-2 text-[18px] font-light text-[#FD6463]"
            >
                See more details{" "}
                <ArrowIcon className="origin-left transition-transform duration-[250ms] group-hover/clickable:scale-x-125" />
            </Link>
        </Link>
    );
    // <div>
    //     <Link href={`${id}`}>
    //         <div className="m-4 flex flex-col rounded-md border border-black">
    //             <p>{title}</p>
    //             <p> {subtitle}</p>
    //             {/* <p> Published on {formatDate(publishDate)}</p> */}
    //         </div>
    //     </Link>
    // </div>
}

export default CaseStudyCard;
