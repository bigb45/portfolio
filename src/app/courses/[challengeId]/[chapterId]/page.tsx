import Link from "next/link";
import { getPostsByChapter } from "@/lib/courses";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    challengeId: string;
    chapterId: string;
  };
};

function looksLikeHtml(value?: string) {
  return Boolean(value && /<[^>]+>/.test(value));
}

export default async function ChapterPage({ params }: Props) {
  try {
    const posts = await getPostsByChapter(params.challengeId, params.chapterId);

    return (
      <main className="mx-auto max-w-5xl p-6">
        <Link href={`/courses/${params.challengeId}`} className="text-sm underline">
          ← Back to chapters
        </Link>

        <h1 className="mb-6 mt-2 text-3xl font-bold">{params.chapterId}</h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post._id} className="space-y-4 rounded-2xl border p-5">
              <header>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-sm opacity-70">
                  {post.type ?? "post"}
                  {post.state ? ` · ${post.state}` : ""}
                </p>
              </header>

              {post.attachments?.length ? (
                <section className="space-y-3">
                  <h3 className="font-semibold">Attachments</h3>
                  {post.attachments.map((attachment) => (
                    <div key={attachment._id} className="rounded-xl border p-4">
                      <div className="font-medium">{attachment.title || attachment.sourceId}</div>
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-sm underline"
                      >
                        {attachment.url}
                      </a>
                      <div className="mt-1 text-xs opacity-70">
                        {attachment.kind || attachment.contentType || "file"}
                      </div>
                    </div>
                  ))}
                </section>
              ) : null}

              <section className="rounded-xl border p-4">
                {looksLikeHtml(post.bodyRaw) ? (
                  <div dangerouslySetInnerHTML={{ __html: post.bodyRaw || "" }} />
                ) : (
                  <p className="whitespace-pre-wrap">{post.bodyRaw || post.description || ""}</p>
                )}
              </section>
            </article>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Chapter</h1>
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <p>Failed to load posts from Sanity.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </main>
    );
  }
}
