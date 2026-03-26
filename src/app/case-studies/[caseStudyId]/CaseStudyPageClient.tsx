"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CaseStudy, { CaseStudyProps } from "./CaseStudy";
import Loading from "../../loading";
import { useRouter, useParams } from "next/navigation";

type Props = {
    initialCaseStudy: CaseStudyProps | null;
};

export default function CaseStudyPageClient({ initialCaseStudy }: Props) {
    const [caseStudy, setCaseStudy] = useState<CaseStudyProps | null>(
        initialCaseStudy,
    );
    const [loading, setLoading] = useState(() => !initialCaseStudy);
    const router = useRouter();
    const params = useParams();
    const id =
        typeof params?.caseStudyId === "string"
            ? params.caseStudyId
            : undefined;

    useEffect(() => {
        if (initialCaseStudy) {
            setCaseStudy(initialCaseStudy);
            setLoading(false);
            return;
        }
        if (!id) return;
        setLoading(true);
        fetch(`/api/case-studies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCaseStudy(data);
                setLoading(false);
            });
    }, [id, initialCaseStudy]);

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
                        {caseStudy ? (
                            <CaseStudy
                                {...caseStudy}
                                onBack={() => {
                                    router.push("/case-studies");
                                }}
                            />
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
