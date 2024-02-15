'use client'
import Link from 'next/link';
import BibleBookHighlightsTable from './bible-book-highlights-table';

export default function BibleBookVersesTable ({
  verseHits,
  bibleBookId,
  query
}: {
  verseHits: VerseHit[],
  bibleBookId: string,
  query: string
}) {
  let i = 1;
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
      <tr key={verseHit.chapterVerseOffset.chapterOffset + ':' + verseHit.chapterVerseOffset.verseOffset + ':' + (i++)}>
        <td>
          <Link className="text-blue-600 text-sm hover:text-blue-900"
            href={`/dashboard/bible-chapter/${bibleBookId}/${verseHit.chapterVerseOffset.chapterOffset+1}/${query}`}
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