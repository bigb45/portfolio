"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import GridItem from "./GridItem";
export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  githubLink?: string;
  technologies?: string[];
}
export function Projects({ projects }: { projects: ProjectData[] }) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectData>();
  const items: ProjectData[] = [];

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
    <div ref={gridRef} className="relative grid grid-cols-3 grid-rows-1">
      {projects.map((project, index) => (
        <motion.div
          id="test"
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
          className="cursor-pointer border-black bg-black border-2 w-80 h-80   transition-all duration-200 flex justify-center items-center text-white overflow-hidden  "
          key={index}
          layoutId={project.id}
          onClick={() => handleProjectSelection(project.id)}
        >
          <img src={project.imageUrl} />
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            // transition={}
            layoutId={selectedId}
            className="cursor-pointer absolute   border-2 w-full h-full p-4 bg-white border-black  text-white overflow"
          >
            {/* <motion.button
              className="absolute h-10 w-10 text-6xl text-black right-1 top-1"
              onClick={() => setSelectedId("")}
            >
              x
            </motion.button> */}

            <GridItem
              id={selectedId}
              title={selectedProject!.title}
              imageUrl={selectedProject!.imageUrl}
              subtitle={selectedProject!.subtitle}
              description={selectedProject!.description}
              githubLink={selectedProject!.githubLink}
              onExitProject={() => setSelectedId("")}
            ></GridItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// export default Projects;
