import Image from "next/image";
import IconButton from "./IconButton";
interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximizeEnabled: boolean;
  title: string;
  showMinimize?: boolean;
  showMaximize?: boolean;
  icon: string | undefined;
  state: "active" | "inactive";
}
function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  maximizeEnabled = true,
  showMinimize = true,
  showMaximize = true,
  title,
  icon,
  state,
}: WindowControlsProps) {
  return (
    <div className="flex flex-row items-center justify-between px-1 py-[2px] w-full h-8 bg-gradient-to-r from-accent to-accent-light select-none">
      <div className="flex flex-row text-on-accent text-xl">
        {icon != undefined ? (
          <Image
            //@ts-ignore
            className="mr-1"
            src={"icons/notepad_file.svg"}
            alt="icon"
            width={16}
            height={16}
          />
        ) : null}
        {title}
      </div>
      <div className="flex flex-row gap-2">
        {showMinimize ? (
          <IconButton state="enabled" icon="icons/minimize.svg" />
        ) : null}
        {showMaximize ? (
          <IconButton
            state={{ maximizeEnabled } ? "disabled" : "enabled"}
            icon="icons/maximize.svg"
          />
        ) : null}
        <IconButton state="enabled" icon="icons/close.svg" />
      </div>
    </div>
  );
}

export default WindowControls;
