"use client";

import { useScroll, useSpring, useVelocity } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import {
    FACE_RX,
    HOLE_RX,
    PLUG_LEN,
    PlugBody,
    PlugDefs,
    PlugFace,
    PlugProngs,
    Socket,
    SocketFace,
    Spark,
    plugIds,
} from "./PlugSocket";

const PHRASE = "LET'S CONNECT";
const UNITS = 8;
const VIEW_WIDTH = 1600;
const VIEW_HEIGHT = 400;
const T_PAD = 0.45;
const WAVE_CYCLES = 2.4;
const AMPLITUDE = 44;
const Y_LEFT = 292;
const Y_RIGHT = 148;
const SEGMENTS = 48;
const BASE_SPEED = 28;

const CABLE_PAD = 40;
const LEFT_EXT = PLUG_LEN + 34;
const RIGHT_EXT = PLUG_LEN + 10;
const GAP = CABLE_PAD * 2 + LEFT_EXT + RIGHT_EXT;
const PLUG_PIVOT = -28;
const PLUG_CABLE_X = -PLUG_LEN;
const SOCKET_CABLE_X = PLUG_LEN;
const STAGGER_MS = 90;

const INK = [15, 23, 42];
const AMBER = [245, 158, 11];

function pointAt(t: number) {
    const x = t * VIEW_WIDTH;
    const midline = Y_LEFT + (Y_RIGHT - Y_LEFT) * t;
    const y = midline + Math.sin(t * WAVE_CYCLES * Math.PI * 2) * AMPLITUDE;
    const dx = VIEW_WIDTH;
    const dy =
        Y_RIGHT -
        Y_LEFT +
        AMPLITUDE * WAVE_CYCLES * Math.PI * 2 * Math.cos(t * WAVE_CYCLES * Math.PI * 2);
    return { x, y, dx, dy };
}

