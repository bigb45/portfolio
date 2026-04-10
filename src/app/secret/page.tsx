"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Lock, Unlock, Zap } from "lucide-react";

export default function SecretPage() {
    const [accessGranted, setAccessGranted] = useState(false);
    const [hackingProgress, setHackingProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        if (!accessGranted && hackingProgress < 100) {
            const timer = setTimeout(() => {
                setHackingProgress((prev) => Math.min(prev + Math.random() * 15, 100));
                const newLogs = [
                    "Bypassing firewall...",
                    "Intercepting packets...",
                    "Decrypting dossiers...",
                    "Accessing restricted database...",
                    "Scanning for vulnerabilities...",
                    "Authorized access detected...",
                ];
                setLogs((prev) => [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]].slice(-5));
            }, 400);
            return () => clearTimeout(timer);
        } else if (hackingProgress >= 100) {
            setTimeout(() => setAccessGranted(true), 800);
        }
    }, [hackingProgress, accessGranted]);

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center font-mono text-[#00FF41]">
            <AnimatePresence mode="wait">
                {!accessGranted ? (
                    <motion.div
                        key="hacking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-md rounded-lg border border-[#00FF41] bg-black p-6 shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                    >
                        <div className="mb-4 flex items-center gap-2 border-b border-[#00FF41] pb-2">
                            <Terminal size={20} />
                            <span>TERMINAL_ACCESS_V4.0</span>
                        </div>

                        <div className="mb-6 space-y-1 text-sm opacity-80">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                                    <span>{log}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>SYSTEM_DECRYPTION</span>
                                <span>{Math.floor(hackingProgress)}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden border border-[#00FF41]">
                                <motion.div
                                    className="h-full bg-[#00FF41]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${hackingProgress}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs animate-pulse">
                            <ShieldAlert size={14} />
                            <span>UNAUTHORIZED ACCESS DETECTED</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="granted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl space-y-8 py-10"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-[#00FF41] p-4 text-black shadow-[0_0_30px_rgba(0,255,65,0.5)]">
                                <Unlock size={48} />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                                ACCESS GRANTED
                            </h1>
                            <p className="mt-2 text-[#00FF41] opacity-70">CONFIDENTIAL DOSSIER: MOHAMMED_NATOUR</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <SecretCard
                                icon={<Lock size={20} />}
                                title="THE COFFEE PROTOCOL"
                                content="Mohammed's productivity is directly proportional to the roast level of his coffee. High-fidelity code is usually pushed between 2:00 AM and 4:00 AM."
                            />
                            <SecretCard
                                icon={<Zap size={20} />}
                                title="SILENT SKILL"
                                content="Legend says he once debugged a race condition by staring at the console until the code felt intimidated and started working correctly."
                            />
                            <SecretCard
                                icon={<ShieldAlert size={20} />}
                                title="REDACTED TECH"
                                content="There's a hidden folder in his GitHub containing an app that can predict the exact moment a client will request a 'quick minor change'."
                            />
                            <SecretCard
                                icon={<Terminal size={20} />}
                                title="USER MESSAGE"
                                content="Congratulations, agent. You've found the end of the internet. Or at least, the end of this portfolio. Thanks for exploring!"
                            />
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => setAccessGranted(false)}
                                className="border border-[#00FF41] px-4 py-2 text-xs transition-colors hover:bg-[#00FF41] hover:text-black"
                            >
                                RE-LOCK ENCRYPTION
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SecretCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
    const [isRedacted, setIsRedacted] = useState(true);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative border border-[#00FF41]/30 bg-black p-6 shadow-[0_0_15px_rgba(0,255,65,0.05)]"
            onClick={() => setIsRedacted(!isRedacted)}
        >
            <div className="mb-3 flex items-center gap-2 text-[#00FF41]">
                {icon}
                <span className="text-sm font-bold tracking-widest">{title}</span>
            </div>

            <div className="relative cursor-pointer">
                <p className="text-sm leading-relaxed text-[#00FF41]/90">
                    {content}
                </p>
                {isRedacted && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-[#00FF41] text-black font-bold"
                    >
                        <Lock size={16} className="mr-2" />
                        [CLICK TO UNREDACT]
                    </motion.div>
                )}
            </div>

            <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b border-r border-[#00FF41]" />
            <div className="absolute -top-1 -left-1 h-4 w-4 border-t border-l border-[#00FF41]" />
        </motion.div>
    );
}
