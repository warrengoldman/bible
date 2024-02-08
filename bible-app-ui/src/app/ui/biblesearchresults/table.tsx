import { searchBible } from '@/app/lib/search-bible';
import BibleSearchResultsTable from "./bible-search-results-table";

export default async function Table({
  query
}: {
  query: string;
}) {
  if (query && query.trim() !== '') {
    let bibleBookSearchResult = await searchBible(query);
    return <BibleSearchResultsTable bibleBookSearchResult = {bibleBookSearchResult} query={query} />;
  } else {
    return (<div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          No Results
        </div>
      </div>
    </div>);
  }
}
