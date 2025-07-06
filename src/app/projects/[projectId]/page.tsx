"use client";
import React, { useEffect, useRef, useState } from "react";
import TechnologyChipGroup from "./hoverableChipGroup";
import Gallery from "./gallery";

// interface ProjectProps {
//     id: string;
//     title: string;
//     subtitle: string;
//     description: string;
//     images: string[];
//     isPreviewVertical: boolean;
//     // techStackDetails: TechnologyChipProps[];
// }

const project = {
    id: "1",
    title: "Foodeck",
    subtitle: "The definitive answer for food ordering apps",
    description:
        "Foodeck is a food ordering app that allows users to order food from their favorite restaurants. The app is built using Flutter and Express.JS and includes features such as user authentication, restaurant listings, food ordering, and more. The app is designed to be easy to use and intuitive, making it the perfect choice for anyone looking to order food online.",
    images: [
        "https://picsum.photos/seed/left/400/600",
        "https://picsum.photos/seed/23/400/600",
        "https://picsum.photos/seed/qw/400/600",
        "https://picsum.photos/seed/sd/400/600",
    ],
    isPreviewVertical: true,
    techStackDetails: [
        {
            id: "1",
            name: "Jetpack Compose",
            logo: "https://logo.svgcdn.com/d/jetpackcompose-original-8x.png",
            usageText:
                "Used to develop the actual mobile application from scratch, used technologies like dagger hilt for dependency injection, Retrofit for API requests and more",
        },
        {
            id: "2",
            name: "Kotlin",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/1200px-Kotlin_Icon.svg.png",
            usageText:
                "Used to develop the actual mobile application from scratch, used technologies like dagger hilt for dependency injection, Retrofit for API requests and more",
        },
        {
            id: "3",
            name: "Figma",
            logo: "https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-512.png",
            usageText:
                "Used for UI/UX design, prototyping, and collaboration with the design team",
        },
        {
            id: "4",
            name: "Next.js",
            logo: "https://images.icon-icons.com/2148/PNG/512/nextjs_icon_132160.png",
            usageText:
                "Used for building server-side rendered React web applications with fast performance and SEO benefits",
        },
        {
            id: "5",
            name: "Android Studio",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Android_Studio_icon_%282023%29.svg/2048px-Android_Studio_icon_%282023%29.svg.png",
            usageText:
                "Primary IDE for Android app development, with tools for debugging, testing, and performance tuning",
        },
    ],
};
function Project({
    id,
    title,
    subtitle,
    description,
    images,
    isPreviewVertical,
    techStackDetails,
}: any) {
    const [projectId, setProjectId] = useState<string>();
    useEffect(() => {
        setProjectId(window.location.pathname);
        console.log("project id is", projectId);
    }, []);
    const [mainImg, setMainImg] = useState(project.images[0]);

    return (
        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
            {/* text content */}
            <div className="flex-1 flex-col">
                <p className="order-1 text-[34px] font-bold">{project.title}</p>{" "}
                <Gallery
                    mainImageClassName="mx-auto w-1/3"
                    className="w-full lg:hidden"
                    images={project.images}
                />
                <p className="text-[18px]">{project.subtitle}</p>
                <p className="mt-4 text-[18px] font-normal text-[#6D6D6D]">
                    {project.description}
                </p>
                <div className="mb-10 mt-10 flex flex-col gap-y-2 text-[18px]">
                    Technologies used:
                    <TechnologyChipGroup
                        techStackDetails={project.techStackDetails}
                    />
                </div>
            </div>

            {/* gallery */}
            <Gallery
                className="hidden w-1/3 lg:block"
                images={project.images}
            />
        </div>
    );
}

export default Project;
