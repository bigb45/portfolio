import React from "react";
import { formatDate } from "../utils";
import Link from "next/link";

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
        <div>
            <Link href={`${id}`}>
                <div className="m-4 flex flex-col border border-black">
                    <p>{title}</p>
                    <p> {subtitle}</p>
                    {/* <p> Published on {formatDate(publishDate)}</p> */}
                </div>
            </Link>
        </div>
    );
}

export default CaseStudyCard;
