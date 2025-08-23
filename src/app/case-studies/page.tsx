"use client";

import React, { useEffect, useState } from "react";
import CaseStudyCard, { CaseStudyCardProps } from "./CaseStudyCard";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../loading";

function CaseStudies() {
    const [caseStudies, setCaseStudies] = useState<CaseStudyCardProps[] | null>(
        null,
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/case-studies", { cache: "no-store" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data: CaseStudyCardProps[]) => {
                setCaseStudies(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="relative mb-10 mt-20 flex h-[calc(100vh-8rem)] flex-col gap-3 text-4xl font-bold text-[#0F172A] sm:text-5xl md:text-6xl lg:mt-40">
            {!caseStudies || caseStudies.length === 0 ? "" : "Case studies:"}
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        className="flex h-64 items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Loading />
                    </motion.div>
                ) : !caseStudies || caseStudies.length === 0 ? (
                    <motion.div
                        key="empty"
                        className="flex flex-1 flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.p className="text-center text-3xl text-gray-500">
                            No Case Studies found.
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        className="mx-auto mt-8 flex w-full flex-col items-center gap-4 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {caseStudies.map((caseStudy) => (
                            <CaseStudyCard key={caseStudy.id} {...caseStudy} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CaseStudies;
