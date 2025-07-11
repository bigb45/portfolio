"use client";
import React, { useEffect, useRef, useState } from "react";
import TechnologyChipGroup from "./hoverableChipGroup";
import Gallery from "./gallery";
import { ProjectProps } from "../projectCard";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/loadingSpinner";

function Project() {
    const params = useParams();
    const id = params?.projectId;
    const [project, setProject] = useState<ProjectProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mainImg, setMainImg] = useState<string | null>(null);

    useEffect(() => {
        if (!id || typeof id !== "string") return;
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                console.log({ data });
                const transformedTechstack = data.project_techstack.map(
                    (item: any) => ({
                        id: item.technology_id,
                        name: item.tech_stack.techstack_name,
                        logo: item.tech_stack.icon_path,
                        usageText: item.usage,
                    }),
                );
                console.log({ transformedTechstack });

                setProject({
                    ...data,
                    techstackDetails: transformedTechstack,
                });
            } catch (e) {
                console.error("Error fetching project:", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    useEffect(() => {
        if (project?.images?.length) {
            setMainImg(project.images[0]);
        }
    }, [project]);

    if (isLoading)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    return (
        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
            {/* text content */}
            <div className="flex-1 flex-col">
                <p className="order-1 text-[34px] font-bold">
                    {project?.title}
                </p>

                <Gallery
                    mainImageClassName="mx-auto w-1/3"
                    className="w-full lg:hidden"
                    images={project!.images}
                />

                <p className="text-[18px]">{project?.subtitle}</p>
                <p className="mt-4 text-[18px] font-normal text-[#6D6D6D]">
                    {project?.description}
                </p>
                <div className="mb-10 mt-10 flex flex-col gap-y-2 text-[18px]">
                    Technologies used:
                    <TechnologyChipGroup
                        techStackDetails={project!.techstackDetails}
                    />
                </div>
            </div>

            {/* gallery */}
            {/* {project?.images && ( */}
            <Gallery
                className="hidden w-1/3 lg:block"
                images={project!.images}
            />
            {/* )} */}
        </div>
    );
}

export default Project;
