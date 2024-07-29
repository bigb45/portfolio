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
    <div className="p-5 flex h-full flex-row cursor-default text-black overflow-y-scroll ">
      <motion.div
        // animate={{
        //   boxShadow: !isClicked
        //     ? "10px 10px 0px rgba(0, 0, 0, 1)"
        //     : "0px 0px 0px rgba(0, 0, 0, 0)",
        // }}
        whileTap={{ x: 10, y: 10 }}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        className="flex-1 p-4 h-full bg-[#f8f8f8] border-black border-2 shadow-[10px_10px_0px_0px_#000] mx-4"
      >
        <Link
          target="_blank"
          href={linkIcons[0].link ?? ""}
          className="items-center justify-center flex h-full w-full"
        >
          <img
            alt="project"
            src={imageUrl}
            className=" cursor-pointer transition-all duration-200 object-scale-down h-full"
          />
        </Link>
      </motion.div>

      <div className="flex-1 px-4">
        <div className="text-6xl font-bold">{title}</div>
        <div className="text-xl mb-4">{subtitle}</div>
        <div className="mb-10">{description}</div>
        Check it out here
        {linkIcons.map((link, i) => {
          return (
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
          );
        })}
        <div className="flex flex-col gap-2 pb-2">
          <div className="flex flex-row">
            {technologies?.map((tech, i) => {
              return <TextChip key={i} text={tech} />;
            })}
          </div>
          <div className="flex flex-row justify-end">
            <BrutalistButton
              text={"GO BACK"}
              onClick={onExitProject}
            ></BrutalistButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridItem;
