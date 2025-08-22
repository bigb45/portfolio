import React from "react";

export interface CaseStudyProps {
    title: string;
    caseStudyText: string;
    subtitle: string;
    publishDate: Date;
    category: string;
}
function CaseStudy({
    title,
    caseStudyText,
    subtitle,
    publishDate,
    category,
}: CaseStudyProps) {
    return <div>{title}</div>;
}

export default CaseStudy;
