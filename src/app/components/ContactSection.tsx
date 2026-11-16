"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ContactSectionProps = {
    open: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactSection({ open }: ContactSectionProps) {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setStatus("submitting");
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    message: data.get("message"),
                    company: data.get("company"),
                }),
            });
            const json = (await res.json().catch(() => ({}))) as {
                error?: string;
            };
            if (!res.ok) {
                setStatus("error");
                setError(json.error || "Something went wrong. Try again?");
                return;
            }
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
            setError("Network error. Please try again.");
        }
    }

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.section
                    id="contact"
                    key="contact"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-slate-200 bg-[#f8fafc]"
                >
                    <div className="mx-auto max-w-2xl px-6 py-12 lg:max-w-4xl">
                        {status === "success" ? (
                            <div className="py-8 text-center">
                                <p className="font-space text-2xl font-semibold text-slate-900">
                                    Got it — talk soon.
                                </p>
                                <p className="mt-2 text-slate-600">
                                    I&apos;ll write back to the email you left.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                                    Inquiry
                                </p>
                                <h2 className="mt-2 font-space text-3xl font-bold text-slate-900">
                                    Tell me what you&apos;re building.
                                </h2>
                                <p className="mt-2 max-w-prose text-slate-600">
                                    A few lines is enough. I read everything.
                                </p>
                                <form
                                    onSubmit={onSubmit}
                                    className="mt-8 grid gap-4 sm:grid-cols-2"
                                >
                                    <label className="sr-only" htmlFor="company">
                                        Company
                                    </label>
                                    <input
                                        id="company"
                                        name="company"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        className="hidden"
                                    />
                                    <label className="block sm:col-span-1">
                                        <span className="mb-1 block text-sm text-slate-600">
                                            Name
                                        </span>
                                        <input
                                            required
                                            name="name"
                                            maxLength={80}
                                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-amber-400 focus:ring-2"
                                        />
                                    </label>
                                    <label className="block sm:col-span-1">
                                        <span className="mb-1 block text-sm text-slate-600">
                                            Email
                                        </span>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            maxLength={120}
                                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-amber-400 focus:ring-2"
                                        />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className="mb-1 block text-sm text-slate-600">
                                            Message
                                        </span>
                                        <textarea
                                            required
                                            name="message"
                                            minLength={10}
                                            maxLength={2000}
                                            rows={5}
                                            className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-amber-400 focus:ring-2"
                                        />
                                    </label>
                                    {status === "error" && (
                                        <p className="sm:col-span-2 text-sm text-red-600">
                                            {error}
                                        </p>
                                    )}
                                    <div className="sm:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                                        >
                                            {status === "submitting"
                                                ? "Sending…"
                                                : "Send"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
