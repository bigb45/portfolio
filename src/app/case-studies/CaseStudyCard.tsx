import React from "react";
import { formatDate } from "../utils";

export interface CaseStudyCardProps {
    id: string;
    title: string;
    subtitle: string;
    images: string[];
    publishDate: Date;
}

function CaseStudyCard({
    id,
    title,
    subtitle,
    images,
    publishDate,
}: CaseStudyCardProps) {
    return (
        <div className="m-4 flex flex-col border border-black">
            <p>{title}</p>
            <p> {subtitle}</p>
            <p> Published on {formatDate(publishDate)}</p>
        </div>
    );
}

export default CaseStudyCard;
