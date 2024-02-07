import { revalidatePath } from "next/cache";
const SEARCH_URL = "http://localhost:8080/biblebook/search";
export async function searchBible(query) {
  const bibleBookSearchRequest = { query: query, includeSource: true };
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