function buildRisingWavePath() {
    const t0 = -T_PAD;
    const t1 = 1 + T_PAD;
    const start = pointAt(t0);
    let d = `M${start.x.toFixed(2)},${start.y.toFixed(2)}`;
    const dt = (t1 - t0) / SEGMENTS;
    for (let i = 0; i < SEGMENTS; i++) {
        const a = pointAt(t0 + dt * i);
        const b = pointAt(t0 + dt * (i + 1));
        const c1x = a.x + (a.dx * dt) / 3;
        const c1y = a.y + (a.dy * dt) / 3;
        const c2x = b.x - (b.dx * dt) / 3;
        const c2y = b.y - (b.dy * dt) / 3;
        d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${b.x.toFixed(2)},${b.y.toFixed(2)}`;
    }
    return d;
}

const WAVE_D = buildRisingWavePath();

type Pose = {
    px: number;
    pr: number;
    py: number;
    sx: number;
    ss: number;
    flow: number;
    glow: number;
    spark: number;
};

const REST: Pose = {
    px: -30,
    pr: -6,
    py: 2,
    sx: 6,
    ss: 1,
    flow: 0,
    glow: 0,
    spark: -1,
};

type Ease = (u: number) => number;
const lin: Ease = (u) => u;
const eo: Ease = (u) => 1 - Math.pow(1 - u, 3);
const eio: Ease = (u) =>
    u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
const clamp01 = (u: number) => Math.min(1, Math.max(0, u));

function track(t: number, times: number[], values: number[], eases: Ease[]) {
    if (t <= times[0]) return values[0];
    for (let i = 0; i < times.length - 1; i++) {
        if (t <= times[i + 1]) {
            const u = (t - times[i]) / (times[i + 1] - times[i]);
            const e = eases[i] ?? lin;
            return values[i] + (values[i + 1] - values[i]) * e(u);
        }
    }
    return values[values.length - 1];
}

function plugIn(t: number, f: Pose): Pose {
    const sparkT = (t - 418) / 220;
    return {
        px: track(t, [0, 420, 500], [f.px, 0.8, 0], [eio, eo]),
        pr: track(t, [0, 220], [f.pr, 0], [eio]),
        py: track(t, [0, 220], [f.py, 0], [eio]),
        sx: track(t, [0, 420], [f.sx, 0], [eio]),
        ss: track(
            t,
            [0, 415, 432, 480, 560],
            [f.ss, 1, 0.955, 1.012, 1],
            [lin, eo, eio, eio],
        ),
        flow: f.flow + (1 - f.flow) * eo(clamp01((t - 440) / 280)),
        glow: f.glow + (1 - f.glow) * eo(clamp01((t - 570) / 260)),
        spark: sparkT >= 0 && sparkT <= 1 ? sparkT : -1,
    };
}

function unplug(t: number, f: Pose): Pose {
    const tug = f.px > -22 ? 2.5 : 0;
    return {
        px: track(t, [0, 80, 380], [f.px, f.px - tug, REST.px], [eo, eio]),
        pr: track(t, [0, 150, 380], [f.pr, f.pr, REST.pr], [lin, eio]),
        py: track(t, [0, 150, 380], [f.py, f.py, REST.py], [lin, eio]),
        sx: track(
            t,
            [0, 70, 380],
            [f.sx, f.sx - tug * 0.35, REST.sx],
            [eo, eio],
        ),
        ss: track(t, [0, 80], [f.ss, 1], [eo]),
        flow: f.flow * (1 - eo(clamp01(t / 240))),
        glow: f.glow * (1 - eo(clamp01(t / 220))),
        spark: -1,
    };
}

function mix(a: number[], b: number[], u: number) {
    const c = a.map((v, i) => Math.round(v + (b[i] - v) * u));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
}

type WaveMarqueeProps = {
    open: boolean;
    onToggle: () => void;
};

type Refs<T> = React.MutableRefObject<(T | null)[]>;

export default function WaveMarquee({ open, onToggle }: WaveMarqueeProps) {
    const reactId = useId().replace(/:/g, "");
    const pathId = `wave-path-${reactId}`;
    const ids = plugIds(`plug-${reactId}`);

    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const measureRef = useRef<SVGTextElement>(null);
    const textGroupRef = useRef<SVGGElement>(null);
    const phraseRefs: Refs<SVGTextPathElement> = useRef([]);
    const connRefs: Refs<SVGGElement> = useRef([]);
    const plugRefs: Refs<SVGGElement> = useRef([]);
    const prongRefs: Refs<SVGGElement> = useRef([]);
    const socketRefs: Refs<SVGGElement> = useRef([]);
    const plugFaceRefs: Refs<SVGEllipseElement> = useRef([]);
    const socketFaceRefs: Refs<SVGEllipseElement> = useRef([]);
    const holeRefs: Refs<SVGEllipseElement> = useRef([]);
    const clipRefs: Refs<SVGRectElement> = useRef([]);
    const sparkRefs: Refs<SVGGElement> = useRef([]);
    const cableRefs: Refs<SVGPathElement> = useRef([]);
    const flowRefs: Refs<SVGPathElement> = useRef([]);

    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const connected = hovered || focused || open;

    const timeline = useRef({ mode: "out" as "in" | "out", start: -1e9, from: REST });

    const { scrollY } = useScroll();
    const rawVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(rawVelocity, {
        damping: 40,
        stiffness: 220,
        mass: 0.4,
    });
    const velocityRef = useRef(0);

    useEffect(() => {
        return smoothVelocity.on("change", (v) => {
            velocityRef.current = v;
        });
    }, [smoothVelocity]);

    useEffect(() => {
        const tl = timeline.current;
        const now = performance.now();
        const t = now - tl.start;
        const current = tl.mode === "in" ? plugIn(t, tl.from) : unplug(t, tl.from);
        const nextMode = connected ? "in" : "out";
        if (nextMode === tl.mode) return;
        timeline.current = {
            mode: nextMode,
            start: now,
            from: { ...current, spark: -1 },
        };
    }, [connected]);

    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;
        const total = path.getTotalLength();
        let phraseWidth = 560;
        const measure = () => {
            const w = measureRef.current?.getComputedTextLength() ?? 0;
            if (w > 0) phraseWidth = w;
        };
        measure();
        document.fonts?.ready.then(measure);
        window.addEventListener("resize", measure);

        const at = (s: number) => {
            const c = Math.min(total, Math.max(0, s));
            const p = path.getPointAtLength(c);
            const a = path.getPointAtLength(Math.max(0, c - 1));
            const b = path.getPointAtLength(Math.min(total, c + 1));
            const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
            return { x: p.x, y: p.y, tx: (b.x - a.x) / len, ty: (b.y - a.y) / len };
        };

        const cable = (
            x0: number,
            y0: number,
            dx0: number,
            dy0: number,
            x1: number,
            y1: number,
            dx1: number,
            dy1: number,
        ) => {
            const k = Math.hypot(x1 - x0, y1 - y0) * 0.3;
            return `M${x0.toFixed(1)},${y0.toFixed(1)} C${(x0 + dx0 * k).toFixed(1)},${(y0 + dy0 * k).toFixed(1)} ${(x1 - dx1 * k).toFixed(1)},${(y1 - dy1 * k).toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
        };

        let offset = 0;
        let lastGlow = -1;
        let frame = 0;
        let last = performance.now();

        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            const scrollBoost = Math.max(
                -420,
                Math.min(420, velocityRef.current * 0.35),
            );
            const unit = phraseWidth + GAP;
            offset += (BASE_SPEED + scrollBoost) * dt;
            offset = ((offset % unit) + unit) % unit;

            const tl = timeline.current;
            const poseAt = (delay: number) => {
                const t = now - tl.start - delay;
                return tl.mode === "in" ? plugIn(t, tl.from) : unplug(t, tl.from);
            };

            const global = poseAt(0);
            if (Math.abs(global.glow - lastGlow) > 0.002) {
                lastGlow = global.glow;
                textGroupRef.current?.setAttribute("fill", mix(INK, AMBER, global.glow));
                if (svgRef.current) {
                    svgRef.current.style.filter =
                        global.glow > 0.01
                            ? `drop-shadow(0 0 ${(7 * global.glow).toFixed(2)}px rgba(245,158,11,${(0.5 * global.glow).toFixed(3)}))`
                            : "none";
                }
            }

            for (let i = 0; i < UNITS; i++) {
                const s = -offset + (i - 1) * unit;
                phraseRefs.current[i]?.setAttribute("startOffset", `${s}`);

                const conn = connRefs.current[i];
                if (!conn) continue;
                const joint = s + phraseWidth + CABLE_PAD + LEFT_EXT;
                if (joint < -LEFT_EXT || joint > total + RIGHT_EXT) {
                    conn.style.display = "none";
                    for (let c = 0; c < 2; c++) {
                        for (let layer = 0; layer < 2; layer++) {
                            const cr = cableRefs.current[(i * 2 + c) * 2 + layer];
                            if (cr) cr.style.display = "none";
                        }
                        const fr = flowRefs.current[i * 2 + c];
                        if (fr) fr.style.display = "none";
                    }
                    continue;
                }
                conn.style.display = "";

                const j = at(joint);
                const cos = j.tx;
                const sin = j.ty;
                const toWorld = (lx: number, ly: number) => ({
                    x: j.x + cos * lx - sin * ly,
                    y: j.y + sin * lx + cos * ly,
                });
                const angle = (Math.atan2(sin, cos) * 180) / Math.PI;
                conn.setAttribute(
                    "transform",
                    `translate(${j.x.toFixed(2)} ${j.y.toFixed(2)}) rotate(${angle.toFixed(2)})`,
                );

                const delay = clamp01(j.x / VIEW_WIDTH) * STAGGER_MS;
                const p = poseAt(delay);

                const plugTransform = `translate(${p.px.toFixed(2)} ${p.py.toFixed(2)}) rotate(${p.pr.toFixed(2)} ${PLUG_PIVOT} 0)`;
                plugRefs.current[i]?.setAttribute("transform", plugTransform);
                prongRefs.current[i]?.setAttribute("transform", plugTransform);
                socketRefs.current[i]?.setAttribute(
                    "transform",
                    `translate(${p.sx.toFixed(2)} 0) scale(${p.ss.toFixed(4)} 1)`,
                );
                const gap = clamp01((p.sx - p.px) / 24);
                const turn = gap * gap * (3 - 2 * gap);
                const faceRx = (FACE_RX * turn).toFixed(3);
                plugFaceRefs.current[i]?.setAttribute("rx", faceRx);
                socketFaceRefs.current[i]?.setAttribute("rx", faceRx);
                const holeRx = (HOLE_RX * turn).toFixed(3);
                holeRefs.current[i * 2]?.setAttribute("rx", holeRx);
                holeRefs.current[i * 2 + 1]?.setAttribute("rx", holeRx);

                const clip = clipRefs.current[i];
                if (clip) clip.setAttribute("width", `${(400 + p.sx - 1.2).toFixed(2)}`);

                const spark = sparkRefs.current[i];
                if (spark) {
                    if (p.spark < 0) {
                        spark.setAttribute("opacity", "0");
                    } else {
                        const u = p.spark;
                        spark.setAttribute("opacity", (1 - eo(u)).toFixed(3));
                        spark.setAttribute(
                            "transform",
                            `translate(${p.sx.toFixed(2)} 0) scale(${(0.6 + 0.7 * eo(u)).toFixed(3)})`,
                        );
                    }
                }

                const rad = (p.pr * Math.PI) / 180;
                const pc = Math.cos(rad);
                const ps = Math.sin(rad);
                const plugLocalX = PLUG_PIVOT + (PLUG_CABLE_X - PLUG_PIVOT) * pc + p.px;
                const plugLocalY = (PLUG_CABLE_X - PLUG_PIVOT) * ps + p.py;
                const plugEnd = toWorld(plugLocalX, plugLocalY);
                const plugDirX = -(cos * pc - sin * ps);
                const plugDirY = -(sin * pc + cos * ps);
                const wordEnd = at(s + phraseWidth + 12);
                const leftD = cable(
                    plugEnd.x,
                    plugEnd.y,
                    plugDirX,
                    plugDirY,
                    wordEnd.x,
                    wordEnd.y,
                    -wordEnd.tx,
                    -wordEnd.ty,
                );

                const socketEnd = toWorld(p.sx + SOCKET_CABLE_X * p.ss, 0);
                const nextWord = at(s + unit - 12);
                const rightD = cable(
                    socketEnd.x,
                    socketEnd.y,
                    cos,
                    sin,
                    nextWord.x,
                    nextWord.y,
                    nextWord.tx,
                    nextWord.ty,
                );

                const flowOffset = (1 - p.flow).toFixed(4);
                [leftD, rightD].forEach((d, c) => {
                    for (let layer = 0; layer < 2; layer++) {
                        const cr = cableRefs.current[(i * 2 + c) * 2 + layer];
                        if (cr) {
                            cr.style.display = "";
                            cr.setAttribute("d", d);
                        }
                    }
                    const fr = flowRefs.current[i * 2 + c];
                    if (fr) {
                        fr.style.display = p.flow > 0.001 ? "" : "none";
                        fr.setAttribute("d", d);
                        fr.setAttribute("stroke-dashoffset", flowOffset);
                    }
                });
            }

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", measure);
        };
    }, []);

    const fontStyle = {
        fontFamily: '"Space Grotesk", "Familjen Grotesk", sans-serif',
        textTransform: "uppercase" as const,
    };
    const units = Array.from({ length: UNITS }, (_, i) => i);

    return (
        <div className="relative w-full overflow-x-clip py-4">
            <button
                type="button"
                aria-expanded={open}
                aria-controls="contact"
                aria-label={`${open ? "Hide" : "Show"} contact form`}
                onClick={onToggle}
                onPointerEnter={(e) => {
                    if (e.pointerType !== "touch") setHovered(true);
                }}
                onPointerLeave={() => setHovered(false)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="block w-full cursor-pointer text-slate-900 focus:outline-none"
            >
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="block h-auto w-full"
                    style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
                    overflow="visible"
                    aria-hidden
                >
                    <defs>
                        <PlugDefs ids={ids} />
                        {units.map((i) => (
                            <clipPath
                                key={i}
                                id={`${ids.body}-clip-${i}`}
                                clipPathUnits="userSpaceOnUse"
                            >
                                <rect
                                    ref={(el) => {
                                        clipRefs.current[i] = el;
                                    }}
                                    x={-400}
                                    y={-80}
                                    width={400}
                                    height={160}
                                />
                            </clipPath>
                        ))}
                    </defs>
                    <path
                        ref={pathRef}
                        id={pathId}
                        d={WAVE_D}
                        fill="none"
                        stroke="none"
                    />
                    <text
                        ref={measureRef}
                        visibility="hidden"
                        fontWeight={300}
                        fontSize={72}
                        style={fontStyle}
                    >
                        {PHRASE}
                    </text>

                    <g fill="none" strokeLinecap="round">
                        {units.flatMap((i) =>
                            [0, 1].map((c) => (
                                <g key={`${i}-${c}`}>
                                    {[0, 1].map((layer) => (
                                        <path
                                            key={layer}
                                            ref={(el) => {
                                                cableRefs.current[
                                                    (i * 2 + c) * 2 + layer
                                                ] = el;
                                            }}
                                            stroke={layer === 0 ? "#0f172a" : "#f1f5f9"}
                                            strokeWidth={layer === 0 ? 7.5 : 4}
                                            style={{ display: "none" }}
                                        />
                                    ))}
                                </g>
                            )),
                        )}
                    </g>
                    <g fill="none" strokeLinecap="round">
                        {units.flatMap((i) =>
                            [0, 1].map((c) => (
                                <path
                                    key={`${i}-${c}`}
                                    ref={(el) => {
                                        flowRefs.current[i * 2 + c] = el;
                                    }}
                                    stroke="#f59e0b"
                                    strokeWidth={4}
                                    pathLength={1}
                                    strokeDasharray="1 1"
                                    strokeDashoffset={1}
                                    style={{ display: "none" }}
                                />
                            )),
                        )}
                    </g>

                    <g
                        ref={textGroupRef}
                        fill="rgb(15,23,42)"
                        fontWeight={300}
                        fontSize={72}
                        style={fontStyle}
                    >
                        {units.map((i) => (
                            <text key={i} dy="0.28em">
                                <textPath
                                    ref={(el) => {
                                        phraseRefs.current[i] = el;
                                    }}
                                    href={`#${pathId}`}
                                    startOffset="0"
                                >
                                    {PHRASE}
                                </textPath>
                            </text>
                        ))}
                    </g>

                    {units.map((i) => (
                        <g
                            key={i}
                            ref={(el) => {
                                connRefs.current[i] = el;
                            }}
                            style={{ display: "none" }}
                        >
                            <g
                                ref={(el) => {
                                    plugRefs.current[i] = el;
                                }}
                            >
                                <PlugBody ids={ids} />
                                <PlugFace
                                    ids={ids}
                                    faceRef={(el) => {
                                        plugFaceRefs.current[i] = el;
                                    }}
                                />
                            </g>
                            <g
                                ref={(el) => {
                                    socketRefs.current[i] = el;
                                }}
                            >
                                <Socket ids={ids} />
                                <SocketFace
                                    ids={ids}
                                    faceRef={(el) => {
                                        socketFaceRefs.current[i] = el;
                                    }}
                                    holeRef={(k) => (el) => {
                                        holeRefs.current[i * 2 + k] = el;
                                    }}
                                />
                            </g>
                            <g clipPath={`url(#${ids.body}-clip-${i})`}>
                                <g
                                    ref={(el) => {
                                        prongRefs.current[i] = el;
                                    }}
                                >
                                    <PlugProngs ids={ids} />
                                </g>
                            </g>
                            <g
                                ref={(el) => {
                                    sparkRefs.current[i] = el;
                                }}
                                opacity={0}
                            >
                                <Spark />
                            </g>
                        </g>
                    ))}
                </svg>
            </button>
        </div>
    );
}
