import React, { useMemo } from "react";
import ArrowIcon from "@/assets/icons/arrow_thin.svg";
import Link from "next/link";
import { ProjectProps } from "./projectCard";
import { getS3Url } from "@/lib/utils";
import { Code, Layers, Smartphone } from "lucide-react";

function ProjectPreviewCard({
    id,
    startTime,
    endTime,
    title,
    description,
    isOngoing,
    githubLink,
    playstoreLink,
    otherLink,
    subtitle,
    images,
    onShowImagesClick,
    href,
}: ProjectProps & {
    onShowImagesClick: () => void;
    href: string;
}) {
    const resolvedImages = useMemo(
        () => (images ?? []).map((img) => getS3Url(img)),
        [images],
    );

    return (
        <Link
            href={href}
            className="flex h-[360px] w-full max-w-[400px] flex-col items-center justify-between rounded-xl border border-[#D9D9D9] p-3"
        >
            <p className="mb-4 w-full pb-6 text-center text-[28px] font-semibold">
                {title}
            </p>
            {resolvedImages.length >= 3 ? (
                <div className="group/parent relative mx-auto mb-8 h-[140px] w-fit cursor-pointer">
                    {/* Left image */}
                    <img
                        draggable={false}
                        className="myshadow-md absolute -left-16 top-4 h-[120px] w-[120px] -rotate-[7deg] rounded-lg object-cover transition-all duration-300 group-hover/parent:-translate-x-3 group-hover/parent:-rotate-[10deg]"
                        src={resolvedImages[0]}
                        alt=""
                    />
                    {/* Right image */}
                    <img
                        draggable={false}
                        className="myshadow-md absolute -right-16 top-4 h-[120px] w-[120px] rotate-[8deg] rounded-lg object-cover transition-all duration-300 group-hover/parent:translate-x-3 group-hover/parent:rotate-[10deg]"
                        src={resolvedImages[1]}
                        alt=""
                    />
                    {/* Center image */}
                    <img
                        draggable={false}
                        className="relative z-10 h-[130px] w-[130px] rounded-lg object-cover shadow-lg transition-all duration-500 group-hover/parent:-translate-y-3"
                        src={resolvedImages[2]}
                        alt=""
                    />
                </div>
            ) : (
                <div className="group/parent relative mx-auto mb-8 flex h-[140px] w-[280px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-200 shadow-inner">
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%">
                            <pattern
                                id="grid"
                                width="20"
                                height="20"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 20 0 L 0 0 0 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                        <Code
                            size={48}
                            className="transition-transform duration-500 group-hover/parent:-rotate-12 group-hover/parent:scale-110"
                        />
                        <Smartphone
                            size={48}
                            className="transition-transform duration-500 group-hover/parent:translate-y-[-4px] group-hover/parent:scale-110"
                        />
                        <Layers
                            size={48}
                            className="transition-transform duration-500 group-hover/parent:rotate-12 group-hover/parent:scale-110"
                        />
                    </div>
                </div>
            )}
            <div className="mb-6 text-[18px] font-normal leading-normal text-[#4D4D4D]">
                {subtitle}{" "}
            </div>

            <div
                // href={href}
                className="group/clickable flex h-10 w-full cursor-pointer items-center justify-start gap-2 text-[18px] font-light text-[#FD6463]"
            >
                See more details{" "}
                <ArrowIcon className="origin-left transition-transform duration-[250ms] group-hover/clickable:scale-x-125" />
            </div>
        </Link>
    );
}

export default ProjectPreviewCard;
