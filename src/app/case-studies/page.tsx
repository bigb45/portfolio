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
                <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-500"
                >
                    No Case Studies found.
                </motion.p>
            ) : (
                <motion.div
                    key="list"
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
    );
}

export default CaseStudies;
