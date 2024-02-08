'use client'
import BibleBookHitTable from './bible-book-hit-table';
import BibleBookSearchResultHeader from './bible-search-result-header';

export default function BibleSearchResultsTable({
  bibleBookSearchResult,
  query
}: {
  bibleBookSearchResult: BibleBookSearchResult[],
  query: string
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {bibleBookSearchResult?.map((bibleBookHit) => (
              <div
                key={bibleBookHit.bibleBookCount}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <BibleBookSearchResultHeader bibleBookSearchResult={bibleBookHit} />
                <div>
                  <BibleBookHitTable bibleBookHits = {bibleBookHit.bibleBookHits} query={query} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}