/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { TechnologyChipProps } from "./[projectId]/hoverableChipGroup";

export interface ProjectProps {
    id: string;
    startTime?: string;
    endTime?: string;
    title: string;
    description: string;
    isOngoing: boolean;
    techStack: string[];
    githubLink?: string;
    playstoreLink?: string;
    otherLink?: string;
    subtitle?: string;
    images: string[];
    techstackDetails: TechnologyChipProps[];
}

function ProjectCard({
    id,
    startTime,
    endTime,
    title,
    description,
    isOngoing,
    techStack,
    githubLink,
    playstoreLink,
    otherLink,
    subtitle,
    images,
}: ProjectProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    return (
        <div
            className="flex flex-row items-start justify-between gap-4 rounded-2xl border border-[#D9D9D9] p-4"
            onClick={() => {
                // setIsExpanded(!isExpanded);
            }}
        >
            <div>
                <div className="flex max-w-72 flex-col items-start space-y-1 self-stretch pb-10">
                    <p className="text-3xl text-black">{title}</p>
                    {subtitle && (
                        <p className="text-lg font-medium text-gray-700">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div>
                    {isExpanded && (
                        <p className="text-lg font-normal leading-relaxed text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {isExpanded ? (
                <ExpandedImages
                    images={[
                        "https://picsum.photos/seed/2/400/600",
                        "https://picsum.photos/seed/3/200/300",
                        "https://picsum.photos/seed/pics4jum/200/300",
                    ]}
                />
            ) : (
                <StackedImages
                    images={[
                        "https://picsum.photos/seed/2/200/300",
                        "https://picsum.photos/seed/3/200/300",
                        "https://picsum.photos/seed/pics4jum/200/300",
                    ]}
                />
            )}
        </div>
    );
}

// TOOD: fix shadow overlays, work more on card design, allow for flexibility
// TODO: maybe use a different font type for the paragraph? the current one looks ugly
// TODO: figure out how to add timeline and work it into the scroll behavior, change labels accordingly
// TODO: figure out the required behavior for the time line scroll, i.e should the cards expand/collapse?
// should they expand automatically once in view? should they only expand on click?
function ExpandedImages({ images }: { images: string[] }) {
    const [selectedImageIndex, setselectedimageIndex] = useState(0);

    return (
        <div className="relative flex flex-col items-center">
            <div className="mb-4">
                <img
                    src={images[selectedImageIndex]}
                    alt=""
                    className="myshadow-md max-h-[300px] rounded-[8px] object-cover"
                />
            </div>

            <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 relative w-64 overflow-x-auto overflow-y-clip">
                <div className="flex min-w-max flex-row space-x-2">
                    {images.map((imageUrl, index) => (
                        <img
                            src={imageUrl}
                            alt=""
                            key={index}
                            onClick={() => setselectedimageIndex(index)}
                            className={`myshadow-md myshadow-sm h-[64px] rounded-[4px] object-center transition-all duration-300 hover:scale-[104%] ${
                                index === selectedImageIndex
                                    ? "w-36 object-cover"
                                    : "w-[64px] object-cover"
                            } cursor-pointer`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StackedImages({ images }: { images: string[] }) {
    if (images.length === 1) {
        return (
            <div className="relative h-32 w-32">
                <div className="myshadow-md flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200">
                    <img
                        src={images[0]}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
            </div>
        );
    }
    if (images.length === 2) {
        return (
            <div className="relative h-32 w-32">
                <div className="myshadow-md absolute left-4 top-4 flex h-24 w-24 rotate-[6deg] items-center justify-center rounded-lg bg-gray-200">
                    <img
                        src={images[0]}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
                <div className="myshadow-md absolute left-10 top-6 flex h-24 w-24 -rotate-[6deg] items-center justify-center rounded-lg bg-gray-200">
                    <img
                        src={images[1]}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
            </div>
        );
    }
    if (images.length >= 3) {
        return (
            <div className="group relative mr-10 h-32 w-32 transition-all duration-300">
                <div className="myshadow-md absolute left-[40%] top-4 z-0 flex h-24 w-24 rotate-[8deg] items-center justify-center rounded-lg bg-gray-200 transition-all duration-300 group-hover:top-3 group-hover:rotate-[10deg]">
                    <img
                        src={images[1]}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
                <div className="z-1 myshadow-md absolute left-2 top-2 z-20 flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200 transition-all duration-[600ms] group-hover:-top-0">
                    <img
                        src={images[0]}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
                <div className="myshadow-md absolute -left-[40%] top-4 z-0 flex h-24 w-24 -rotate-[6deg] items-center justify-center rounded-lg bg-gray-200 transition-all duration-500 group-hover:top-3 group-hover:-rotate-[8deg]">
                    <img
                        src={images[2]}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
            </div>
        );
    }
    return null;
}

export default ProjectCard;
