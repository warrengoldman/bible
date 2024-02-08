import Link from 'next/link';
import BibleBookHighlightsTable from './bible-book-highlights-table';

export default async function BibleBookVersesTable ({
  verseHits,
  bibleBookId
}: {
  verseHits: VerseHit[],
  bibleBookId: string
}) {
  return (

<table className="ml-10 min-w-full ">
  <thead className="rounded-lg text-left text-sm font-normal">
    <tr>
      <th>Chapter</th>
      <th>Verse</th>
      <th>Verse Text</th>
    </tr>
  </thead>
  <tbody className="bg-white">
    {verseHits?.map((verseHit) => (
      <tr key={verseHit.chapterVerseOffset.verseOffset}>
        <td>
          <Link className="text-blue-600 text-sm hover:text-blue-900"
            href={`/dashboard/bible-chapter/${bibleBookId}/${verseHit.chapterVerseOffset.chapterOffset+1}`}
          >
            {verseHit.chapterVerseOffset.chapterOffset + 1}
          </Link>
        </td>
        <td>{verseHit.chapterVerseOffset.verseOffset + 1}</td>
        <td>{verseHit.verse}</td>
      </tr>
    ))}
  </tbody>
</table>
);
}