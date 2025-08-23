import TextChip from "@/app/components/TextChip";
import { formatDate } from "@/app/utils";
import React from "react";
import CaseStudyFooter from "./CaseStudyFooter";
import { InteractiveImage } from "@/app/components/InteractiveImage";
import ArrowIcon from "@/assets/icons/arrow_thin.svg";
import { ArrowLeft } from "lucide-react";
import { on } from "events";
export interface CaseStudyProps {
    title: string;
    studyContent: string;
    subtitle: string;
    publishDate: Date;
    category: string;
}
function CaseStudy({
    title,
    studyContent,
    subtitle,
    publishDate,
    category,
    onBack,
}: CaseStudyProps & {
    onBack: () => void;
}) {
    return (
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-4 py-8">
            <div className="w-full">
                <div
                    onClick={() => {
                        onBack();
                    }}
                    className="-ml-4 mb-8 flex w-fit items-center gap-4 rounded-md p-2 transition-all duration-200 hover:bg-gray-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Case Studies
                </div>
            </div>
            {category && (
                <div className="w-fit rounded-full bg-gray-200 px-3 py-0.5 text-sm font-medium text-[#374151]">
                    {category}
                </div>
            )}
            <div>
                <h1 className="mb-2 text-center text-4xl font-bold lg:text-6xl">
                    {title}
                </h1>
                <h2 className="text-center text-lg text-gray-600 lg:text-xl">
                    {subtitle}
                </h2>
            </div>
            <p className="text-sm text-gray-400">
                Published on {formatDate(publishDate)}
            </p>
            <div className="mt-6 w-full">
                <p className="prose max-w-none text-justify text-base leading-7 text-gray-800 lg:text-lg">
                    {studyContent}
                </p>
            </div>
            <InteractiveImage
                src="https://picsum.photos/200/300"
                alt="sample image"
                hotspots={[
                    {
                        x: 10,
                        y: 10,
                        description:
                            "this is what a very long description looks likeadfsdaf",
                        index: "A",
                        magnification: 100,
                    },
                    {
                        x: 50,
                        y: 90,
                        description: "Test",
                        index: "B",
                        magnification: 300,
                    },
                    {
                        x: 80,
                        y: 30,
                        description: "Test",
                        index: "C",
                    },
                ]}
            />
            <CaseStudyFooter
                className="mt-auto"
                onViewMoreClick={onBack}
                onGetInTouchClick={() => {}}
            />
        </div>
    );
}

export default CaseStudy;
