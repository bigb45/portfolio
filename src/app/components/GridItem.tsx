"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

function GridItem() {
  const [selectedId, setSelectedId] = useState<string>("");
  const items = [
    { id: "1", title: "First", subtitle: "First" },
    { id: "2", title: "Second", subtitle: "Second" },
    { id: "3", title: "Third", subtitle: "Third" },
  ];
  return (
    <div className="relative grid grid-cols-3 grid-rows-1 ">
      {items.map((item, index) => (
        <motion.div
          // onHoverStart={}
          className="cursor-pointer border-black bg-black border-2 w-80 h-80 hover:translate-x-[-10px] hover:translate-y-[-10px]  transition-all duration-200 flex justify-center items-center text-white overflow-hidden  "
          key={index}
          layoutId={item.id}
          onClick={() => setSelectedId(item.id)}
        >
          <img src="images/practice.png" />
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            // transition={}
            layoutId={selectedId}
            className="cursor-pointer absolute border-black bg-black border-2 w-full h-full flex justify-center items-center text-white overflow-hidden "
          >
            <motion.button
              className="absolute h-10 w-10 text-6xl text-black"
              onClick={() => setSelectedId("")}
            >
              x
            </motion.button>
            <img src="images/practice.png" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GridItem;
