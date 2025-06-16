"use client";
import { useEffect, useRef, useState } from "react";

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
            logo: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
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

function TechnologyChipGroup() {
    const [isVisible, setIsVisible] = useState(false);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [shownTooltipIndex, setShownTooltipIndex] = useState<number | null>(
        null,
    );
    const [offset, setOffset] = useState(0);
    const showTooltip = (index: number) => {
        console.log("showing tooltip for ", index);
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setIsVisible(true);
        setShownTooltipIndex(index);
    };

    const scheduleHideTooltip = () => {
        console.log("hiding tooltip");

        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            // setShownTooltipIndex(null);
        }, 100);
    };

    useEffect(() => {
        setOffset((shownTooltipIndex ?? 0) * 80);
    }, [shownTooltipIndex]);

    return (
        <div className="relative flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Test
                    key={i}
                    {...project.techStackDetails[i]}
                    onMouseEnter={() => {
                        showTooltip(i);
                    }}
                    onMouseLeave={scheduleHideTooltip}
                />
            ))}
            <TechnologyDetailsToolTip
                className={`left-0 z-10 mt-4 flex bg-[#cacaca43] opacity-0 duration-[200ms] transition-transform${
                    isVisible
                        ? "pointer-events-auto visible opacity-100"
                        : "pointer-events-none invisible opacity-0"
                }`}
                style={{
                    transform: `translateX(calc(-50% + ${offset}px))`,
                }}
                id={
                    project.techStackDetails[(shownTooltipIndex ?? 0) as number]
                        .id
                }
                logo={
                    project.techStackDetails[(shownTooltipIndex ?? 0) as number]
                        .logo
                }
                name={
                    project.techStackDetails[(shownTooltipIndex ?? 0) as number]
                        .name
                }
                usageText={
                    project.techStackDetails[(shownTooltipIndex ?? 0) as number]
                        .usageText
                }
            />
        </div>
    );
}
interface TechnologyChipProps {
    id: string;
    name: string;
    logo: string;
    usageText: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: React.CSSProperties;
}

function TechnologyChip({ id, logo, name, usageText }: TechnologyChipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setIsVisible(true);
    };

    const scheduleHideTooltip = () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 100);
    };

    return (
        <div className="group relative">
            <div
                className="grid h-[64px] w-[64px] place-items-center rounded-full border bg-white p-4 shadow-lg"
                onMouseEnter={showTooltip}
                onMouseLeave={scheduleHideTooltip}
            >
                <img
                    src={logo}
                    className="max-h-full max-w-full object-contain"
                />
                {/* <TechnologyDetailsToolTip
                    className={`z-10 mt-4 flex -translate-x-1/2 bg-[#cacaca43] opacity-0 transition-opacity duration-[200ms] ${
                        isVisible
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0"
                    }`}
                    id={id}
                    logo={logo}
                    name={name}
                    usageText={usageText}
                /> */}
            </div>
        </div>
    );
}

function Test({
    id,
    logo,
    name,
    usageText,
    onMouseEnter,
    onMouseLeave,
}: TechnologyChipProps) {
    return (
        <div
            className="grid h-[64px] w-[64px] place-items-center rounded-full border bg-white p-4 shadow-lg"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <img src={logo} className="max-h-full max-w-full object-contain" />
        </div>
    );
}

function TechnologyDetailsToolTip({
    className,
    id,
    name,
    logo,
    usageText,
    style,
}: TechnologyChipProps & { className?: string }) {
    return (
        <div
            style={style}
            className={`${className} glass-effect absolute left-1/2 top-full w-[500px] flex-col rounded-[16px] p-4 text-[16px] text-[#090A0E]`}
        >
            <div className="flex w-full items-center justify-between pb-4">
                <p className="font-bold">{name}</p>
                <div className="grid h-[32px] w-[32px] place-items-center">
                    <img
                        src={logo}
                        className="max-h-full max-w-full object-contain drop-shadow-md filter"
                    />
                </div>
            </div>
            <p className="">{usageText}</p>
        </div>
    );
}

export default TechnologyChipGroup;
