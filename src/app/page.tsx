"use client";
import { FaGithub, FaGooglePlay, FaYoutube } from "react-icons/fa";
import { ImSphere } from "react-icons/im";
import Header from "./components/Header";
import { Projects } from "./components/Projects";
import WavingHand from "./components/WavingHand";
import MovingTape from "./components/MovingTape";
import { annotate } from "rough-notation";
import { useEffect, useRef } from "react";
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
            <main className="flex flex-col items-center justify-start">
                <div className="mt-24">
                    <div className="mb-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
                        <div>
                            <div className="#highlight text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl">
                                Hello, I&apos;m{" "}
                                <span ref={highlightRef} id="myElement">
                                    Mohammed
                                </span>
                                {/* <span  className="text-[#fd6463] underline decoration-wavy decoration-black underline-offset-8">
                  Mohammed
                </span>{" "} */}
                                {/* <WavingHand /> */}
                            </div>

                            <div className="mt-4 max-w-prose text-slate-500">
                                Helelle
                            </div>
                        </div>
                        {/* <div className="bg-black">
              <div className="w-full sm:w-[200px] md:w-[300px] h-[300px] overflow-clip hover:translate-x-[-10px] hover:translate-y-[-10px] transition-all duration-200">
                <img src="/images/me.jpg" alt="profile" draggable={false} className="w-full h-full object-cover" />
              </div>
            </div> */}
                    </div>
                    {/* <div className="flex flex-col justify-between items-start mb-10">
            <div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10"> 
                My Projects <span className="text-[#fd6463]">🚀</span>
              </div>
            </div>
            <Projects projects={projects}></Projects>
          </div> */}
                    {/* <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10">
            My Projects <span className="text-[#fd6463]">🚀</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p>{project.subtitle}</p>
                }
              </div>
            ))}
          </div>
 */}
                    {/* <div className="w-full flex text-6xl justify-start font-bold mb-10">
            Contact Me <span className="text-[#fd6463]">📞</span>
          </div> */}
                </div>
            </main>
            {/* <div className="sticky bottom-0 w-full flex flex-col justify-between">
          <MovingTape></MovingTape>
        </div> */}
        </div>
    );
}
