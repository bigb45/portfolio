"use client";
import React, { useEffect, useRef, useState } from "react";
import ProjectCard, { ProjectProps } from "./projectCard";
import ProjectPreviewCard from "./projectPreviewCard";
import ImageOverlay from "@/components/imageOverlay";

function Projects() {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal]);
    const testProject: ProjectProps = {
        id: "2",
        title: "Foodeck",
        subtitle: "THE food ordering app",
        description:
            "Foodeck is a food ordering app that allows users to order food from their favorite restaurants. The app is built using Flutter and Express.JS and includes features such as user authentication, restaurant listings, food ordering, and more. The app is designed to be easy to use and intuitive, making it the perfect choice for anyone looking to order food online.",
        isOngoing: false,
        techStack: [],
        githubLink: "",
    };

    const startDate = new Date("2021-08-25").getTime();
    const endDate = Date.now();
    const projectDates = [
        new Date("2022-08-25").getTime(),
        new Date("2023-10-25").getTime(),
        new Date("2022-10-25").getTime(),
        new Date("2024-10-25").getTime(),
    ];

    return (
        <div className="relative mb-10 mt-40 flex h-[calc(100vh-8rem)] flex-col gap-3 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
            Projects:
            {showModal && (
                <ImageOverlay
                    images={[
                        "https://picsum.photos/seed/center/400/600",
                        "https://picsum.photos/seed/right/400/600",
                        "https://picsum.photos/seed/left/400/600",
                    ]}
                    onClose={() => setShowModal(false)}
                />
            )}
            <div className="mx-auto mt-8 flex flex-col gap-10 lg:flex-row">
                <ProjectPreviewCard
                    onShowImagesClick={() => {
                        setShowModal(!showModal);
                    }}
                    href="/projects/all"
                />
                <ProjectPreviewCard
                    onShowImagesClick={() => {
                        console.log("clickd!");
                    }}
                    href="/projects/all"
                />
            </div>
        </div>
    );
}

export default Projects;
