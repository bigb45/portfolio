"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useRef, useState } from "react";

const HEAD_SRC = "/games/haijaneh/head.png";
const EGG_SRC = "/games/haijaneh/egg.png";
const BEST_KEY = "haijaneh-or-egg:best";
const MUTE_KEY = "haijaneh-or-egg:muted";
const MAX_STRIKES = 3;

type Kind = "h" | "e";
type Phase = "spawn" | "up" | "hit" | "down";
type Screen = "closed" | "opening" | "playing" | "over";

interface Piece {
    id: number;
    cell: number;
    kind: Kind;
    fake: boolean;
    hat: boolean;
    phase: Phase;
    upAt: number;
    downAt: number;
    removeAt: number;
}

interface Splat {
    id: number;
    cell: number;
    at: number;
    rot: number;
    flip: boolean;
}

interface Fx {
    id: number;
    cell: number;
    kind: "bonk" | "egg";
    text: string;
    pts: number;
    at: number;
}

interface Game {
    start: number;
    pieces: Piece[];
    splats: Splat[];
    fx: Fx[];
    nextSpawn: number;
    score: number;
    bonks: number;
    combo: number;
    bestCombo: number;
    strikes: number;
    cracked: number;
    cols: number;
    rows: number;
    eggStreak: number;
    ended: boolean;
    milestones: Set<string>;
    toast: { text: string; at: number } | null;
}

const BONK_WORDS = ["BONK!", "DONK!", "BONK!", "THWACK!", "BONK!", "TOINK!"];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function newGame(now: number): Game {
    return {
        start: now,
        pieces: [],
        splats: [],
        fx: [],
        nextSpawn: now + 700,
        score: 0,
        bonks: 0,
        combo: 0,
        bestCombo: 0,
        strikes: 0,
        cracked: 0,
        cols: 3,
        rows: 2,
        eggStreak: 0,
        ended: false,
        milestones: new Set(),
        toast: { text: "GO!", at: now },
    };
}

function difficulty(g: Game, now: number) {
    return Math.min(1, (now - g.start) / 80000 + g.bonks / 70);
}

function comboMult(combo: number) {
    return Math.min(5, 1 + Math.floor(combo / 3));
}

function bumpCm(bonks: number) {
    return (bonks * 0.35).toFixed(1);
}

/* ---------------------------------- sound --------------------------------- */

function createSfx() {
    let ctx: AudioContext | null = null;
    let noise: AudioBuffer | null = null;
    let muted = false;

    const ac = () => {
        if (typeof window === "undefined") return null;
        if (!ctx) {
            const C =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext })
                    .webkitAudioContext;
            if (!C) return null;
            ctx = new C();
            noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
            const d = noise.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        if (ctx.state === "suspended") void ctx.resume();
        return ctx;
    };

    const tone = (
        type: OscillatorType,
        f0: number,
        f1: number,
        dur: number,
        vol: number,
        delay = 0,
    ) => {
        const c = ac();
        if (!c || muted) return;
        const t = c.currentTime + delay;
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = type;
        o.frequency.setValueAtTime(f0, t);
        o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(c.destination);
        o.start(t);
        o.stop(t + dur + 0.02);
    };

    const hiss = (
        dur: number,
        vol: number,
        type: BiquadFilterType,
        f0: number,
        f1 = f0,
        delay = 0,
    ) => {
        const c = ac();
        if (!c || muted || !noise) return;
        const t = c.currentTime + delay;
        const s = c.createBufferSource();
        s.buffer = noise;
        const f = c.createBiquadFilter();
        f.type = type;
        f.frequency.setValueAtTime(f0, t);
        f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
        const g = c.createGain();
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        s.connect(f).connect(g).connect(c.destination);
        s.start(t, Math.random() * 0.5);
        s.stop(t + dur + 0.02);
    };

    return {
        unlock: () => void ac(),
        setMuted: (m: boolean) => {
            muted = m;
        },
        bonk: (combo: number) => {
            const lift = Math.min(combo, 10) * 18;
            tone("sine", 260 + lift, 70, 0.22, 0.55);
            tone("triangle", 520 + lift * 2, 180, 0.09, 0.25);
            hiss(0.05, 0.35, "lowpass", 1800, 400);
            tone("sine", 900 + lift * 3, 1500 + lift * 3, 0.12, 0.08, 0.06);
        },
        crack: () => {
            hiss(0.04, 0.6, "highpass", 2500, 4000);
            hiss(0.05, 0.45, "bandpass", 3200, 1200, 0.03);
            hiss(0.08, 0.3, "bandpass", 1800, 600, 0.07);
            tone("sine", 140, 60, 0.18, 0.25, 0.1);
        },
        buzzer: () => {
            tone("square", 118, 108, 0.42, 0.12, 0.12);
            tone("sawtooth", 59, 55, 0.42, 0.1, 0.12);
        },
        whoosh: () => hiss(0.12, 0.18, "bandpass", 600, 2400),
        pop: () => tone("sine", 380, 620, 0.06, 0.05),
        creak: () => {
            hiss(0.5, 0.25, "bandpass", 300, 900);
            tone("sawtooth", 70, 110, 0.45, 0.04);
            hiss(0.08, 0.35, "lowpass", 900, 200, 0.55);
        },
        level: () => {
            [523, 659, 784, 1046].forEach((f, i) =>
                tone("triangle", f, f, 0.12, 0.14, i * 0.07),
            );
        },
        over: () => {
            [392, 330, 262, 196].forEach((f, i) =>
                tone("triangle", f, f * 0.97, 0.22, 0.18, i * 0.16),
            );
        },
    };
}

/* ------------------------------ visual pieces ----------------------------- */

function Bump({ bonks, fake }: { bonks: number; fake?: boolean }) {
    if (bonks <= 0) return null;
    const size = Math.min(42, 17 + bonks * 1.1);
    const extra = Math.min(3, Math.floor(bonks / 9));
    return (
        <div
            className={`hoe-bump-stack${fake ? " is-fake" : ""}`}
            style={{ width: `${size}%` }}
            aria-hidden
        >
            {Array.from({ length: extra }).map((_, i) => (
                <span
                    key={i}
                    className="hoe-bump hoe-bump-mini"
                    style={{
                        width: `${62 - i * 12}%`,
                        bottom: `${58 + i * 34}%`,
                        left: `${20 + (i % 2) * 14}%`,
                    }}
                />
            ))}
            <span className="hoe-bump hoe-bump-main" />
        </div>
    );
}

function CartonHat() {
    return (
        <div className="hoe-hat" aria-hidden>
            <span className="hoe-hat-ridge" />
        </div>
    );
}

