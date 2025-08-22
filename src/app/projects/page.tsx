"use client";

import { useEffect, useState } from "react";
import { ProjectProps } from "./projectCard";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../loading";
import ProjectPreviewCard from "./projectPreviewCard";
import ClickEffect from "@/components/clickMarker";

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
        <>
            <ClickEffect />
            <div className="relative mb-10 mt-20 flex h-[calc(100vh-8rem)] flex-col gap-3 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl lg:mt-40">
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
                            className="mx-auto mt-8 flex w-full flex-col items-center gap-10 px-4 pb-10 sm:px-8 lg:grid lg:grid-cols-2"
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
        </>
    );
}

export default Projects;
