
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
export default async function BibleChapter({
  bibleBook
}: {
  bibleBook: {book:string, chapters:[{chapter:number, verses:[{text:string, verse:number}]}]};
}) {
  const chapter = bibleBook.chapters[0].chapter;
  const query = "todogetqueryfromstate naomi"; // TODO get this from state or something
  return (
    <main>
      <div>Book: {bibleBook.book}, Chapter: {chapter}</div>
      {bibleBook.chapters?.map((chapter) => (
        <div key={chapter.chapter} className="mt-3 border-solid border-2 border-green-500 rounded-xl w-3/5">
          <div className="mt-1 mb-1 ml-1 mr-1">
          {chapter.verses?.map((verse) => (
            <><sup>{verse.verse}</sup>&nbsp;{verse.text}</>
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
