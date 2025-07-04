"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useExtractColors } from "react-extract-colors";

interface TechnologyChipGroupProps {
    techStackDetails: TechnologyChipProps[];
}

function TechnologyChipGroup({ techStackDetails }: TechnologyChipGroupProps) {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [shownTooltipIndex, setShownTooltipIndex] = useState<number | null>(
        null,
    );
    const [offset, setOffset] = useState(0);
    const showTooltip = (index: number) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setIsVisible(true);
        setShownTooltipIndex(index);
    };

    const scheduleHideTooltip = () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            // setShownTooltipIndex(null);
        }, 100);
    };

    useEffect(() => {
        const parent = parentRef.current;
        const tooltip = tooltipRef.current;
        if (!parent || !tooltip || shownTooltipIndex === null) return;
        const space = 8;
        const initialOffset = -tooltip.clientWidth / 2;
        const parentOffset = 32 + 80 * shownTooltipIndex;
        const leftBound = space - parent.offsetLeft;
        const rightBound = window.innerWidth - 2 * space - tooltip.clientWidth;
        setOffset(
            Math.min(
                Math.max(leftBound, initialOffset + parentOffset),
                rightBound,
            ),
        );
    }, [shownTooltipIndex]);
    const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
        useExtractColors(techStackDetails[shownTooltipIndex ?? 0].logo, {
            format: "hex",
        });

    return (
        <div ref={parentRef} className="relative flex w-fit flex-wrap gap-4">
            {techStackDetails.map((technology, i) => (
                <TechnologyChip
                    key={i}
                    {...technology}
                    onMouseEnter={() => {
                        showTooltip(i);
                    }}
                    onMouseLeave={scheduleHideTooltip}
                />
            ))}
            <TechnologyDetailsToolTip
                tooltipRef={tooltipRef}
                className={`left-0 z-10 mt-4 flex opacity-0 transition-all duration-[200ms] ${
                    isVisible
                        ? "pointer-events-auto visible opacity-100"
                        : "pointer-events-none invisible opacity-0"
                }`}
                style={{
                    transform: `translateX(${offset}px)`,
                    backgroundColor: `${dominantColor ?? "#cacaca"}10`,
                }}
                id={techStackDetails[(shownTooltipIndex ?? 0) as number].id}
                logo={techStackDetails[(shownTooltipIndex ?? 0) as number].logo}
                name={techStackDetails[(shownTooltipIndex ?? 0) as number].name}
                usageText={
                    techStackDetails[(shownTooltipIndex ?? 0) as number]
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

function TechnologyChip({
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
            <Image
                src={logo}
                width={64}
                height={64}
                alt={""}
                className="max-h-full max-w-full object-contain"
            />
        </div>
    );
}

function TechnologyDetailsToolTip({
    tooltipRef,
    className,
    id,
    name,
    logo,
    usageText,
    style,
}: TechnologyChipProps & {
    className?: string;
    tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
    return (
        <div
            ref={tooltipRef}
            style={style}
            className={`${className} glass-effect absolute top-full w-[20vw] min-w-[200px] flex-col overflow-clip rounded-[16px] p-4 text-[16px] text-[#090A0E]`}
        >
            <Image
                src={logo}
                width={256}
                height={256}
                alt={""}
                className="absolute -bottom-[40px] -right-[20px] z-[-1] object-contain opacity-10"
            />
            <div className="flex w-full items-center justify-between pb-4">
                <p className="font-bold">{name}</p>
                <div className="grid h-[32px] w-[32px] place-items-center">
                    <Image
                        src={logo}
                        width={32}
                        height={32}
                        alt={""}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
            </div>
            <p className="">{usageText}</p>
        </div>
    );
}

export default TechnologyChipGroup;
