"use client";
import {
    FaEnvelope,
    FaGithub,
    FaGooglePlay,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";
import { ImSphere } from "react-icons/im";
import Header from "./components/Header";
import { Projects } from "./components/Projects";
import WavingHand from "./components/WavingHand";
import MovingTape from "./components/MovingTape";
import { annotate } from "rough-notation";
import { useEffect, useRef } from "react";
import Link from "next/link";
export default function Home() {
    const projects = [
        {
            id: "1",
            title: "AZ English",
            subtitle:
                "A cross-platform mobile application for learning English",
            description:
                "AZ English is a cross-platform mobile application for learning English. It is built using Flutter and Firebase. The application is designed to help users learn English by providing them with a variety of features such as quizzes, flashcards, and more. The application also includes a social feature that allows users to connect with other learners and practice their English skills together.",
            imageUrl: "/images/practice.png",
            linkIcons: [
                {
                    link: "https://github.com/bigb45/az-english/",
                    icon: <FaGithub size={32} />,
                },
                {
                    link: "https://play.google.com/store/apps/details?id=com.evirgen.azenglish&hl=en",
                    icon: <FaGooglePlay size={32} />,
                },
            ],
            technologies: [
                "Flutter",
                "Firebase",
                "Dart",
                "Python",
                "Figma",
                "Git",
            ],
        },
        {
            id: "2",
            title: "Foodeck",
            subtitle: "Foodeck, THE food ordering app",
            description:
                "Foodeck is a food ordering app that allows users to order food from their favorite restaurants. The app is built using Flutter and Express.JS and includes features such as user authentication, restaurant listings, food ordering, and more. The app is designed to be easy to use and intuitive, making it the perfect choice for anyone looking to order food online.",
            imageUrl: "/images/foodeck.jpg",
            linkIcons: [
                {
                    link: "https://github.com/bigb45/foodeck",
                    icon: <FaGithub size={32} />,
                },
            ],
            technologies: [
                "Kotlin",
                "Express.JS",
                "Javascript",
                "Figma",
                "Git",
            ],
        },
        {
            id: "3",
            title: "Formally",
            subtitle:
                "Build forms, manage users and organizations with Formally",
            description:
                "Formally is a SaaS webapp targeted towards businesses and organizations. It allows users to create forms, manage users and organizations, and more. The app is built using React, Node.js, and PlanetScale and includes features such as user authentication, form creation, AI question generation, and more.",
            imageUrl: "/images/formally.png",
            linkIcons: [
                {
                    displayUrl: "app.clique.team",
                    link: "https://app.clique.team",
                    icon: <ImSphere size={32} />,
                },
            ],
            technologies: ["React", "Supabase", "Figma"],
        },
        {
            id: "4",
            title: "Ecopoly",
            subtitle:
                "EcoPoly: The Green Property Game! Buy lands and Plant forests with friends online!",
            description:
                "A pass-and-play mobile game where you compete against your friends to build green cities and plant trees. Landing on a city with many trees will cost you! Buy sustainable energy companies and bike lanes, If you land on a tax card you have to pay an Environmental Tax! Trade properties with your friends and build your Own Green Empire!",
            imageUrl: "/images/ecopoly.jpg",
            linkIcons: [
                {
                    link: "https://github.com/bigb45/ecopoly",
                    icon: <FaGithub size={32} />,
                },
                {
                    displayUrl: "youtube.com/watch?BzpH4am1jtw",
                    link: "https://youtu.be/BzpH4am1jtw",
                    icon: <FaYoutube size={32} />,
                },
            ],
            technologies: ["Flutter", "Dart", "Figma"],
        },
    ];
    const highlightRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (highlightRef.current) {
            const annotation = annotate(highlightRef.current, {
                type: "highlight",
                color: "#f59e0b",
            });
            annotation.show();
        }
    }, []);

    return (
        <div>
            <main className="flex w-full flex-col items-center justify-start">
                <div className="mt-24">
                    <div className="mb-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
                        <div>
                            <div className="#highlight text-4xl font-bold leading-10 text-[#0F172A] sm:text-5xl md:text-6xl">
                                Hello, I&apos;m{" "}
                                <span
                                    ref={highlightRef}
                                    id="myElement"
                                    className="mt-2 inline-block"
                                >
                                    Mohammed
                                </span>
                                {/* <WavingHand /> */}
                            </div>

                            <div className="mt-4 max-w-prose text-xl text-gray-800">
                                I develop mobile apps and create designs on
                                Figma sometimes.
                            </div>
                        </div>
                    </div>
                    <div className="mt-96 flex w-full items-center justify-center gap-14">
                        <Link
                            className="flex gap-2 decoration-red-400 underline-offset-8 hover:underline"
                            href={`${process.env.NEXT_PUBLIC_LINKEDIN_URL}`}
                            target="_blank"
                        >
                            <FaLinkedin size={24} />
                        </Link>
                        <Link
                            className="flex gap-2 decoration-red-400 underline-offset-8 hover:underline"
                            href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}
                            target="_blank"
                        >
                            <FaGithub size={24} />
                        </Link>
                        <Link
                            className="flex gap-2 decoration-red-400 underline-offset-8 hover:underline"
                            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                            target="_blank"
                        >
                            <FaEnvelope size={24} />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