function Face({
    kind,
    bonks,
    fake,
    hat,
    cracked,
}: {
    kind: Kind;
    bonks: number;
    fake?: boolean;
    hat?: boolean;
    cracked?: boolean;
}) {
    const src = kind === "h" ? HEAD_SRC : EGG_SRC;
    return (
        <div className="hoe-face-inner">
            <img
                src={src}
                alt=""
                draggable={false}
                className="hoe-img"
                width={144}
                height={192}
            />
            <span
                className="hoe-shade"
                style={{
                    WebkitMaskImage: `url(${src})`,
                    maskImage: `url(${src})`,
                }}
            />
            {cracked && (
                <svg
                    className="hoe-crack"
                    viewBox="0 0 100 133"
                    aria-hidden
                    preserveAspectRatio="none"
                >
                    <path
                        d="M6 70 L20 62 L28 74 L40 58 L50 72 L60 56 L70 70 L80 60 L94 68"
                        fill="none"
                        stroke="#2b1a0e"
                        strokeWidth="3.2"
                        strokeLinejoin="miter"
                    />
                    <path
                        d="M40 58 L36 44 M60 56 L66 42 M50 72 L48 88 M28 74 L22 86"
                        fill="none"
                        stroke="#2b1a0e"
                        strokeWidth="2"
                    />
                    <path
                        d="M6 70 L20 62 L28 74 L40 58 L50 72 L60 56 L70 70 L80 60 L94 68"
                        fill="none"
                        stroke="#fff3df"
                        strokeOpacity="0.55"
                        strokeWidth="1.2"
                        transform="translate(0 2.5)"
                    />
                </svg>
            )}
            {hat && <CartonHat />}
            {(kind === "h" || fake) && <Bump bonks={bonks} fake={fake} />}
        </div>
    );
}

