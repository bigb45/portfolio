"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import GridItem from "./GridItem";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkIcons: LinkIcon[];
  technologies?: string[];
}

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
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
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
      className="relative grid grid-cols-1 sm:w-full sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-0 "

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
          animate={selectedId === project.id ? { x: 0, y: 0 } : { x: 0, y: 0 }}
          transition={{ duration: 0.05, ease: "linear" }}
          className="cursor-pointer border-black  bg-[#c4c4c4] border-2  h-80  transition-all duration-200 flex justify-center items-center text-white overflow-hidden"
          layoutId={project.id}          onClick={() => handleProjectSelection(project.id)}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            draggable={false}
            className="object-cover h-full w-full"
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="cursor-pointer absolute border-2 w-full h-full p-4 bg-white border-black text-black overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GridItem
              id={selectedId}
              title={selectedProject!.title}
              imageUrl={selectedProject!.imageUrl}
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
