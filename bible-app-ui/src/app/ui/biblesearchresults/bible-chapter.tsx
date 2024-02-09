'use client'
import Link from 'next/link';
export default function BibleChapter({
  bibleBook,
  query
}: {
  bibleBook: {book:string, chapters:[{chapter:number, verses:[{text:string, verse:number}]}]},
  query: string
}) {
  const chapter = bibleBook.chapters[0].chapter;
  return (
    <main>
      <div key={bibleBook.book}>Book: {bibleBook.book}, Chapter: {chapter}</div>
      {bibleBook.chapters?.map((chapter) => (
        <div key={chapter.chapter} className="mt-3 border-solid border-2 border-green-500 rounded-xl w-3/5">
          <div className="mt-1 mb-1 ml-1 mr-1">
          {chapter.verses?.map((verse) => (
            <span key={verse.verse}><sup>{verse.verse}</sup>&nbsp;{verse.text}</span>
          ))}
          </div>
        </div>      
      ))}
      <div className="mt-10">
        <Link className="text-blue-600 text-sm hover:text-blue-900" href={`/dashboard?query=${query}`}>
          Back To Search
        </Link>
      </div>
    </main>
  );
}
