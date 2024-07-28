"use client";
import { motion } from "framer-motion";
import { useState } from "react";
interface BrutalistButtonProps {
  text: string;
  onClick: () => void;
}
function BrutalistButton({ text, onClick }: BrutalistButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="bg-black w-fit">
      <motion.div
        onClick={onClick}
        animate={{
          boxShadow: isClicked
            ? "inset 5px 5px 0px rgba(0, 0, 0, 1)"
            : "0px 0px 0px rgba(0, 0, 0, 0)",
        }}
        whileTap={{
          x: 0,
          y: 0,
          // border: "5px solid #000",
          // boxShadow: "inset 5px 5px 0px rgba(0, 0, 0, 1)",
          transition: { ease: "linear", duration: 0.1 },
        }}
        whileHover={{
          x: -5,
          y: -5,
          transition: { ease: "linear", duration: 0.1 },
        }}
        className="bg-white flex flex-row items-center justify-center  border-black border-2 w-20 h-10"
      >
        {text}
      </motion.div>
    </div>
  );
}

export default BrutalistButton;
