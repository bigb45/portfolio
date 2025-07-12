import { useEffect, useState } from "react";

type ClickMarker = {
    id: number;
    x: number;
    y: number;
};

export default function ClickEffect() {
    const [clicks, setClicks] = useState<ClickMarker[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const id = Date.now();
            const newClick = { id, x: e.clientX, y: e.clientY };
            setClicks((prev) => [...prev, newClick]);

            setTimeout(() => {
                setClicks((prev) => prev.filter((c) => c.id !== id));
            }, 500);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            {clicks.map(({ id, x, y }) => (
                <span
                    key={id}
                    className="animate-click-effect absolute text-sm font-thin text-gray-300"
                    style={{ left: x - 10, top: y - 15 }}
                >
                    Click
                </span>
            ))}
        </div>
    );
}