function SplatArt({ rot, flip }: { rot: number; flip: boolean }) {
    return (
        <svg
            viewBox="0 0 120 90"
            className="hoe-splat-svg"
            style={{ transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})` }}
            aria-hidden
        >
            <defs>
                <radialGradient id="hoe-yolk" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#ffe066" />
                    <stop offset="55%" stopColor="#ffb703" />
                    <stop offset="100%" stopColor="#e07a00" />
                </radialGradient>
            </defs>
            <path
                d="M14 50 C6 36 22 22 38 26 C44 10 70 8 78 22 C94 14 112 26 104 42 C118 52 106 72 90 68 C84 84 58 86 50 74 C34 84 12 74 20 62 C10 60 8 54 14 50 Z"
                fill="#fffaf0"
                fillOpacity="0.88"
                stroke="#e9dcc0"
                strokeWidth="1.5"
            />
            <circle cx="104" cy="74" r="4" fill="#fffaf0" fillOpacity="0.85" />
            <circle cx="10" cy="30" r="3" fill="#fffaf0" fillOpacity="0.85" />
            <path
                d="M70 54 C76 66 80 76 78 84"
                stroke="#f2a20f"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
            />
            <circle cx="62" cy="46" r="17" fill="url(#hoe-yolk)" />
            <ellipse
                cx="56"
                cy="40"
                rx="6"
                ry="4"
                fill="#fff6c8"
                fillOpacity="0.85"
            />
            <path
                d="M34 30 L40 40 L30 44 Z M86 34 L96 30 L92 42 Z"
                fill="#a9734a"
                stroke="#5d3a1e"
                strokeWidth="0.8"
            />
        </svg>
    );
}

function StrikeEgg({ broken }: { broken: boolean }) {
    return (
        <svg
            viewBox="0 0 24 30"
            width="20"
            height="25"
            className={`hoe-strike${broken ? " is-broken" : ""}`}
            aria-hidden
        >
            <path
                d="M12 1 C19 1 23 13 23 19 C23 25.5 18 29 12 29 C6 29 1 25.5 1 19 C1 13 5 1 12 1 Z"
                fill={broken ? "#e44d3a" : "#c88b5a"}
                stroke={broken ? "#8a1f12" : "#7a4d2a"}
                strokeWidth="1.5"
            />
            {broken ? (
                <path
                    d="M2 16 L7 13 L10 18 L14 12 L17 17 L22 14"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                />
            ) : (
                <ellipse
                    cx="8.5"
                    cy="9"
                    rx="3"
                    ry="4.5"
                    fill="#fff"
                    fillOpacity="0.35"
                />
            )}
        </svg>
    );
}

/* ---------------------------------- game ---------------------------------- */

export default function HaijanehOrEgg() {
    const [screen, setScreen] = useState<Screen>("closed");
    const [, setVersion] = useState(0);
    const [muted, setMuted] = useState(false);
    const [best, setBest] = useState(0);
    const [newBest, setNewBest] = useState(false);
    const [finePointer, setFinePointer] = useState(false);
    const [stickVisible, setStickVisible] = useState(false);

    const gameRef = useRef<Game>(newGame(0));
    const sfxRef = useRef<ReturnType<typeof createSfx> | null>(null);
    const idRef = useRef(1);
    const rafRef = useRef<number | null>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const stickRef = useRef<HTMLDivElement>(null);
    const stickArmRef = useRef<HTMLDivElement>(null);
    const faceEls = useRef(new Map<number, HTMLDivElement>());
    const strikeRef = useRef<HTMLDivElement>(null);
    const timers = useRef<number[]>([]);

    const bump = useCallback(() => setVersion((v) => v + 1), []);

    const sfx = () => {
        if (!sfxRef.current) sfxRef.current = createSfx();
        return sfxRef.current;
    };

    useEffect(() => {
        try {
            setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
            const m = localStorage.getItem(MUTE_KEY) === "1";
            setMuted(m);
            sfx().setMuted(m);
        } catch {
            /* storage unavailable */
        }
        const mq = window.matchMedia("(pointer: fine)");
        const sync = () => setFinePointer(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        const pending = timers.current;
        return () => {
            mq.removeEventListener("change", sync);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            pending.forEach((t) => window.clearTimeout(t));
        };
    }, []);

    const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    };

    const toggleMute = () => {
        const m = !muted;
        setMuted(m);
        sfx().setMuted(m);
        try {
            localStorage.setItem(MUTE_KEY, m ? "1" : "0");
        } catch {
            /* ignore */
        }
    };

    /* ------------------------------ main loop ----------------------------- */

    const tick = useCallback(() => {
        const g = gameRef.current;
        const now = performance.now();
        let changed = false;
        const p = difficulty(g, now);

        if (
            !g.ended &&
            g.rows === 2 &&
            (g.bonks >= 8 || now - g.start > 35000)
        ) {
            g.rows = 3;
            g.cols = 4;
            g.pieces = [];
            g.splats = [];
            g.fx = [];
            g.nextSpawn = now + 900;
            g.toast = { text: "FULL DOZEN!", at: now };
            sfx().level();
            stageRef.current?.animate(
                [
                    { transform: "scale(0.94)" },
                    { transform: "scale(1.03)" },
                    { transform: "scale(1)" },
                ],
                { duration: 450, easing: "ease-out" },
            );
            changed = true;
        }

        for (const pc of g.pieces) {
            if (pc.phase === "spawn" && now >= pc.upAt) {
                pc.phase = "up";
                changed = true;
            } else if (pc.phase === "up" && now >= pc.downAt) {
                pc.phase = "down";
                pc.removeAt = now + 220;
                if (pc.kind === "h" && g.combo > 0) g.combo = 0;
                changed = true;
            } else if (pc.phase === "hit" && now >= pc.downAt) {
                pc.phase = "down";
                pc.removeAt = now + 220;
                changed = true;
            }
        }
        const before = g.pieces.length;
        g.pieces = g.pieces.filter((pc) => pc.phase !== "down" || now < pc.removeAt);
        if (g.pieces.length !== before) changed = true;

        const splatsBefore = g.splats.length;
        g.splats = g.splats.filter((s) => now - s.at < 5200);
        const fxBefore = g.fx.length;
        g.fx = g.fx.filter((f) => now - f.at < 900);
        if (g.splats.length !== splatsBefore || g.fx.length !== fxBefore)
            changed = true;
        if (g.toast && now - g.toast.at > 1300) {
            g.toast = null;
            changed = true;
        }

        if (!g.ended && now >= g.nextSpawn) {
            const active = g.pieces.filter(
                (pc) => pc.phase === "spawn" || pc.phase === "up",
            ).length;
            const cells = g.cols * g.rows;
            const maxUp = g.rows === 2 ? (p < 0.15 ? 1 : 2) : p < 0.5 ? 2 : 3;
            const busy = new Set(g.pieces.map((pc) => pc.cell));
            const free = Array.from({ length: cells }, (_, i) => i).filter(
                (i) => !busy.has(i),
            );
            if (active < maxUp && free.length) {
                const cell = free[Math.floor(Math.random() * free.length)];
                const hChance = lerp(0.42, 0.3, p);
                const kind: Kind =
                    g.eggStreak >= 3 || Math.random() < hChance ? "h" : "e";
                g.eggStreak = kind === "e" ? g.eggStreak + 1 : 0;
                const upMs = lerp(1200, 500, p) * (0.85 + Math.random() * 0.3);
                g.pieces.push({
                    id: idRef.current++,
                    cell,
                    kind,
                    fake: kind === "e" && g.bonks >= 15 && Math.random() < 0.45,
                    hat: kind === "h" && g.bonks >= 25 && Math.random() < 0.45,
                    phase: "spawn",
                    upAt: now + 34,
                    downAt: now + 34 + 150 + upMs,
                    removeAt: 0,
                });
                sfx().pop();
                changed = true;
            }
            g.nextSpawn = now + lerp(1000, 350, p) * (0.8 + Math.random() * 0.4);
        }

        if (changed) bump();
        rafRef.current = requestAnimationFrame(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bump]);

    const startRound = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        gameRef.current = newGame(performance.now());
        setNewBest(false);
        setScreen("playing");
        bump();
        rafRef.current = requestAnimationFrame(tick);
    }, [bump, tick]);

    const openLid = () => {
        if (screen !== "closed") return;
        sfx().unlock();
        sfx().creak();
        setScreen("opening");
        later(startRound, 950);
    };

    const endGame = () => {
        const g = gameRef.current;
        g.ended = true;
        later(() => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            sfx().over();
            try {
                const prev = Number(localStorage.getItem(BEST_KEY)) || 0;
                if (g.score > prev) {
                    localStorage.setItem(BEST_KEY, String(g.score));
                    setBest(g.score);
                    setNewBest(true);
                } else setBest(prev);
            } catch {
                setBest((b) => Math.max(b, g.score));
            }
            setScreen("over");
        }, 1100);
    };

    /* -------------------------------- hits -------------------------------- */

    const swing = () => {
        stickArmRef.current?.animate(
            [
                { transform: "rotate(-26deg)" },
                { transform: "rotate(6deg)", offset: 0.35 },
                { transform: "rotate(-2deg)", offset: 0.55 },
                { transform: "rotate(-26deg)" },
            ],
            { duration: 260, easing: "cubic-bezier(.2,.8,.3,1)" },
        );
    };

    const shake = (strength: number) => {
        const s = strength;
        stageRef.current?.animate(
            [
                { transform: "translate(0,0)" },
                { transform: `translate(${-s}px, ${s * 0.6}px) rotate(-0.4deg)` },
                { transform: `translate(${s}px, ${-s * 0.4}px) rotate(0.4deg)` },
                { transform: `translate(${-s * 0.5}px, ${s * 0.3}px)` },
                { transform: "translate(0,0)" },
            ],
            { duration: 240, easing: "ease-out" },
        );
    };

    const hitPiece = (pc: Piece, e: React.PointerEvent) => {
        e.stopPropagation();
        swing();
        const g = gameRef.current;
        if (g.ended) return;
        const now = performance.now();
        if (pc.phase !== "up" && pc.phase !== "spawn") return;
        const face = faceEls.current.get(pc.id);

        if (pc.kind === "h") {
            pc.phase = "hit";
            pc.downAt = now + 420;
            g.bonks += 1;
            g.combo += 1;
            g.bestCombo = Math.max(g.bestCombo, g.combo);
            const mult = comboMult(g.combo);
            g.score += mult;
            const word =
                mult >= 3
                    ? `BONK x${mult}!`
                    : BONK_WORDS[Math.floor(Math.random() * BONK_WORDS.length)];
            g.fx.push({
                id: idRef.current++,
                cell: pc.cell,
                kind: "bonk",
                text: word,
                pts: mult,
                at: now,
            });
            sfx().bonk(g.combo);
            shake(4 + mult);
            face?.animate(
                [
                    { transform: "scale(1,1)" },
                    { transform: "scale(1.28,0.6)", offset: 0.18 },
                    { transform: "scale(0.9,1.14)", offset: 0.45 },
                    { transform: "scale(1.05,0.95)", offset: 0.7 },
                    { transform: "scale(1,1)" },
                ],
                { duration: 420, easing: "ease-out" },
            );
            if (g.bonks === 15 && !g.milestones.has("fake")) {
                g.milestones.add("fake");
                g.toast = { text: "EGGS ARE FAKING BUMPS", at: now };
                sfx().level();
            } else if (g.bonks === 25 && !g.milestones.has("hat")) {
                g.milestones.add("hat");
                g.toast = { text: "HE FOUND A CARTON HAT", at: now };
                sfx().level();
            } else if (mult > comboMult(g.combo - 1) && mult > 1) {
                g.toast = { text: `COMBO x${mult}`, at: now };
            }
        } else {
            pc.phase = "hit";
            pc.downAt = now + 560;
            g.strikes += 1;
            g.cracked += 1;
            g.combo = 0;
            g.splats.push({
                id: idRef.current++,
                cell: pc.cell,
                at: now,
                rot: Math.random() * 50 - 25,
                flip: Math.random() < 0.5,
            });
            g.fx.push({
                id: idRef.current++,
                cell: pc.cell,
                kind: "egg",
                text: "EGG!",
                pts: 0,
                at: now,
            });
            sfx().crack();
            sfx().buzzer();
            shake(7);
            face?.animate(
                [
                    { transform: "rotate(0deg)" },
                    { transform: "rotate(-9deg)" },
                    { transform: "rotate(8deg)" },
                    { transform: "rotate(-4deg)" },
                    { transform: "rotate(0deg)" },
                ],
                { duration: 380 },
            );
            strikeRef.current?.animate(
                [
                    { transform: "scale(1)", filter: "none" },
                    {
                        transform: "scale(1.35)",
                        filter: "drop-shadow(0 0 8px rgba(228,77,58,.9))",
                    },
                    { transform: "scale(1)", filter: "none" },
                ],
                { duration: 450 },
            );
            if (g.strikes >= MAX_STRIKES) endGame();
        }
        bump();
    };

    const whiff = () => {
        if (screen !== "playing") return;
        sfx().whoosh();
        swing();
    };

    /* ------------------------------ stick cursor ---------------------------- */

    const useStick = finePointer && screen === "playing";

    const moveStick = (e: React.PointerEvent) => {
        if (!useStick || e.pointerType !== "mouse") return;
        if (!stickVisible) setStickVisible(true);
        if (stickRef.current)
            stickRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    /* ------------------------------- render -------------------------------- */

    const g = gameRef.current;
    const cols = screen === "closed" || screen === "opening" ? 3 : g.cols;
    const rows = screen === "closed" || screen === "opening" ? 2 : g.rows;
    const lidOpen = screen !== "closed";
    const mult = comboMult(g.combo);
    const cells = Array.from({ length: cols * rows }, (_, i) => i);

    return (
        <div className="hoe-root mx-auto w-full pb-10 pt-4 font-grotesk text-[#2b1d12]">
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            <div className="mb-4 flex flex-col items-center text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a0714a]">
                    A very scientific test
                </p>
                <h1 className="mt-1 text-4xl font-black tracking-tight sm:text-5xl">
                    Haijaneh <span className="text-[#b5733f]">or</span> Egg
                </h1>
                <p className="mt-2 max-w-md text-sm text-[#6d5440]">
                    Bonk Haijaneh for points. Crack an egg and you get a strike.
                    Three strikes and the carton is closed.
                </p>
                <div className="mt-4 flex items-end gap-6">
                    <figure className="flex flex-col items-center gap-1">
                        <img
                            src={HEAD_SRC}
                            alt="Haijaneh"
                            className="hoe-legend"
                            width={48}
                            height={64}
                        />
                        <figcaption className="text-[11px] font-bold uppercase tracking-wider">
                            Haijaneh
                        </figcaption>
                    </figure>
                    <span className="pb-6 text-xs font-bold text-[#a0714a]">
                        vs
                    </span>
                    <figure className="flex flex-col items-center gap-1">
                        <img
                            src={EGG_SRC}
                            alt="Egg"
                            className="hoe-legend"
                            width={48}
                            height={64}
                        />
                        <figcaption className="text-[11px] font-bold uppercase tracking-wider">
                            Egg
                        </figcaption>
                    </figure>
                </div>
            </div>

            {/* HUD */}
            <div
                className={`hoe-hud mx-auto mb-3 flex items-center justify-between gap-3 rounded-2xl border border-[#e7d6c2] bg-[#fffaf3] px-4 py-2 shadow-sm transition-opacity ${screen === "playing" || screen === "over" ? "opacity-100" : "opacity-50"}`}
            >
                <div className="flex flex-col leading-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#a0714a]">
                        Score
                    </span>
                    <span className="text-2xl font-black tabular-nums">
                        {g.score}
                    </span>
                </div>
                <div className="flex flex-col items-center leading-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#a0714a]">
                        Combo
                    </span>
                    <span
                        key={mult}
                        className={`hoe-mult text-2xl font-black tabular-nums ${mult >= 3 ? "text-[#d9480f]" : ""}`}
                    >
                        x{mult}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div
                        ref={strikeRef}
                        className="flex gap-1"
                        aria-label={`Strikes: ${g.strikes} of ${MAX_STRIKES}`}
                    >
                        {Array.from({ length: MAX_STRIKES }).map((_, i) => (
                            <StrikeEgg key={i} broken={i < g.strikes} />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={toggleMute}
                        className="grid h-9 w-9 place-items-center rounded-full border border-[#e7d6c2] bg-white text-lg shadow-sm transition hover:scale-105 active:scale-95"
                        aria-label={muted ? "Unmute sound" : "Mute sound"}
                        title={muted ? "Unmute" : "Mute"}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                        >
                            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
                            {muted ? (
                                <path d="m23 9-6 6M17 9l6 6" />
                            ) : (
                                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Stage */}
            <div
                className={`hoe-stage-wrap${useStick ? " is-stick" : ""}`}
                onPointerMove={moveStick}
                onPointerLeave={() => setStickVisible(false)}
            >
                <div
                    ref={stageRef}
                    className="hoe-stage"
                    style={
                        {
                            "--cols": cols,
                            "--rows": rows,
                        } as React.CSSProperties
                    }
                >
                    <div className={`hoe-carton${lidOpen ? " is-open" : ""}`}>
                        {/* tray */}
                        <div
                            className="hoe-tray"
                            onPointerDown={whiff}
                            role="application"
                            aria-label="Egg carton game board"
                        >
                            <div className="hoe-grid">
                                {cells.map((cell) => {
                                    const piece = g.pieces.find(
                                        (pc) => pc.cell === cell,
                                    );
                                    const splats = g.splats.filter(
                                        (s) => s.cell === cell,
                                    );
                                    const fxs = g.fx.filter((f) => f.cell === cell);
                                    const raised =
                                        piece &&
                                        (piece.phase === "up" ||
                                            piece.phase === "hit");
                                    return (
                                        <div key={`${cols}-${cell}`} className="hoe-cell">
                                            <span className="hoe-well" />
                                            <div className="hoe-clip">
                                                {piece && (
                                                    <div
                                                        className={`hoe-piece${raised ? " is-up" : ""}`}
                                                        onPointerDown={(e) =>
                                                            hitPiece(piece, e)
                                                        }
                                                        aria-label={
                                                            piece.kind === "h"
                                                                ? "Haijaneh"
                                                                : "Egg"
                                                        }
                                                    >
                                                        <div
                                                            className="hoe-face"
                                                            ref={(el) => {
                                                                if (el)
                                                                    faceEls.current.set(
                                                                        piece.id,
                                                                        el,
                                                                    );
                                                                else
                                                                    faceEls.current.delete(
                                                                        piece.id,
                                                                    );
                                                            }}
                                                        >
                                                            <Face
                                                                kind={piece.kind}
                                                                bonks={g.bonks}
                                                                fake={piece.fake}
                                                                hat={piece.hat}
                                                                cracked={
                                                                    piece.kind ===
                                                                        "e" &&
                                                                    piece.phase !==
                                                                        "up" &&
                                                                    piece.phase !==
                                                                        "spawn"
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="hoe-lip" />
                                            {splats.map((s) => (
                                                <div key={s.id} className="hoe-splat">
                                                    <SplatArt rot={s.rot} flip={s.flip} />
                                                </div>
                                            ))}
                                            {fxs.map((f) => (
                                                <div
                                                    key={f.id}
                                                    className={`hoe-fx is-${f.kind}`}
                                                >
                                                    {f.kind === "bonk" && (
                                                        <div className="hoe-stars">
                                                            {Array.from({
                                                                length: 6,
                                                            }).map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    style={{
                                                                        transform: `rotate(${i * 60}deg) translateX(var(--orbit))`,
                                                                    }}
                                                                >
                                                                    <i>{i % 2 ? "✦" : "★"}</i>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {f.kind === "egg" && (
                                                        <div className="hoe-shards">
                                                            {Array.from({
                                                                length: 5,
                                                            }).map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    style={
                                                                        {
                                                                            "--dx": `${(i - 2) * 22}px`,
                                                                            "--dy": `${-30 - (i % 3) * 14}px`,
                                                                            "--r": `${i * 70}deg`,
                                                                        } as React.CSSProperties
                                                                    }
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                    <span className="hoe-word">
                                                        {f.text}
                                                    </span>
                                                    {f.pts > 0 && (
                                                        <span className="hoe-pts">
                                                            +{f.pts}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                            {g.toast && screen === "playing" && (
                                <div key={g.toast.at} className="hoe-toast">
                                    {g.toast.text}
                                </div>
                            )}
                        </div>

                        {/* lid */}
                        <div className="hoe-lid" aria-hidden={lidOpen}>
                            <button
                                type="button"
                                className="hoe-lid-outer"
                                onClick={openLid}
                                disabled={lidOpen}
                                aria-label="Open the carton and start Haijaneh or Egg"
                            >
                                <span className="hoe-domes" />
                                <span className="hoe-label">
                                    <img
                                        src={HEAD_SRC}
                                        alt=""
                                        className="hoe-label-logo"
                                        width={36}
                                        height={48}
                                    />
                                    <span className="flex flex-col items-start text-left">
                                        <span className="hoe-label-kicker">
                                            Farm fresh · Grade AA
                                        </span>
                                        <span className="hoe-label-title">
                                            Haijaneh or Egg
                                        </span>
                                        <span className="hoe-label-small">
                                            Contents: 1 bald man, many eggs
                                        </span>
                                    </span>
                                    <span className="hoe-label-stamp">
                                        BONK
                                        <br />
                                        BEFORE
                                        <br />
                                        NOW
                                    </span>
                                </span>
                                <span className="hoe-tab">
                                    {screen === "closed" ? "Tap to open" : ""}
                                </span>
                            </button>
                            <span className="hoe-lid-inner" />
                        </div>
                    </div>

                    {screen === "over" && (
                        <div className="hoe-over" role="dialog" aria-label="Game over">
                            <div className="hoe-over-card">
                                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d9480f]">
                                    Carton closed
                                </p>
                                <div className="hoe-over-portrait">
                                    <div className="hoe-face">
                                        <Face kind="h" bonks={g.bonks} />
                                    </div>
                                </div>
                                <h2 className="text-balance text-xl font-black leading-tight sm:text-2xl">
                                    {`You cracked ${g.cracked} ${g.cracked === 1 ? "egg" : "eggs"}. Haijaneh has ${g.bonks} ${g.bonks === 1 ? "bump" : "bumps"}.`}
                                </h2>
                                <dl className="mt-4 grid w-full grid-cols-2 gap-2 text-left sm:grid-cols-4">
                                    <div className="hoe-stat">
                                        <dt>Score</dt>
                                        <dd>{g.score}</dd>
                                    </div>
                                    <div className="hoe-stat">
                                        <dt>Best combo</dt>
                                        <dd>{g.bestCombo}</dd>
                                    </div>
                                    <div className="hoe-stat">
                                        <dt>Bump height</dt>
                                        <dd>{bumpCm(g.bonks)} cm</dd>
                                    </div>
                                    <div className="hoe-stat">
                                        <dt>{newBest ? "New best!" : "Best"}</dt>
                                        <dd>{best}</dd>
                                    </div>
                                </dl>
                                <button
                                    type="button"
                                    onClick={() => {
                                        sfx().unlock();
                                        sfx().creak();
                                        startRound();
                                    }}
                                    className="mt-5 rounded-full bg-[#2b1d12] px-7 py-3 text-sm font-black uppercase tracking-widest text-[#fff3df] shadow-[0_4px_0_#b5733f] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_#b5733f]"
                                >
                                    Play again
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {useStick && (
                <div
                    ref={stickRef}
                    className="hoe-stick"
                    style={{ opacity: stickVisible ? 1 : 0 }}
                    aria-hidden
                >
                    <div className="hoe-stick-tilt">
                        <div ref={stickArmRef} className="hoe-stick-arm">
                            <span className="hoe-stick-knob" />
                            <span className="hoe-stick-grip" />
                        </div>
                    </div>
                </div>
            )}

            <p className="mt-6 text-center text-[11px] text-[#a08770]">
                Egg photo by{" "}
                <a
                    href="https://commons.wikimedia.org/wiki/File:Brown_chicken_egg.jpg"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                >
                    Garitzko
                </a>
                , public domain, via Wikimedia Commons. Haijaneh appears with
                permission.
            </p>
        </div>
    );
}

/* ---------------------------------- styles --------------------------------- */

const CARD_NOISE =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0 0.13  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const CSS = `
.hoe-root {
  --c: clamp(72px, calc((100vw - 56px) / 4), 140px);
  --card: #c49a6c;
  --card-hi: #d8b48a;
  --card-lo: #9c7148;
  --card-edge: #7a5534;
  -webkit-tap-highlight-color: transparent;
}
.hoe-legend, .hoe-img, .hoe-label-logo { image-rendering: pixelated; }
.hoe-legend { width: 48px; height: 64px; filter: drop-shadow(0 3px 2px rgba(80,45,15,.25)); }
.hoe-hud { width: calc(var(--c) * 4 + var(--c) * 0.36); max-width: 100%; }

.hoe-stage-wrap { display: flex; justify-content: center; touch-action: manipulation; user-select: none; -webkit-user-select: none; }
.hoe-stage-wrap.is-stick, .hoe-stage-wrap.is-stick * { cursor: none !important; }
.hoe-stage { position: relative; padding-top: calc(var(--c) * 0.62); perspective: 1000px; perspective-origin: 50% 45%; }

.hoe-carton { position: relative; transform-style: preserve-3d; }

.hoe-tray {
  position: relative;
  padding: calc(var(--c) * 0.18);
  border-radius: calc(var(--c) * 0.2);
  background:
    ${CARD_NOISE},
    radial-gradient(120% 90% at 30% 10%, var(--card-hi), transparent 60%),
    linear-gradient(180deg, var(--card) 0%, #b98d5f 100%);
  box-shadow:
    inset 0 2px 0 rgba(255,235,205,.55),
    inset 0 -3px 0 rgba(90,55,25,.35),
    0 calc(var(--c) * 0.12) 0 var(--card-edge),
    0 calc(var(--c) * 0.12 + 2px) 0 #5e3f24,
    0 calc(var(--c) * 0.3) calc(var(--c) * 0.3) -4px rgba(70,40,15,.45);
  transition: width .4s ease;
}
.hoe-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), var(--c));
  grid-template-rows: repeat(var(--rows), calc(var(--c) * 0.92));
  position: relative;
}
.hoe-grid::before {
  /* cone posts between cups */
  content: "";
  position: absolute; inset: calc(var(--c) * 0.46) calc(var(--c) * 0.5);
  pointer-events: none;
  background-image:
    radial-gradient(circle calc(var(--c) * 0.17) at 44% 40%, rgba(255,240,214,.95) 0, #e3c296 30%, #c99e6e 70%, rgba(150,108,66,0) 100%),
    radial-gradient(circle calc(var(--c) * 0.2) at 52% 54%, rgba(80,48,20,.35) 0, rgba(80,48,20,.18) 60%, rgba(80,48,20,0) 100%);
  background-size: var(--c) calc(var(--c) * 0.92);
  background-position: 0 0;
  transform: translateY(calc(var(--c) * 0.16));
  z-index: 0;
}

.hoe-cell { position: relative; z-index: 1; }
.hoe-well {
  position: absolute; left: 9%; right: 9%; bottom: 9%; height: 46%;
  border-radius: 50%;
  background: radial-gradient(70% 80% at 50% 22%, #3a2512 0%, #5c3d22 38%, #8a6440 72%, #a87e53 100%);
  box-shadow:
    inset 0 calc(var(--c) * 0.05) calc(var(--c) * 0.07) rgba(30,16,4,.7),
    0 calc(var(--c) * -0.012) 0 rgba(255,236,206,.55),
    0 calc(var(--c) * 0.02) calc(var(--c) * 0.02) rgba(255,236,206,.45);
}
.hoe-clip {
  /* bottom = cup bottom edge; mask keeps everything above the front rim curve */
  position: absolute; left: -12%; right: -12%; top: -55%; bottom: 9%;
  pointer-events: none;
  z-index: 2;
  -webkit-mask-image: linear-gradient(#000, #000), radial-gradient(33.1% 15.75% at 50% 84.2%, #000 98%, transparent 100%);
  -webkit-mask-size: 100% 84.2%, 100% 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top, center;
  mask-image: linear-gradient(#000, #000), radial-gradient(33.1% 15.75% at 50% 84.2%, #000 98%, transparent 100%);
  mask-size: 100% 84.2%, 100% 100%;
  mask-repeat: no-repeat;
  mask-position: top, center;
}
.hoe-piece {
  position: absolute; left: calc(12% / 1.24 + 15% / 1.24); width: calc(70% / 1.24);
  aspect-ratio: 3 / 4;
  bottom: calc(var(--c) * -0.06);
  transform: translateY(118%);
  transition: transform .14s cubic-bezier(.5,0,.9,.4);
  pointer-events: auto;
  touch-action: manipulation;
}
.hoe-piece.is-up { transform: translateY(-10%); transition: transform .17s cubic-bezier(.2,1.5,.4,1); }
.hoe-face { position: absolute; inset: 0; transform-origin: 50% 100%; filter: drop-shadow(0 4px 3px rgba(40,20,5,.35)); }
.hoe-face-inner { position: absolute; inset: 0; }
.hoe-img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; -webkit-user-drag: none; }
.hoe-shade {
  position: absolute; inset: 0;
  -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
  background:
    radial-gradient(34% 22% at 34% 20%, rgba(255,244,228,.38), transparent 70%),
    radial-gradient(90% 50% at 50% 112%, rgba(40,18,4,.45), transparent 60%),
    radial-gradient(120% 100% at 50% 40%, transparent 66%, rgba(40,18,4,.28) 100%);
  pointer-events: none;
}
.hoe-crack { position: absolute; inset: 0; width: 100%; height: 100%; animation: hoe-crack-in .12s ease-out; }
@keyframes hoe-crack-in { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }

.hoe-lip {
  /* front rim highlight drawn over the piece */
  position: absolute; left: 9%; right: 9%; bottom: 9%; height: 46%;
  border-radius: 50%;
  border-bottom: calc(var(--c) * 0.025) solid rgba(255,238,210,.85);
  -webkit-mask-image: linear-gradient(transparent 50%, #000 50%);
  mask-image: linear-gradient(transparent 50%, #000 50%);
  filter: drop-shadow(0 calc(var(--c) * 0.012) 0 rgba(120,80,40,.5));
  z-index: 3;
  pointer-events: none;
}

.hoe-bump-stack { position: absolute; left: 50%; bottom: 89%; aspect-ratio: 1 / 0.8; z-index: 2; pointer-events: none; }
.hoe-bump {
  position: absolute; display: block; border-radius: 50% 50% 46% 46% / 62% 62% 38% 38%;
  background: radial-gradient(circle at 36% 30%, #ffe0cc 0 8%, #e9a283 24%, #c96a4f 58%, #8f3b28 100%);
  box-shadow: inset -2px -3px 4px rgba(90,20,10,.35), 0 1px 0 rgba(255,255,255,.2);
}
.hoe-bump-main { left: 0; right: 0; bottom: 0; top: 0; animation: hoe-bump-grow .35s cubic-bezier(.3,1.8,.5,1); }
.hoe-bump-mini { aspect-ratio: 1 / 0.8; }
.hoe-bump-stack.is-fake .hoe-bump { filter: saturate(.92) hue-rotate(-4deg); }
@keyframes hoe-bump-grow { from { transform: scale(.4); } }

.hoe-hat {
  position: absolute; left: 10%; right: 10%; top: -6%; height: 34%;
  border-radius: 46% 46% 14% 14% / 70% 70% 22% 22%;
  background: ${CARD_NOISE}, linear-gradient(180deg, var(--card-hi), var(--card) 60%, var(--card-lo));
  box-shadow: inset 0 -4px 5px rgba(60,35,12,.4), 0 3px 3px rgba(40,20,5,.35);
  transform: rotate(-8deg);
  z-index: 1;
}
.hoe-hat::after {
  content: ""; position: absolute; left: -6%; right: -6%; bottom: -8%; height: 26%;
  border-radius: 40%;
  background: linear-gradient(180deg, var(--card), var(--card-lo));
  box-shadow: 0 2px 2px rgba(40,20,5,.35);
}
.hoe-hat-ridge {
  position: absolute; left: 8%; right: 8%; top: 12%; bottom: 22%; border-radius: 40% 40% 10% 10%;
  background: repeating-linear-gradient(90deg, transparent 0 14%, rgba(90,55,25,.28) 14% 17%);
}

.hoe-splat { position: absolute; left: -4%; right: -4%; top: 68%; transform: translateY(-50%); z-index: 1; pointer-events: none; }
.hoe-splat-svg { width: 100%; display: block; filter: drop-shadow(0 2px 1px rgba(80,45,10,.3)); }
.hoe-splat > svg { animation: hoe-splat 5.2s ease-out forwards; }
@keyframes hoe-splat {
  0% { opacity: 0; scale: .3; }
  6% { opacity: 1; scale: 1.12; }
  12% { scale: 1; }
  75% { opacity: 1; scale: 1.05 1; }
  100% { opacity: 0; scale: 1.08 .98; }
}
.hoe-fx { position: absolute; left: 50%; top: -22%; width: 0; height: 0; z-index: 6; pointer-events: none; }
.hoe-word {
  position: absolute; left: 0; top: 0; transform: translate(-50%, -50%);
  white-space: nowrap; font-weight: 900; font-style: italic; letter-spacing: -.02em;
  font-size: calc(var(--c) * 0.26);
  color: #ffd43b;
  -webkit-text-stroke: calc(var(--c) * 0.022) #2b1d12;
  paint-order: stroke fill;
  text-shadow: 0 calc(var(--c) * 0.03) 0 #2b1d12;
  animation: hoe-word .85s cubic-bezier(.2,1.6,.4,1) forwards;
}
.hoe-fx.is-egg .hoe-word { color: #ff6b4a; }
@keyframes hoe-word {
  0% { transform: translate(-50%, -30%) scale(.2) rotate(-14deg); opacity: 1; }
  25% { transform: translate(-50%, -60%) scale(1.15) rotate(-6deg); }
  40% { transform: translate(-50%, -60%) scale(1) rotate(-6deg); }
  80% { opacity: 1; }
  100% { transform: translate(-50%, -110%) scale(1) rotate(-4deg); opacity: 0; }
}
.hoe-pts {
  position: absolute; left: calc(var(--c) * 0.34); top: calc(var(--c) * 0.12);
  font-weight: 900; font-size: calc(var(--c) * 0.17); color: #2b1d12;
  background: #fff3df; border: 2px solid #2b1d12; border-radius: 999px; padding: 0 .35em;
  animation: hoe-pts .85s ease-out forwards;
}
@keyframes hoe-pts { 0% { transform: translateY(10px) scale(.4); opacity: 0; } 20% { transform: translateY(0) scale(1.1); opacity: 1; } 100% { transform: translateY(-26px) scale(1); opacity: 0; } }
.hoe-stars { position: absolute; left: 0; top: calc(var(--c) * 0.32); --orbit: calc(var(--c) * 0.36); animation: hoe-orbit .85s linear forwards; }
.hoe-stars span { position: absolute; left: 0; top: 0; width: 0; height: 0; }
.hoe-stars i {
  position: absolute; transform: translate(-50%, -50%) scaleY(.55);
  font-style: normal; color: #ffd43b; font-size: calc(var(--c) * 0.22);
  text-shadow: 0 0 2px #2b1d12, 0 0 2px #2b1d12;
}
@keyframes hoe-orbit { 0% { transform: scale(.3) rotate(0); opacity: 1; } 30% { transform: scale(1.05) rotate(120deg); } 75% { opacity: 1; } 100% { transform: scale(1.2) rotate(330deg); opacity: 0; } }
.hoe-shards { position: absolute; left: 0; top: calc(var(--c) * 0.4); }
.hoe-shards span {
  position: absolute; width: calc(var(--c) * 0.1); height: calc(var(--c) * 0.08);
  background: #b07a4e; border: 1px solid #5d3a1e;
  clip-path: polygon(0 0, 100% 30%, 60% 100%);
  animation: hoe-shard .6s cubic-bezier(.2,.7,.5,1) forwards;
}
@keyframes hoe-shard { to { transform: translate(var(--dx), var(--dy)) rotate(var(--r)); opacity: 0; } }

.hoe-toast {
  position: absolute; left: 50%; top: 50%; z-index: 8; pointer-events: none;
  transform: translate(-50%, -50%);
  white-space: nowrap; font-weight: 900; letter-spacing: .04em;
  font-size: clamp(16px, calc(var(--c) * 0.24), 30px);
  color: #fff3df; background: #2b1d12; padding: .35em .9em; border-radius: 999px;
  box-shadow: 0 4px 0 #b5733f;
  animation: hoe-toast 1.3s cubic-bezier(.2,1.5,.4,1) forwards;
}
@keyframes hoe-toast { 0% { transform: translate(-50%, -50%) scale(.3); opacity: 0; } 15% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; } 25% { transform: translate(-50%, -50%) scale(1); } 80% { opacity: 1; } 100% { transform: translate(-50%, -70%) scale(1); opacity: 0; } }
.hoe-mult { display: inline-block; animation: hoe-mult .3s cubic-bezier(.2,1.8,.4,1); }
@keyframes hoe-mult { from { transform: scale(1.7); } }

/* lid */
.hoe-lid {
  position: absolute; inset: 0;
  transform-origin: 50% 0;
  transform-style: preserve-3d;
  transform: rotateX(0deg);
  transition: transform .95s cubic-bezier(.45,1.35,.5,1);
  z-index: 20;
}
.hoe-carton.is-open .hoe-lid { transform: rotateX(-109deg); pointer-events: none; }
.hoe-lid-outer, .hoe-lid-inner {
  position: absolute; inset: 0;
  border-radius: calc(var(--c) * 0.2);
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
}
.hoe-lid-outer {
  display: flex; align-items: center; justify-content: center;
  width: 100%; cursor: pointer; overflow: hidden;
  background:
    ${CARD_NOISE},
    radial-gradient(120% 90% at 30% 0%, #e2c197, transparent 60%),
    linear-gradient(180deg, #d1a777, #b88a5b);
  box-shadow:
    inset 0 2px 0 rgba(255,240,215,.7),
    inset 0 -4px 0 rgba(90,55,25,.3),
    0 calc(var(--c) * 0.12) 0 var(--card-edge),
    0 calc(var(--c) * 0.12 + 2px) 0 #5e3f24,
    0 calc(var(--c) * 0.3) calc(var(--c) * 0.3) -4px rgba(70,40,15,.45);
  transition: filter .2s;
}
.hoe-lid-outer:not(:disabled):hover { filter: brightness(1.04); }
.hoe-lid-outer:not(:disabled):active { filter: brightness(.97); }
.hoe-carton:not(.is-open) .hoe-lid-outer { animation: hoe-wiggle 3.2s ease-in-out infinite; transform-origin: 50% 0; }
@keyframes hoe-wiggle { 0%, 86%, 100% { transform: none; } 89% { transform: rotateX(-7deg); } 92% { transform: rotateX(0); } 95% { transform: rotateX(-4deg); } }
.hoe-domes {
  position: absolute; inset: calc(var(--c) * 0.18);
  background-image:
    radial-gradient(42% 38% at 50% 46%, rgba(255,240,215,.55), rgba(255,240,215,0) 60%),
    radial-gradient(48% 44% at 50% 54%, rgba(0,0,0,0) 70%, rgba(90,55,25,.22) 86%, rgba(0,0,0,0) 100%);
  background-size: calc(var(--c) * 1) calc(var(--c) * 0.92);
  background-position: 0 0;
  opacity: .9;
}
.hoe-lid-inner {
  transform: rotateX(180deg);
  background:
    ${CARD_NOISE},
    radial-gradient(48% 44% at 50% 50%, rgba(70,40,15,.28), transparent 70%) 0 0 / var(--c) calc(var(--c) * 0.92),
    linear-gradient(0deg, #a87b4d, #8d6338);
  box-shadow: inset 0 0 calc(var(--c) * 0.2) rgba(60,35,12,.45);
}
.hoe-label {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: calc(var(--c) * 0.12);
  padding: calc(var(--c) * 0.1) calc(var(--c) * 0.16);
  max-width: 92%;
  background: linear-gradient(180deg, #fff8ec, #f6e7cf);
  border: 2px solid #2b1d12; border-radius: 10px;
  box-shadow: 0 3px 0 rgba(60,35,12,.35), inset 0 0 0 3px #fff8ec, inset 0 0 0 4px #c9a27a;
  transform: rotate(-2.5deg);
  color: #2b1d12;
}
.hoe-label-logo { width: calc(var(--c) * 0.38); height: auto; flex: none; filter: drop-shadow(0 2px 1px rgba(60,35,12,.35)); }
.hoe-label-kicker { font-size: clamp(8px, calc(var(--c) * 0.075), 11px); font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: #b5733f; }
.hoe-label-title { font-size: clamp(17px, calc(var(--c) * 0.24), 34px); font-weight: 900; line-height: .95; letter-spacing: -.02em; text-transform: uppercase; }
.hoe-label-small { margin-top: 3px; font-size: clamp(8px, calc(var(--c) * 0.08), 12px); font-weight: 600; color: #6d5440; }
.hoe-label-stamp {
  flex: none; display: grid; place-items: center; text-align: center;
  width: calc(var(--c) * 0.5); height: calc(var(--c) * 0.5);
  border: 2px dashed #c0392b; border-radius: 50%;
  color: #c0392b; font-size: clamp(6px, calc(var(--c) * 0.06), 9px); font-weight: 900; line-height: 1.05; letter-spacing: .06em;
  transform: rotate(14deg); opacity: .85;
}
.hoe-tab {
  position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 0);
  padding: calc(var(--c) * 0.05) calc(var(--c) * 0.22) calc(var(--c) * 0.06);
  border-radius: 10px 10px 0 0;
  background: #2b1d12; color: #fff3df;
  font-size: clamp(10px, calc(var(--c) * 0.09), 13px); font-weight: 900; letter-spacing: .22em; text-transform: uppercase;
  animation: hoe-tab 1.4s ease-in-out infinite;
}
.hoe-tab:empty { display: none; }
@keyframes hoe-tab { 50% { transform: translate(-50%, -3px); } }

/* end screen */
.hoe-over {
  position: absolute; inset: calc(var(--c) * 0.62) 0 0 0; z-index: 30;
  display: grid; place-items: center; padding: 10px;
  background: rgba(255,248,236,.55); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
  border-radius: calc(var(--c) * 0.2);
  animation: hoe-fade .3s ease-out;
}
@keyframes hoe-fade { from { opacity: 0; } }
.hoe-over-card {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  width: min(440px, 100%); padding: 18px 18px 20px;
  background: #fffaf3; border: 2px solid #2b1d12; border-radius: 18px;
  box-shadow: 0 6px 0 #2b1d12, 0 20px 40px -10px rgba(70,40,15,.45);
  animation: hoe-card .45s cubic-bezier(.2,1.5,.4,1);
}
@keyframes hoe-card { from { transform: translateY(20px) scale(.9); opacity: 0; } }
.hoe-over-portrait { position: relative; width: 72px; aspect-ratio: 3 / 4; margin: 40px 0 12px; animation: hoe-wobble 2.4s ease-in-out infinite; transform-origin: 50% 100%; }
@keyframes hoe-wobble { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
.hoe-stat { background: #f6ebdc; border-radius: 12px; padding: 8px 10px; }
.hoe-stat dt { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; color: #a0714a; }
.hoe-stat dd { font-size: 22px; font-weight: 900; font-variant-numeric: tabular-nums; }

/* stick cursor */
.hoe-stick { position: fixed; left: 0; top: 0; z-index: 9999; pointer-events: none; transition: opacity .15s; will-change: transform; }
.hoe-stick-tilt { position: absolute; left: 0; top: 0; transform: rotate(-42deg); transform-origin: 0 0; }
.hoe-stick-arm {
  position: absolute; left: -8px; top: -8px; width: 16px; height: 210px;
  transform-origin: 50% 100%;
  transform: rotate(-26deg);
  border-radius: 8px 8px 5px 5px;
  background:
    repeating-linear-gradient(180deg, transparent 0 22px, rgba(70,35,10,.18) 22px 23px, transparent 23px 41px),
    linear-gradient(90deg, #6e3f1b 0%, #b97a43 35%, #d39a5e 50%, #a76a37 70%, #5e3416 100%);
  box-shadow: 4px 6px 8px rgba(40,20,5,.35);
}
.hoe-stick-knob {
  position: absolute; left: -4px; top: -6px; width: 22px; height: 30px; border-radius: 50% 50% 40% 40%;
  background: radial-gradient(circle at 35% 30%, #e6b27a, #a76a37 60%, #6e3f1b);
}
.hoe-stick-grip {
  position: absolute; left: -1px; right: -1px; bottom: 6px; height: 46px; border-radius: 4px;
  background: repeating-linear-gradient(160deg, #3a2414 0 5px, #6b3a1f 5px 8px);
}

@media (prefers-reduced-motion: reduce) {
  .hoe-carton:not(.is-open) .hoe-lid-outer, .hoe-tab { animation: none; }
}
`;
