'use client'

export default function BibleBookSearchResultHeader ({
  bibleBookSearchResult,
}: {
  bibleBookSearchResult: BibleBookSearchResult
}) {
  return (
    <div className="flex items-center justify-start border-b pb-4">
      <div className="mb-1 flex items-center">
        <label>Number of Books: </label>
        <b className="ml-1">
          <p>{bibleBookSearchResult.bibleBookCount}</p>
        </b>
        <label className="ml-5">Number of Verses: </label>
        <b className="ml-1">
          <p>{bibleBookSearchResult.nbrVerses}</p>
        </b>
        <div className="flex ml-5">
          <label>Total count: </label>
          <b className="ml-1">
            <p>{bibleBookSearchResult.totalNbrHits}</p>
          </b>
        </div>
      </div>
    </div>
  );
}