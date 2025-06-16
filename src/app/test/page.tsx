"use client";
import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "../projects/projectCard";

function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineThumbRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(1);
    const [timelineHeight, setTimelineHeight] = useState(1);

    const [visibleDate, setVisibleDate] = useState<string | null>(null);
    const sliderHeight = 16; // red circle height
    const topCircleHeight = 24;
    const topCircleOffset = topCircleHeight / 2 - sliderHeight / 2;

    useEffect(() => {
        const container = containerRef.current;
        const timeline = timelineRef.current;

        if (!container || !timeline) return;

        const update = () => {
            const totalScroll = container.scrollHeight - container.clientHeight;
            const timelineClientHeight = timeline.clientHeight - 20;

            setScrollHeight(Math.max(totalScroll, 1));
            setTimelineHeight(
                Math.max(timelineClientHeight, container.clientHeight * 0.8),
            );
        };

        const updateTop = () => {
            setScrollTop(
                Math.min(
                    Math.max(container.scrollTop, 0),
                    container.scrollHeight,
                ),
            );
        };

        requestAnimationFrame(update);
        setTimeout(update, 100);

        container?.addEventListener("scroll", updateTop);
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("resize", update);
            container?.removeEventListener("scroll", updateTop);
        };
    }, [containerRef.current, timelineRef.current]);

    const startDate = new Date("2016-08-25").getTime();
    const endDate = Date.now();
    const projectDates = [
        new Date("2022-08-25").getTime(),
        new Date("2023-10-25").getTime(),
        new Date("2021-10-25").getTime(),
        new Date("2018-6-25").getTime(),
        new Date("2024-10-25").getTime(),
    ];

    useEffect(() => {
        const timelineThumb = timelineThumbRef.current;

        if (!timelineThumb) return;

        const threshold = 20;

        const currTop = timelineThumb.offsetTop + 8;

        const projectPositions = projectDates.map((_, index) => {
            const el = document.getElementById(`project-${index}`);
            return {
                date: projectDates[index],
                top: el?.offsetTop ?? 0,
            };
        });

        const ranges = projectPositions.map(({ top }, index) => ({
            lower: top - (12 + threshold) + 20,
            upper: top + (12 + threshold) + 20,
        }));

        const closestIndex = ranges.findIndex(
            ({ lower, upper }) => currTop > lower && currTop < upper,
        );

        const closest =
            closestIndex > -1 ? projectPositions?.at(closestIndex) : undefined;

        if (closest) {
            const dateNum = Number(closest.date);
            if (!isNaN(dateNum)) {
                const date = new Date(dateNum);
                const formatted = date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                });
                setVisibleDate(formatted);
                return;
            }
        }
        setVisibleDate(null);
    }, [scrollTop, projectDates]);

    return (
        <div className="flex h-[calc(100vh-8rem)]">
            {/* Timeline */}
            {/* <div ref={timelineRef} className="relative w-10 bg-gray-200">
                <div
                    className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-red-500"
                    style={{
                        top: `${(scrollTop / scrollHeight) * timelineHeight}px`,
                    }}
                />
            </div> */}
            <div
                className="relative -left-20 flex h-[calc(100vh-8rem)] w-10 flex-col items-center justify-center"
                ref={timelineRef}
            >
                {/* top circle */}
                <div
                    className={`h-[24px] w-[24px] rounded-full border-[1px] border-black bg-black`}
                ></div>

                {/* track */}
                <div className="h-full w-[1px] bg-slate-400"></div>

                {projectDates.map((date, i) => {
                    const relativeTop =
                        (new Date(date).getTime() - endDate) /
                        (startDate - endDate);
                    const top = relativeTop * timelineHeight;

                    return (
                        <div
                            key={i}
                            id={`project-${i}`}
                            className="absolute text-[10px] text-gray-700"
                            style={{ top }}
                        >
                            <div className="h-[24px] w-[24px] rounded-full border border-black bg-white shadow-none transition-all duration-200 hover:bg-gray-200 hover:shadow-lg"></div>
                        </div>
                    );
                })}
                {/* bottom circle */}
                <div
                    style={{ top: `${timelineHeight}px` }}
                    className={`absolute bottom-0 h-[24px] w-[24px] rounded-full border-black bg-black`}
                ></div>

                {/* slider */}
                <div
                    ref={timelineThumbRef}
                    className="myshadow-md absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-red-500"
                    style={{
                        top:
                            (scrollTop / scrollHeight) * timelineHeight +
                            topCircleOffset,
                    }}
                >
                    {visibleDate && (
                        <div className="absolute left-0 top-1/2 mr-2 -translate-x-[calc(100%_+_4px)] -translate-y-1/2 whitespace-nowrap text-sm">
                            {visibleDate}
                        </div>
                    )}{" "}
                    {/* {projectDates[0]} */}
                </div>
                {/* {projectDates.map((projectDate) => {
                    const relativeDistanceFromTop =
                        (projectDate - endDate) / (startDate - endDate);

                    const top = relativeDistanceFromTop * timelineHeight;
                })} */}
            </div>

            {/* Scrollable content */}
            <div
                className="no-scrollbar min-w-0 flex-1 overflow-y-scroll"
                ref={containerRef}
            >
                <div
                    className="space-y-4"
                    style={{
                        position: "relative",
                    }}
                >
                    {projectDates.map((projectDate, index) => {
                        return (
                            <ProjectCard
                                key={index}
                                id={""}
                                title={""}
                                description={""}
                                isOngoing={false}
                                techStack={[]}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Page;
