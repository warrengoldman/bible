'use client'
import BibleBookHighlightsTable from './bible-book-highlights-table';
import BibleBookVersesTable from './bible-book-verses-table';

export default function BibleBookHitTable ({
  bibleBookHit,
  query
}: {
  bibleBookHit: BibleBookHit,
  query: string
}) {
  return (
  <table className="rounded-xl border-separate border-4 border-green-500 min-w-full text-gray-900 w-4/5">
    <tbody className="bg-white">
      <tr>
        <td>
          <b>Bible Book Name</b>
        </td>
        <td>
          <b>Bible Book Number</b>
        </td>
        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
      </tr>
      <tr>
        <td>{bibleBookHit.bibleBook.book}</td>
        <td>{bibleBookHit.bibleBook.id}</td>
        <td></td>
      </tr>
      <tr>
        <td colSpan={2}>
          <BibleBookVersesTable verseHits={bibleBookHit.bibleBookHits} bibleBookId={bibleBookHit.bibleBook.id} query={query} />
        </td>
        <td></td>
      </tr>
      <tr>
        <td colSpan={2}>
          <BibleBookHighlightsTable highlights={bibleBookHit.highlights} />
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
);
}