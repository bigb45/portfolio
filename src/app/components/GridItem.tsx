"use client";
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import BrutalistButton from "./BrutalistButton";
import { ProjectData } from "./Projects";
import TextChip from "./TextChip";

interface GridItemProps extends ProjectData {
  onExitProject: () => void;
}

function GridItem({
  title,
  subtitle,
  imageUrl,
  description,
  linkIcons,
  technologies,
  onExitProject,
}: GridItemProps) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 ">
  <motion.div
    whileTap={{ x: 10, y: 10 }}
    onMouseDown={() => setIsClicked(true)}
    onMouseUp={() => setIsClicked(false)}
    className="w-full p-4 h-64 md:h-full bg-[#f8f8f8] border-black border-2 shadow-[10px_10px_0px_0px_#000]"
  >
    <Link
      target="_blank"
      href={linkIcons[0].link ?? ""}
      className="flex items-center justify-center h-full w-full"
    >
      <img
  alt="project"
  src={imageUrl}
  className="cursor-pointer transition-all duration-200 object-contain max-h-full shadow-[4px_4px_10px_rgba(0,0,0,0.3)]"
/>

    </Link>
  </motion.div>

  <div className="flex flex-col px-4">
    <div className="text-4xl md:text-6xl font-bold">{title}</div>
    <div className="text-lg md:text-xl mb-4">{subtitle}</div>
    <div className="mb-10">{description}</div>
    <div className="text-lg">Check it out here</div>

    {linkIcons.map((link, i) => (
      <div key={i}>
        {link.link && (
          <Link
            className="inline-flex"
            href={link.link ?? ""}
            target="_blank"
          >
            <div className="gap-1 hover:underline decoration-wavy flex underline-offset-4 flex-row items-center w-fit py-4">
              <div>{link.icon}</div>
              {link.displayUrl ?? link.link?.split(".com")[1]}
            </div>
          </Link>
        )}
      </div>
    ))}

    <div className="flex flex-wrap gap-2 pb-4">
      {technologies?.map((tech, i) => (
        <TextChip key={i} text={tech} />
      ))}
    </div>

    <div className="flex justify-end m-2">
      <BrutalistButton
        text="GO BACK"
        onClick={onExitProject}
      />
    </div>
  </div>
</div>

  );
}

export default GridItem;
