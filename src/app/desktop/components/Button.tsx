"use client";
import { useState } from "react";
import "../../styles/button.css";

interface ButtonProps {
  state: "enabled" | "disabled" | "focused" | "highlighted";
  label: string | undefined;
}

function Button({ state, label }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={`${isPressed && state != "disabled" ? "pressedShadow" : "defaultShadow"}  ${state == "highlighted" ? "border-2 border-black" : ""} text-xl bg-[#b8b8b8] select-none p-[5px]`}
      >
        <div
          className={`${isPressed ? "translate-y-[2px]" : ""} ${state == "focused" ? "border-black" : "border-[#b8b8b8]"} border-dotted border-2  px-[32px]`}
        >
          <p>{label ?? "This is My Button"}</p>
        </div>
      </div>
    </>
  );
}

export default Button;
