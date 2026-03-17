const SANITY_API_VERSION = "2025-01-01";

function getSanityConfig() {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_IO_READ_KEY;

  if (!projectId) throw new Error("Missing SANITY project id env.");
  if (!token) throw new Error("Missing SANITY_IO_READ_KEY env.");

  return { projectId, dataset, token };
}

export async function sanityQuery<T>(
  query: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const { projectId, dataset, token } = getSanityConfig();

  const search = new URLSearchParams();
  search.set("query", query);
  Object.entries(params).forEach(([key, value]) => search.set(`$${key}`, JSON.stringify(value)));

  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?${search.toString()}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sanity query failed (${res.status}): ${body}`);
  }

  const json = await res.json();
  return json.result as T;
}
