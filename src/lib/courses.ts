import { sanityQuery } from "./sanity";

export type CourseChallenge = {
  _id: string;
  sourceId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  priority?: number;
};

export type CourseChapter = {
  _id: string;
  sourceId: string;
  title: string;
  state?: string;
  priority?: number;
  thumbnailUrl?: string;
};

export type CourseAttachment = {
  _id: string;
  sourceId: string;
  title?: string;
  url: string;
  contentType?: string;
  size?: number;
  priority?: number;
  kind?: string;
};

export type CoursePost = {
  _id: string;
  sourceId: string;
  title: string;
  type?: string;
  state?: string;
  priority?: number;
  description?: string;
  bodyRaw?: string;
  thumbnailUrl?: string;
  attachments: CourseAttachment[];
};

export async function getChallenges() {
  return sanityQuery<CourseChallenge[]>(
    `*[_type=="courseChallenge"] | order(priority asc, title asc) {
      _id, sourceId, title, description, thumbnailUrl, priority
    }`,
  );
}

export async function getChallenge(sourceId: string) {
  return sanityQuery<CourseChallenge | null>(
    `*[_type=="courseChallenge" && sourceId==$challengeId][0] {
      _id, sourceId, title, description, thumbnailUrl, priority
    }`,
    { challengeId: sourceId },
  );
}

export async function getChaptersByChallenge(challengeId: string) {
  return sanityQuery<CourseChapter[]>(
    `*[_type=="courseChapter" && challenge->sourceId==$challengeId]
      | order(priority asc, title asc) {
        _id, sourceId, title, state, priority, thumbnailUrl
      }`,
    { challengeId },
  );
}

export async function getPostsByChapter(challengeId: string, chapterId: string) {
  return sanityQuery<CoursePost[]>(
    `*[_type=="coursePost" && challenge->sourceId==$challengeId && chapter->sourceId==$chapterId]
      | order(priority asc, title asc) {
        _id, sourceId, title, type, state, priority, description, bodyRaw, thumbnailUrl,
        "attachments": *[_type=="courseAttachment" && references(^._id)]
          | order(priority asc, title asc) {
            _id, sourceId, title, url, contentType, size, priority, kind
          }
      }`,
    { challengeId, chapterId },
  );
}
