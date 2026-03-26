import Link from "next/link";
import { getChallenges } from "@/lib/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  try {
    const challenges = await getChallenges();

    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Courses</h1>
        <div className="grid gap-4">
          {challenges.map((challenge) => (
            <Link
              key={challenge._id}
              href={`/courses/${challenge.sourceId}/`}
              className="rounded-xl border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <h2 className="text-xl font-semibold">{challenge.title}</h2>
              {challenge.description ? (
                <p className="mt-1 text-sm opacity-80">{challenge.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Courses</h1>
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <p>Failed to load courses from Sanity.</p>
          <p className="mt-1 text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </main>
    );
  }
}
