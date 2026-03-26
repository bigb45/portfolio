import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/site";
import { getChallenges, getChaptersByChallenge } from "@/lib/courses";

export const revalidate = 3600;

function staticEntries(): MetadataRoute.Sitemap {
    const paths = [
        "/",
        "/blog/",
        "/projects/",
        "/case-studies/",
        "/courses/",
        "/experience/",
        "/library/",
        "/desktop/",
    ];
    const now = new Date();
    return paths.map((path) => ({
        url: absoluteUrl(path),
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [...staticEntries()];
    const now = new Date();

    try {
        const [projects, publicBlogs, publicCaseStudies] = await Promise.all([
            prisma.project.findMany({ select: { id: true, startTime: true } }),
            prisma.blog.findMany({
                where: { isPublic: true },
                select: { slug: true, publishDate: true },
            }),
            prisma.case_study.findMany({
                where: { is_public: true },
                select: { id: true, publishDate: true },
            }),
        ]);

        for (const p of projects) {
            entries.push({
                url: absoluteUrl(`/projects/${p.id}/`),
                lastModified: p.startTime ?? now,
                changeFrequency: "monthly",
                priority: 0.8,
            });
        }
        for (const b of publicBlogs) {
            entries.push({
                url: absoluteUrl(`/blog/${b.slug}/`),
                lastModified: b.publishDate,
                changeFrequency: "monthly",
                priority: 0.75,
            });
        }
        for (const c of publicCaseStudies) {
            entries.push({
                url: absoluteUrl(`/case-studies/${c.id}/`),
                lastModified: c.publishDate,
                changeFrequency: "monthly",
                priority: 0.75,
            });
        }
    } catch {
        // DB unavailable at build time — static routes still listed.
    }

    try {
        const challenges = await getChallenges();
        for (const ch of challenges) {
            entries.push({
                url: absoluteUrl(`/courses/${ch.sourceId}/`),
                lastModified: now,
                changeFrequency: "monthly",
                priority: 0.65,
            });
            const chapters = await getChaptersByChallenge(ch.sourceId);
            for (const chapter of chapters) {
                entries.push({
                    url: absoluteUrl(
                        `/courses/${ch.sourceId}/${chapter.sourceId}/`,
                    ),
                    lastModified: now,
                    changeFrequency: "monthly",
                    priority: 0.6,
                });
            }
        }
    } catch {
        // Sanity not configured or query failed — skip course URLs.
    }

    return entries;
}
