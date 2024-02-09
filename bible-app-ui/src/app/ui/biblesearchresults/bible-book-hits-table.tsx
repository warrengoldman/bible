'use client'
import BibleBookHighlightsTable from './bible-book-highlights-table';
import BibleBookVersesTable from './bible-book-verses-table';
import BibleBookHitTable from './bible-book-hit-table';

export default function BibleBookHitsTable ({
  bibleBookHits,
  query
}: {
  bibleBookHits: BibleBookHit[],
  query: string
}) {
  return (
    <table className="min-w-full text-gray-900 md:table">
      <tbody className="bg-white">
        {bibleBookHits?.map((bbHit) => (
          <tr key={bbHit.bibleBook.id} className="mt-3">
            <td colSpan={2}>
              <BibleBookHitTable bibleBookHit={bbHit} query={query} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}