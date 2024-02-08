import Link from 'next/link';
import BibleBookHighlightsTable from './bible-book-highlights-table';
import BibleBookVersesTable from './bible-book-verses-table';

export default async function BibleBookHitTable ({
  bibleBookHits,
}: {
  bibleBookHits: BibleBookHit[]
}) {
  return (
    <table className="min-w-full text-gray-900 md:table">
      <tbody className="bg-white">
        {bibleBookHits?.map((bbHit) => (
          <>
            <tr className="h-6">
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td>
                <b>Bible Book Name</b>
              </td>
              <td>
                <b>Bible Book Number</b>
              </td>
            </tr>
            <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <td>{bbHit.bibleBook.book}</td>
              <td>{bbHit.bibleBook.id}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <BibleBookVersesTable verseHits={bbHit.bibleBookHits} bibleBookId={bbHit.bibleBook.id} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <BibleBookHighlightsTable highlights={bbHit.highlights} />
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
}