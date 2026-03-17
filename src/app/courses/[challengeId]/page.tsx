import Link from "next/link";
import { getChallenge, getChaptersByChallenge } from "@/lib/courses";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    challengeId: string;
  };
};

export default async function ChallengePage({ params }: Props) {
  try {
    const [challenge, chapters] = await Promise.all([
      getChallenge(params.challengeId),
      getChaptersByChallenge(params.challengeId),
    ]);

    return (
      <main className="mx-auto max-w-5xl p-6">
        <Link href="/courses" className="text-sm underline">
          ← Back to courses
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{challenge?.title ?? params.challengeId}</h1>
        {challenge?.description ? <p className="mt-2 opacity-80">{challenge.description}</p> : null}

        <div className="mt-6 grid gap-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter._id}
              href={`/courses/${params.challengeId}/${chapter.sourceId}`}
              className="rounded-xl border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <h2 className="text-lg font-semibold">{chapter.title}</h2>
              {chapter.state ? <p className="text-sm opacity-70">{chapter.state}</p> : null}
            </Link>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Course</h1>
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <p>Failed to load course chapters from Sanity.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </main>
    );
  }
}
