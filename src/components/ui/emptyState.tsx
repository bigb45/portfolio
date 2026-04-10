import React from "react";

interface EmptyStateProps {
    title?: string;
    message?: string;
}

export default function EmptyState({
    title = "Nothing here yet",
    message = "Looks like this jar is empty... even the flies moved on!"
}: EmptyStateProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center font-grotesk">
            <div className="relative mb-6 h-32 w-32 opacity-20 lg:h-48 lg:w-48">
                <svg
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full stroke-gray-900"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Jar */}
                    <path d="M60 40 L140 40 L140 160 C140 171 131 180 120 180 L80 180 C69 180 60 171 60 160 Z" />
                    <path d="M60 60 L140 60" />
                    <path d="M70 30 L130 30 L130 40 L70 40 Z" />

                    {/* Fly trailing line */}
                    <path
                        d="M100 110 C 120 90, 160 100, 170 70"
                        className="animate-pulse"
                        strokeDasharray="4 4"
                    />

                    {/* Fly */}
                    <g transform="translate(165, 65) rotate(-20)">
                        <circle cx="5" cy="5" r="3" fill="currentColor" stroke="none" />
                        <path d="M2 2 Q 5 -2 8 2" />
                        <path d="M2 8 Q 5 12 8 8" />
                    </g>
                </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800 lg:text-2xl">{title}</h3>
            <p className="max-w-md text-base font-normal text-gray-500 lg:text-lg">{message}</p>
        </div>
    );
}
