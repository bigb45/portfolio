"use client";
import { FaEnvelope, FaFistRaised, FaGithub, FaLinkedin } from "react-icons/fa";
import { annotate } from "rough-notation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Manifesto from "./components/Manifesto";
export default function Home() {
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
    const shouldShowManifesto = false;

    return (
        <div className="relative flex w-full justify-center">
            {/* Center hero content */}
            <main className="flex w-full max-w-[calc(100%-240px)] flex-col items-center justify-start px-6">
                <div className="mt-24 text-center lg:text-left">
                    <div className="text-4xl font-bold leading-10 text-[#0F172A] sm:text-5xl md:text-6xl">
                        Hello, I&apos;m{" "}
                        <span
                            ref={highlightRef}
                            id="myElement"
                            className="mt-2 inline-block"
                        >
                            Mohammed
                        </span>
                    </div>

                    <div className="mt-4 max-w-prose text-xl text-gray-800">
                        I develop mobile apps and create designs on Figma
                        sometimes.
                    </div>
                </div>

                {/* Social links */}
                <div className="mb-12 mt-24 flex w-full items-center justify-center gap-14">
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
            </main>

            {shouldShowManifesto && (
                <div className="fixed right-6 top-32 hidden w-64 flex-col justify-start gap-2 overflow-hidden border-[1px] border-red-600 bg-[#1f1f1f] p-4 font-extrabold text-white lg:block">
                    <div className="flex flex-col gap-2 text-lg">
                        <div className="relative flex gap-2 text-lg">
                            <FaFistRaised className="absolute left-0 top-0 h-6 w-6 text-red-500" />
                            <span className="pl-8">Manifesto</span>
                        </div>
                        <span>
                            <Manifesto />
                        </span>
                    </div>

                    <FaFistRaised
                        className="pointer-events-none absolute bottom-2 right-2 text-7xl text-red-500 opacity-15"
                        size={400}
                    />
                </div>
            )}
        </div>
    );
}
