"use client";
import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";
import { useEffect, useRef, useState } from "react";
import DesktopItem from "./components/DesktopItem";

interface WindowState {
  box: Box;
  isDragging: boolean;
}
const apps = [
  {
    title: "Folder",
    icon: "/icons/folder.svg",
  },
  {
    title: "Folder",
    icon: "/icons/folder.svg",
  },
  {
    title: "Folder",
    icon: "/icons/folder.svg",
  },
  {
    title: "Folder",
    icon: "/icons/folder.svg",
  },

  {
    title: "Folder",
    icon: "/icons/folder.svg",
  },
];
function Page() {
  const [selectionBox, setSelectionBox] = useState<Box>();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const selectableItems = useRef<Box[]>([]);
  const elementsContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { DragSelection } = useSelectionContainer({
    // eventsElement: document.getElementById("root"),
    onSelectionChange: (box) => {
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX,
      };

      setSelectionBox(scrollAwareBox);
      const indexesToSelect: number[] = [];
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(scrollAwareBox, item)) {
          indexesToSelect.push(index);
        }
      });
      console.log("indexesToSelect", indexesToSelect);
      setSelectedIndexes(indexesToSelect);
    },
    onSelectionStart: () => {
      setSelectedItem(null);
      console.log("OnSelectionStart");
    },
    selectionProps: {
      style: {
        border: "1px dashed black",
        borderRadius: 0,
        backgroundColor: "transparent",
        opacity: 0.5,
      },
    },
    isEnabled: true,
  });

  useEffect(() => {
    if (elementsContainerRef.current) {
      Array.from(elementsContainerRef.current.children).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        selectableItems.current.push({
          left,
          top,
          width,
          height,
        });
      });
    }
  }, []);

  return (
    <div className="font-w95fa">
      <DragSelection />

      <div
        className="bg-[#008080] min-h-screen h-full flex-col items-start justify-start p-10"
        onMouseDown={() => {
          setSelectedItem(null);
          setSelectedIndexes([]);
        }}
      >
        {/* <div
          draggable
          className={`bg-red-500 w-20 h-20 flex items-center justify-center `}
        >
          moveable
        </div> */}
        <div
          id="elements-container"
          ref={elementsContainerRef}
          className="elements-containe grid gap-10 w-min items-start justify-start"
        >
          {apps.map((app, index) => {
            return (
              <DesktopItem
                key={index}
                className={`element ${selectedIndexes.includes(index) ? "selected" : ""}`}
                onClick={(id) => {
                  setSelectedItem(id);
                  setSelectedIndexes([]);
                }}
                onDoubleClick={(id) => {
                  console.log("Double Clicked", id);
                }}
                id={index.toString()}
                isSelected={
                  selectedItem === index.toString() ||
                  selectedIndexes.includes(index)
                }
                icon={app.icon}
                title={app.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
