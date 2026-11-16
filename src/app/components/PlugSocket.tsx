const INK = "#0f172a";
const K = 0.36;

export const PLUG_LEN = 56;
export const PRONG_LEN = 22;

function cylinder(x0: number, x1: number, r: number) {
    const rx = r * K;
    return `M${x0},${-r} H${x1} A${rx},${r} 0 0 1 ${x1},${r} H${x0} A${rx},${r} 0 0 1 ${x0},${-r} Z`;
}

function collar(back: number, front: number, r: number) {
    const rx = r * K;
    const sweep = back < front ? 1 : 0;
    return `M${front},${-r} V${r} H${back} A${rx},${r} 0 0 ${sweep} ${back},${-r} Z`;
}

type Ids = { body: string; face: string; metal: string };

export function plugIds(prefix: string): Ids {
    return {
        body: `${prefix}-body`,
        face: `${prefix}-face`,
        metal: `${prefix}-metal`,
    };
}

export function PlugDefs({ ids }: { ids: Ids }) {
    return (
        <>
            <linearGradient id={ids.body} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.45" stopColor="#f1f5f9" />
                <stop offset="1" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id={ids.face} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id={ids.metal} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f8fafc" />
                <stop offset="0.5" stopColor="#94a3b8" />
                <stop offset="1" stopColor="#475569" />
            </linearGradient>
        </>
    );
}

const line = {
    stroke: INK,
    strokeWidth: 2.4,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
};

export function PlugBody({ ids }: { ids: Ids }) {
    return (
        <g {...line}>
            <path
                d={`M-44,-12 L-56,-6 A${6 * K},6 0 0 0 -56,6 L-44,12 Z`}
                fill={`url(#${ids.body})`}
            />
            <path d={cylinder(-46, -10, 21)} fill={`url(#${ids.body})`} />
            <path
                d="M-41,-13.5 H-16"
                stroke="#ffffff"
                strokeWidth={3}
                opacity={0.9}
            />
            <path d={collar(-10, 0, 26)} fill={`url(#${ids.body})`} />
        </g>
    );
}

export const FACE_R = 26;
export const FACE_RX = FACE_R * K;
export const HOLE_RX = 2.2;

type ElRef<T> = (el: T | null) => void;

export function PlugFace({
    ids,
    faceRef,
}: {
    ids: Ids;
    faceRef: ElRef<SVGEllipseElement>;
}) {
    return (
        <ellipse
            ref={faceRef}
            {...line}
            cx={0}
            cy={0}
            rx={FACE_RX}
            ry={FACE_R}
            fill={`url(#${ids.face})`}
        />
    );
}

export function SocketFace({
    ids,
    faceRef,
    holeRef,
}: {
    ids: Ids;
    faceRef: ElRef<SVGEllipseElement>;
    holeRef: (index: number) => ElRef<SVGEllipseElement>;
}) {
    return (
        <g>
            <ellipse
                ref={faceRef}
                {...line}
                cx={0}
                cy={0}
                rx={FACE_RX}
                ry={FACE_R}
                fill={`url(#${ids.face})`}
            />
            {[-9, 9].map((y, k) => (
                <ellipse
                    key={y}
                    ref={holeRef(k)}
                    cx={0}
                    cy={y}
                    rx={HOLE_RX}
                    ry={4.2}
                    fill={INK}
                />
            ))}
        </g>
    );
}

export function PlugProngs({ ids }: { ids: Ids }) {
    return (
        <g>
            {[-9, 9].map((y) => (
                <rect
                    key={y}
                    x={1.2}
                    y={y - 3.3}
                    width={PRONG_LEN - 1.2}
                    height={6.6}
                    rx={3.3}
                    fill={`url(#${ids.metal})`}
                    stroke={INK}
                    strokeWidth={1.8}
                />
            ))}
        </g>
    );
}

export function Socket({ ids }: { ids: Ids }) {
    return (
        <g {...line}>
            <path
                d={`M44,-12 L56,-6 A${6 * K},6 0 0 1 56,6 L44,12 Z`}
                fill={`url(#${ids.body})`}
            />
            <path d={cylinder(10, 46, 21)} fill={`url(#${ids.body})`} />
            <path
                d="M16,-13.5 H41"
                stroke="#ffffff"
                strokeWidth={3}
                opacity={0.9}
            />
            <path d={collar(10, 0, 26)} fill={`url(#${ids.body})`} />
        </g>
    );
}

export function Spark() {
    const rays = [-125, -90, -55, 55, 90, 125];
    return (
        <g stroke="#f59e0b" strokeWidth={2.6} strokeLinecap="round">
            {rays.map((deg) => {
                const a = (deg * Math.PI) / 180;
                const c = Math.cos(a);
                const s = Math.sin(a);
                return (
                    <line
                        key={deg}
                        x1={c * 32}
                        y1={s * 32}
                        x2={c * 42}
                        y2={s * 42}
                    />
                );
            })}
        </g>
    );
}
