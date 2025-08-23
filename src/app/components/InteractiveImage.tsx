import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./ImageWithFallback";

interface Hotspot {
    x: number;
    y: number;
    index?: number | string;
    description: string;
    magnification?: number;
}

interface InteractiveImageProps {
    src: string;
    alt: string;
    hotspots?: Hotspot[];
    className?: string;
}

export const InteractiveImage: React.FC<InteractiveImageProps> = ({
    src,
    alt,
    hotspots = [],
    className = "",
}) => {
    const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
    const [mouseImagePosition, setMouseImagePosition] = useState({
        x: 0,
        y: 0,
    });
    const [globalMousePosition, setGlobalMousePosition] = useState({
        x: 0,
        y: 0,
    });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMouseImagePosition({ x, y });
        setGlobalMousePosition({ x: e.clientX, y: e.clientY });

        const hoveredSpot = hotspots.find((hotspot) => {
            const distance = Math.sqrt(
                Math.pow(x - hotspot.x, 2) + Math.pow(y - hotspot.y, 2),
            );
            return distance < 18;
        });

        setHoveredHotspot(hoveredSpot || null);
    };

    const handleMouseLeave = () => {
        setHoveredHotspot(null);
    };

    return (
        <div className={`relative ${className} `}>
            <div
                ref={imageRef}
                className="relative cursor-pointer overflow-hidden rounded-lg"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <ImageWithFallback
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transition-transform duration-300"
                />

                {/* Hotspot indicators */}
                {hotspots.map((hotspot, index) => (
                    <div
                        key={index}
                        className="myshadow-md absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1px] border-white bg-gray-700 text-xs text-white"
                        style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                        }}
                    >
                        {hotspot.index && hotspot.index}
                    </div>
                ))}
            </div>

            {/* magnified preview  */}
            <AnimatePresence>
                {hoveredHotspot && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="pointer-events-none fixed z-50"
                        style={{
                            left: globalMousePosition.x + 20,
                            top: globalMousePosition.y - 120,
                        }}
                    >
                        <div className="h-52 w-52 overflow-hidden rounded-full border border-gray-200 bg-white shadow-2xl">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${src})`,
                                    backgroundPosition: `${mouseImagePosition.x}% ${mouseImagePosition.y}%`,
                                    backgroundSize: hoveredHotspot.magnification
                                        ? `${hoveredHotspot.magnification}%`
                                        : "800%",
                                }}
                            />
                        </div>
                        {/* Tooltip showing hotspot description */}
                        <motion.div
                            className="absolute left-1/2 top-56 max-w-xs -translate-x-1/2 transform rounded-lg bg-gray-900 px-4 py-2 text-center text-sm text-white"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <p className="whitespace-normal break-words">
                                {hoveredHotspot.description}
                            </p>
                            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-900" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
