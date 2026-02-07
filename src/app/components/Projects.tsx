"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import GridItem from "./GridItem";
import { getS3Url } from "@/lib/utils";

export interface ProjectData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    linkIcons: LinkIcon[];
    technologies?: string[];
}
// DEPRECATED
// USE THE NEW PROJECTS

interface LinkIcon {
    displayUrl?: string;
    link: string;
    icon: ReactNode;
}

export function Projects({ projects }: { projects: ProjectData[] }) {
    const [selectedId, setSelectedId] = useState<string>("");
    const [selectedProject, setSelectedProject] = useState<ProjectData>();
    const gridRef = useRef<HTMLDivElement>(null);

    const handleProjectSelection = (id: string) => {
        setSelectedId(id);
        setSelectedProject(projects.find((i) => i.id === id)!);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                gridRef.current &&
                !gridRef.current.contains(event.target as Node)
            ) {
                setSelectedId("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={gridRef}
            className="relative grid grid-cols-1 gap-4 sm:w-full sm:grid-cols-2 lg:grid-cols-2 lg:gap-0 xl:grid-cols-3"
        >
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    whileTap={{
                        x: 0,
                        y: 0,
                        transition: { ease: "linear", duration: 0.001 },
                    }}
                    whileHover={{
                        x: -10,
                        y: -10,
                        transition: { ease: "linear", duration: 0.1 },
                    }}
                    animate={
                        selectedId === project.id
                            ? { x: 0, y: 0 }
                            : { x: 0, y: 0 }
                    }
                    transition={{ duration: 0.05, ease: "linear" }}
                    className="flex h-80 cursor-pointer items-center justify-center overflow-hidden border-2 border-black bg-[#c4c4c4] text-white transition-all duration-200"
                    layoutId={project.id}
                    onClick={() => handleProjectSelection(project.id)}
                >
                    <img
                        src={getS3Url(project.imageUrl)}
                        alt={project.title}
                        draggable={false}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        layoutId={selectedId}
                        className="absolute h-full w-full cursor-pointer overflow-auto border-2 border-black bg-white p-4 text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GridItem
                            id={selectedId}
                            title={selectedProject!.title}
                            imageUrl={getS3Url(selectedProject!.imageUrl)}
                            subtitle={selectedProject!.subtitle}
                            description={selectedProject!.description}
                            linkIcons={selectedProject!.linkIcons}
                            technologies={selectedProject!.technologies}
                            onExitProject={() => setSelectedId("")}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
