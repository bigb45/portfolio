import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    const origin = getSiteUrl().replace(/\/+$/, "");
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/test/", "/experimental/", "/tasks/"],
            },
        ],
        sitemap: `${origin}/sitemap.xml`,
    };
}
