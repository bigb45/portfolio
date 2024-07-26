"use client";
import { useState } from "react";
import DesktopItem from "../components/DesktopItem";
function Page() {
  const [selectionBox, setSelectionBox] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    show: false,
  });

  return (
    <div
      className="bg-[#008080]  min-h-screen h-full flex-col  items-start justify-start p-10"
      style={{
        position: "relative",
      }}
    >
      {selectionBox.show && (
        <div
          // className="w-1 h-1"
          style={{
            position: "absolute",
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
            background: "rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        ></div>
      )}
      <div className="grid gap-10 items-start justify-start">
        <DesktopItem
          icon="/icons/folder.svg"
          title="Folder"
          onClick={() => {}}
        />
        <DesktopItem
          icon="/icons/folder.svg"
          title="Folder"
          onClick={() => {}}
        />
        <DesktopItem
          icon="/icons/folder.svg"
          title="Folder"
          onClick={() => {}}
        />
        <DesktopItem
          icon="/icons/folder.svg"
          title="Folder"
          onClick={() => {}}
        />
        <DesktopItem
          icon="/icons/folder.svg"
          title="Folder"
          onClick={() => {}}
        />
        <DesktopItem
          icon="/icons/folder.svg"
          title="Folder"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default Page;
