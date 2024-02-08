import { revalidatePath } from "next/cache";
const SEARCH_URL = "http://localhost:8080/biblebook/search";
const CHAPTER_URL = "http://localhost:8080/biblebook/chapter";
export async function searchBible(query) {
  const bibleBookSearchRequest = { query: query, includeSource: false };
  revalidatePath(SEARCH_URL);
  const fetchedData = await fetch(SEARCH_URL, {
    method: "POST",
    body: JSON.stringify(bibleBookSearchRequest),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => console.log(e));

  const bibleBookSearchResult = [];
  bibleBookSearchResult.push(await fetchedData.json());
  return bibleBookSearchResult;
}


export async function bibleBook(book, chapter) {
  const chapterUrl = CHAPTER_URL + "/" + book + "/" + chapter;
  revalidatePath(chapterUrl);
  const fetchedData = await fetch(chapterUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => console.log(e));

  return await fetchedData.json();
}