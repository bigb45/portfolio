"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function Gallery({
    images,
    className,
    mainImageClassName = "",
}: {
    images: string[];
    className: string;
    mainImageClassName?: string;
}) {
    const [mainImg, setMainImg] = useState(images[0]);

    return (
        <div className={`${className} `}>
            <div className="flex items-center justify-center">
                <div className="inline-block max-w-full rounded-xl">
                    <div className="max-w-[calc(140px*4+24px)]">
                        {" "}
                        {/* Main image */}
                        <div
                            className={`${mainImageClassName} relative mb-6 flex justify-center rounded-lg`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                draggable={false}
                                className="w-full rounded-[16px] object-contain shadow-lg"
                                src={mainImg}
                                alt="main"
                            />
                        </div>
                        {/* Thumbnail Images */}
                        <div className="no-scrollbar w-full overflow-x-auto">
                            <div
                                className="flex min-w-fit justify-center gap-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        onClick={(e) => setMainImg(img)}
                                        draggable={false}
                                        className={`min-w-[96px] max-w-[96px] cursor-pointer rounded-md object-cover transition-all hover:opacity-80 ${
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
            </div>
        </div>
    );
}
