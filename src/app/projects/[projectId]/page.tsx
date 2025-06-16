"use client";
import React, { useEffect, useRef, useState } from "react";
import TechnologyChipGroup from "./components";

// interface ProjectProps {
//     id: string;
//     title: string;
//     subtitle: string;
//     description: string;
//     images: string[];
//     isPreviewVertical: boolean;
//     // techStackDetails: TechnologyChipProps[];
// }

function Project({
    id,
    title,
    subtitle,
    description,
    images,
    isPreviewVertical,
    // techStackDetails,
}: any) {
    const [projectId, setProjectId] = useState<string>();
    useEffect(() => {
        setProjectId(window.location.pathname);
        console.log("project id is", projectId);
    }, []);

    return (
        <div className="flex">
            {/* text content */}
            <div className="flex-1 flex-col">
                {/* <p className="text-[18px] font-bold">{project.title}</p>{" "}
                <p className="text-[18px]">{project.subtitle}</p>
                <p className="text-[18px]">{project.description}</p> */}
                <p className="text-[18px] font-bold">title</p>{" "}
                <p className="text-[18px]">subtitle</p>
                <p className="text-[18px]">description</p>
                <div className="flex flex-col text-[18px]">
                    Technologies used:
                    {/* <div className="flex gap-4">
                        <TechnologyChip {...project.techStackDetails[0]} />
                        <TechnologyChip {...project.techStackDetails[1]} />
                    </div> */}
                    <TechnologyChipGroup />
                </div>
            </div>

            {/* gallery */}
            <div className="h-full w-full flex-1 bg-red-300">images</div>
        </div>
    );
}

export default Project;
