import React from "react";
import ArrowIcon from "@/assets/icons/arrow_thin.svg";
import Link from "next/link";

function ProjectPreviewCard({
    onShowImagesClick,
    href,
}: {
    onShowImagesClick: () => void;
    href: string;
}) {
    return (
        <div className="flex h-[360px] w-[380px] flex-col items-center justify-center rounded-xl border border-[#D9D9D9] p-3">
            <p className="mb-4 w-full pb-6 text-center text-[28px] font-semibold">
                A-Z English
            </p>
            <div
                className="group/parent relative mb-8 h-[140px] w-full cursor-pointer"
                onClick={onShowImagesClick}
            >
                {/* Left image */}
                <img
                    draggable={false}
                    className="myshadow-md absolute left-10 top-0 h-[120px] w-[120px] -rotate-[7deg] rounded-lg transition-all duration-300 group-hover/parent:-translate-x-2 group-hover/parent:-rotate-[10deg]"
                    src="https://picsum.photos/seed/left/400/600"
                    alt=""
                />
                {/* Right image */}
                <img
                    draggable={false}
                    className="myshadow-md absolute right-10 top-0 h-[120px] w-[120px] rotate-[8deg] rounded-lg transition-all duration-300 group-hover/parent:translate-x-2 group-hover/parent:rotate-[10deg]"
                    src="https://picsum.photos/seed/right/400/600"
                    alt=""
                />
                {/* Center image */}
                <img
                    draggable={false}
                    className="absolute left-1/2 top-0 h-[130px] w-[130px] -translate-x-1/2 -translate-y-4 rounded-lg shadow-lg transition-all duration-500 group-hover/parent:-translate-y-6"
                    src="https://picsum.photos/seed/center/400/600"
                    alt=""
                />
            </div>
            <div className="mb-6 text-[18px] font-normal leading-normal text-[#4D4D4D]">
                An app for food fanatics who want a fast, simple way to order
                delicious dishes
            </div>

            <Link
                href={href}
                className="group/clickable flex h-10 w-full cursor-pointer items-center justify-start gap-2 text-[18px] font-light text-[#FD6463]"
            >
                See more details{" "}
                <ArrowIcon className="origin-left transition-transform duration-[250ms] group-hover/clickable:scale-x-125" />
            </Link>
        </div>
    );
}

export default ProjectPreviewCard;
