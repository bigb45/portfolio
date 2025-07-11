"use client";

import { useEffect, useState } from "react";
import { ProjectProps } from "./projectCard";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../loading";
import ProjectPreviewCard from "./projectPreviewCard";

function Projects() {
    const [projects, setProjects] = useState<ProjectProps[] | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/projects`);
                const data = await res.json();
                console.log(data);
                setProjects(data);
            } catch (e) {
                console.error("Error fetching project:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, []);
    return (
        <div className="relative mb-10 mt-40 flex h-[calc(100vh-8rem)] flex-col gap-3 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
            Projects:
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        className="flex h-full items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Loading />
                    </motion.div>
                ) : (
                    <motion.div
                        key="loaded"
                        className="mx-auto mt-8 grid w-full grid-cols-1 gap-10 px-4 sm:px-8 lg:grid-cols-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {projects?.map((project) => (
                            <ProjectPreviewCard
                                key={project.id}
                                {...project}
                                onShowImagesClick={() => {}}
                                href={`${project.id}`}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Projects;
