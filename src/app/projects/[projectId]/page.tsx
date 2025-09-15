"use client";
import React, { useEffect, useRef, useState } from "react";
import TechnologyChipGroup from "./hoverableChipGroup";
import Gallery from "./gallery";
import { ProjectProps } from "../projectCard";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { FaGithub, FaGooglePlay, FaLink } from "react-icons/fa";
import Link from "next/link";

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
    console.log("images:", project?.images);

    if (isLoading)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loading />
            </div>
        );
    return (
        <div className="mt-10 flex flex-col gap-4 pb-[300px] lg:flex-row">
            {/* text content */}
            <div className="flex-1 flex-col">
                <p className="order-1 text-[34px] font-bold">
                    {project?.title}
                </p>

                {project?.images && project.images.length > 0 && (
                    <Gallery
                        mainImageClassName="mx-auto w-1/3"
                        className="w-full lg:hidden"
                        images={project!.images}
                    />
                )}

                <p className="text-[18px] italic">{project?.subtitle}</p>
                <p className="mt-4 text-[18px] font-normal text-[#6D6D6D]">
                    {project?.description}
                </p>

                {project?.githubLink && (
                    <Link
                        target="_blank"
                        href={project.githubLink}
                        className="group mt-4 inline-flex items-center gap-2"
                    >
                        {" "}
                        <FaGithub
                            size={24}
                            className="fill-gray-500 transition-all duration-100 group-hover:fill-gray-800"
                        />
                        <div className="flex w-fit flex-row items-center gap-1 py-4 text-gray-500 decoration-wavy underline-offset-4 transition-all duration-100 group-hover:text-gray-800">
                            {project.githubLink}
                        </div>
                    </Link>
                )}
                {project?.playstoreLink && (
                    <Link
                        target="_blank"
                        href={project.playstoreLink}
                        className="group mt-4 inline-flex items-center gap-2"
                    >
                        {" "}
                        <FaGooglePlay
                            size={24}
                            className="fill-gray-500 transition-all duration-100 group-hover:fill-gray-800"
                        />
                        <div className="flex w-fit flex-row items-center gap-1 py-4 text-gray-500 decoration-wavy underline-offset-4 transition-all duration-100 group-hover:text-gray-800">
                            {project.playstoreLink}
                        </div>
                    </Link>
                )}

                {project?.otherLink && (
                    <Link
                        target="_blank"
                        href={project.otherLink}
                        className="group mt-4 inline-flex items-center gap-2"
                    >
                        {" "}
                        <FaLink
                            size={24}
                            className="fill-gray-500 transition-all duration-100 group-hover:fill-gray-800"
                        />
                        <div className="flex w-fit flex-row items-center gap-1 py-4 text-gray-500 decoration-wavy underline-offset-4 transition-all duration-100 group-hover:text-gray-800">
                            {project.otherLink}
                        </div>
                    </Link>
                )}

                <div className="mb-10 mt-10 flex flex-col gap-y-2 text-[18px]">
                    Technologies used:
                    <TechnologyChipGroup
                        techStackDetails={project!.techstackDetails}
                    />
                </div>
            </div>

            {/* gallery */}
            {project?.images && project.images.length > 0 && (
                <Gallery
                    className="hidden w-1/3 lg:block"
                    images={project!.images}
                />
            )}
        </div>
    );
}

export default Project;
