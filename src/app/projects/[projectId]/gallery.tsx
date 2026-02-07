"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ImageOverlay from "@/components/imageOverlay";
import { getS3Url } from "@/lib/utils";
export default function Gallery({
    images,
    className,
    mainImageClassName = "",
}: {
    images: string[];
    className: string;
    mainImageClassName?: string;
}) {
    const [showOverlay, setShowOverlay] = useState(false);
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
        <div className={`${className} `}>
            {showOverlay && (
                <ImageOverlay
                    images={resolvedImages}
                    onClose={() => {
                        setShowOverlay(false);
                    }}
                />
            )}
            <div className="flex items-center justify-center">
                <div className="inline-block max-w-full rounded-xl">
                    <div className="max-w-[calc(140px*4+24px)]">
                        {" "}
                        {/* Main image */}
                        <div
                            className={`${mainImageClassName} relative mb-6 flex justify-center rounded-lg`}
                            onClick={(e) => {
                                setShowOverlay(true);
                                e.stopPropagation();
                            }}
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
                                {resolvedImages.map((img, idx) => (
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
