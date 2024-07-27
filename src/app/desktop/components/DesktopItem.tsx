import Image from "next/image";
interface DesktopItemProps {
  className?: string;
  id: string;
  icon: string;
  title: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  onDoubleClick: (id: string) => void;
}

export default function DesktopItem({
  id,
  icon,
  title,
  isSelected,
  onClick,
  className,
  onDoubleClick,
}: DesktopItemProps) {
  return (
    <div
      onClick={() => {
        onClick(id);
      }}
      onDoubleClick={() => {
        onDoubleClick(id);
      }}
      className={`${className} select-none drag-none cursor-pointer`}
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
