"use client";
import Image from "next/image";
import { useState } from "react";
import "../styles/button.css";

interface IconButtonProps {
  state: "enabled" | "disabled" | "focused" | "highlighted";
  icon: string;
}

function IconButton({ state, icon }: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`${isPressed && state != "disabled" ? "pressedShadow" : "defaultShadow"}  ${state == "highlighted" ? "border-2 border-black" : ""} text-xl bg-[#b8b8b8] ${state == "disabled" ? "backdrop-grayscale" : ""}  select-none w-[24px] h-[24px] items-end pb-1 justify-center flex`}
    >
      <div
        className={`${isPressed && state != "disabled" ? "translate-y-[2px]" : ""} ${state == "focused" ? "border-black border-dotted border-2" : "border-[#b8b8b8]"} `}
      >
        <Image src={icon} alt="icon" width={16} height={16} />
      </div>
    </div>
  );
}

export default IconButton;
