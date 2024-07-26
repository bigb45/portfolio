import Image from "next/image";
import { useState } from "react";

interface DesktopItemProps {
  icon: string;
  title: string;
  onClick: () => void;
}

export default function DesktopItem({
  icon,
  title,
  onClick,
}: DesktopItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      onClick={() => {
        setIsSelected(!isSelected);
      }}
      onDoubleClick={() => {
        onClick();
      }}
      className="select-none drag-none cursor-pointer"
    >
      <div
        className={`flex flex-col items-center justify-center py-1 px-2 gap-y-2 `}
      >
        <Image
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className={`${isSelected ? "bg-accent mix-blend-multiply  border-background border-dotted" : ""}`}
          width={32}
          height={32}
          src={icon}
          alt="icon"
        ></Image>
        <p
          className={`${isSelected ? "bg-accent border-background border-dotted" : "border-transparent"} p-[1px] border-2 text-white text-sm text-shadow`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
