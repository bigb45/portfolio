"use client";
import { motion } from "framer-motion";
function MovingTape() {
  const tapes = [
    "Flutter",
    "Kotlin",
    "Firebase",
    "Dart",
    "Python",
    "Figma",
    "Git",
    
    "Express.JS",
    "Javascript",
    "Figma",
    "Git",
    "React",
    "Node.js",
    "PlanetScale",
    "Supabase",
  ];

  const scrollAnimation = {
    animate: {
      x: ["100%", "-100%"],
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="border-2 border-black bg-white text-black font-sans text-uppercase flex items-center justify-between">
      <section className="relative w-full h-full overflow-hidden">
        <div className="flex w-full">
          <motion.div
            className=" font-bold text-xl bg-white whitespace-nowrap"
            {...scrollAnimation}
          >
            {tapes.join(" • ")}
          </motion.div>
          <motion.div
            className=" font-bold text-xl bg-white whitespace-nowrap"
            animate={{
              ...scrollAnimation.animate,
              transition: { ...scrollAnimation.animate.transition, delay: 0 },
            }}
          >
            {tapes.join(" • ")}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default MovingTape;
