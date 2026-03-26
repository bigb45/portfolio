import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyPageClient from "./CaseStudyPageClient";
import type { CaseStudyProps } from "./CaseStudy";
import { getSiteUrl } from "@/lib/site";

type Props = {
    params: { caseStudyId: string };
};

function toCaseStudyProps(row: {
    title: string;
    studyContent: string;
    subtitle: string | null;
    publishDate: Date;
    category: string | null;
}): CaseStudyProps {
    return {
        title: row.title,
        studyContent: row.studyContent,
        subtitle: row.subtitle ?? "",
        publishDate: row.publishDate,
        category: row.category ?? "",
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const cs = await prisma.case_study.findUnique({
        where: { id: params.caseStudyId },
        select: {
            title: true,
            subtitle: true,
            description: true,
            studyContent: true,
        },
    });
    if (!cs) {
        return { title: "Case study" };
    }
    const description =
        cs.subtitle?.trim() ||
        cs.description.slice(0, 160) ||
        cs.studyContent.slice(0, 160).replace(/\s+/g, " ").trim() ||
        cs.title;
    return {
        title: cs.title,
        description,
        alternates: { canonical: `/case-studies/${params.caseStudyId}/` },
        openGraph: {
            title: cs.title,
            description,
            type: "article",
            url: `/case-studies/${params.caseStudyId}/`,
        },
        twitter: {
            card: "summary_large_image",
            title: cs.title,
            description,
        },
    };
}

export default async function Page({ params }: Props) {
    const row = await prisma.case_study.findUnique({
        where: { id: params.caseStudyId },
        select: {
            title: true,
            studyContent: true,
            subtitle: true,
            publishDate: true,
            category: true,
        },
    });
    if (!row) notFound();

    const props = toCaseStudyProps(row);
    const site = getSiteUrl();
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.subtitle || undefined,
        datePublished: props.publishDate.toISOString(),
        author: {
            "@type": "Person",
            name: "Mohammed Natour",
            url: site,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${site.replace(/\/+$/, "")}/case-studies/${params.caseStudyId}/`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />
            <CaseStudyPageClient initialCaseStudy={props} />
        </>
    );
}
