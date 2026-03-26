import type { MetadataRoute } from "next";
import { getSitemapOrigin } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
    const origin = getSitemapOrigin().replace(/\/+$/, "");
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
