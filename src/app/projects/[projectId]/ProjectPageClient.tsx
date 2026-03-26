"use client";
import React, { useEffect, useState } from "react";
import TechnologyChipGroup from "./hoverableChipGroup";
import Gallery from "./gallery";
import { ProjectProps } from "../projectCard";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { FaGithub, FaGooglePlay, FaLink } from "react-icons/fa";
import Link from "next/link";

type Props = {
    initialProject: ProjectProps | null;
};

export default function ProjectPageClient({ initialProject }: Props) {
    const params = useParams();
    const id = params?.projectId;
    const [project, setProject] = useState<ProjectProps | null>(initialProject);
    const [isLoading, setIsLoading] = useState(() => !initialProject);

    useEffect(() => {
        if (!id || typeof id !== "string") return;
        if (initialProject) {
            setProject(initialProject);
            setIsLoading(false);
            return;
        }
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                const transformedTechstack = data.project_techstack.map(
                    (item: {
                        technology_id: string;
                        usage: string;
                        tech_stack: {
                            terchstack_name: string;
                            icon_path: string;
                        };
                    }) => ({
                        id: item.technology_id,
                        name: item.tech_stack.terchstack_name,
                        logo: item.tech_stack.icon_path,
                        usageText: item.usage,
                    }),
                );

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
    }, [id, initialProject]);

    if (isLoading)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loading />
            </div>
        );
    if (!project) return null;

    return (
        <div className="mt-10 flex flex-col gap-4 pb-[300px] lg:flex-row">
            <div className="flex-1 flex-col">
                <h1 className="order-1 text-[34px] font-bold">{project.title}</h1>

                {project.images && project.images.length > 0 && (
                    <Gallery
                        mainImageClassName="mx-auto w-1/3"
                        className="w-full lg:hidden"
                        images={project.images}
                        imageDescription={project.title}
                    />
                )}

                <p className="text-[18px] italic">{project.subtitle}</p>
                <p className="mt-4 text-[18px] font-normal text-[#6D6D6D]">
                    {project.description}
                </p>

                {project.githubLink && (
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
                {project.playstoreLink && (
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

                {project.otherLink && (
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
                        techStackDetails={project.techstackDetails}
                    />
                </div>
            </div>

            {project.images && project.images.length > 0 && (
                <Gallery
                    className="hidden w-1/3 lg:block"
                    images={project.images}
                    imageDescription={project.title}
                />
            )}
        </div>
    );
}
