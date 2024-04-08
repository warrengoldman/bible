import { revalidatePath } from "next/cache";
const SEARCH_URL = "http://localhost:8080/biblebook/search";
const CHAPTER_URL = "http://localhost:8080/biblebook/chapter";
const BIBLE_META_URL = "http://localhost:8080/biblebook/metadata";
export async function searchBible(query) {
  const bibleBookSearchRequest = { query: query, includeSource: false };
  revalidatePath(SEARCH_URL);
  const response = await fetch(SEARCH_URL, {
    method: "POST",
    body: JSON.stringify(bibleBookSearchRequest),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const bibleBookSearchResult = [];
  const book = await response.json();
  if (response.ok) {
    bibleBookSearchResult.push(book);
  }
  return bibleBookSearchResult;
}

export async function bibleBook(book:string, chapter:string):Promise<BibleBook> {
  const chapterUrl = CHAPTER_URL + "/" + book + "/" + chapter;
  revalidatePath(chapterUrl);
  const response = await fetch(chapterUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const res = await response.json();
  if (res.ok) {
    return res;
  }
  return null;
}

export async function bibleMetaData():Promise<BibleBookHit[]> {
  revalidatePath(BIBLE_META_URL);
  const response = await fetch(BIBLE_META_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const res = await response.json();
  if (response.ok) {
    return res;
  }
  return [];
}