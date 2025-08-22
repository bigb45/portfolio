"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CaseStudy, { CaseStudyProps } from "./CaseStudy";
import Loading from "../../loading";

function CaseStudyPage() {
    const [caseStudy, setCaseStudy] = useState<CaseStudyProps | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const caseStudyId = window.location.pathname;
        console.log({ caseStudyId });
        setLoading(true);
        fetch(`/api/${caseStudyId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("case study id:", caseStudyId);
                console.log("Case study", { data });
                setCaseStudy(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="items-center overflow-hidden">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        className="h-screen"
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Loading />
                    </motion.div>
                ) : (
                    <motion.div
                        key="case-study"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CaseStudy {...caseStudy!} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CaseStudyPage;
