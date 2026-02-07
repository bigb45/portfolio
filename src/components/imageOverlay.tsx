"use client";
import { X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { getS3Url } from "@/lib/utils";

type Props = {
    images: string[];
    onClose: () => void;
};

function ImageOverlay({ images, onClose }: Props) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);
    const resolvedImages = useMemo(
        () => images.map((img) => getS3Url(img)),
        [images],
    );
    const [mainImg, setMainImg] = useState(resolvedImages[0]);

    useEffect(() => {
        if (resolvedImages.length) {
            setMainImg(resolvedImages[0]);
        }
    }, [resolvedImages]);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onClose}
        >
            <div className="inline-block rounded-xl">
                {/* Close Button */}

                <div className="max-w-[calc(140px*4+24px)]">
                    {" "}
                    {/* Main image */}
                    <div
                        className="relative mb-6 flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            draggable={false}
                            className="h-[70VH] rounded-[16px] object-contain"
                            src={mainImg}
                            alt="main"
                        />
                        <button
                            onClick={onClose}
                            className="absolute -right-9 -top-9 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {/* Thumbnail Images */}
                    <div
                        className="flex justify-center gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {resolvedImages.map((img, idx) => (
                            <img
                                draggable={false}
                                key={idx}
                                onClick={(e) => setMainImg(img)}
                                className={`h-[140px] w-[140px] cursor-pointer rounded-md object-cover transition-all hover:opacity-80 ${
                                    mainImg === img
                                        ? "ring-2 ring-gray-200"
                                        : ""
                                }`}
                                src={img}
                                alt={`thumb-${idx}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageOverlay;
