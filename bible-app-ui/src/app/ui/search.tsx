'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
export default function Search({
  placeholder,
  query
}: {
  placeholder: string
  query: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [book, setBook] = useState();
  const [q, setQ] = useState(query);
  const [chapterNbrs, setChapterNbrs] = useState([]);
  const bookChange = (e) => {
    const b = e.target.value.split(":");
    setBook(b[0]);
    const chapterCount = b[1];
    const chapterNbrArray = [];
    let num = 0;
    while (num < chapterCount) {
      num++;
      chapterNbrArray.push(num);
    };
    setChapterNbrs(chapterNbrArray);
  };
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term && term != undefined) {
      setQ(term);
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleChapter = (term, book, q) => {
    if (q && q != undefined) {
      replace('dashboard/bible-chapter/' + book + '/' + term + '/' + q);
    } else {
      replace('dashboard/bible-chapter/' + book + '/' + term);
    }
  };
  const chapterChange = (e) => {
    handleChapter(e.target.value, book, q);
  };
  const bookMetaData = [];
  bookMetaData.push({"name":"Genesis", "id": "1", "chapterCount": "50"})
  bookMetaData.push({"name":"Exodus", "id": "2", "chapterCount": "40"})
  return (
    <span className="block">
      <div className="rounded-xl border-separate border-4 border-green-500">
        Navigate to Book/Chapter
        <select onChange={bookChange}
              id="book"
              name="book"
              className="mb-1 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=''
        >
          <option value="" disabled>
            Select a book
          </option>
          {bookMetaData?.map((bookMeta) => (
            <option key={bookMeta.id} value={bookMeta.id + ":" + bookMeta.chapterCount}>
              {bookMeta.name}
            </option>
          ))};
        </select>
        
        <select onChange={chapterChange}
              id="chapter"
              name="chapter"
              className="mb-1 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=''
        >
          <option value="" disabled>
            Select a chapter
          </option>
          {chapterNbrs?.map((chapterNbr) => (
            <option key={chapterNbr} value={chapterNbr}>
              {chapterNbr}
            </option>
          ))};
        </select>
      </div>
      <div className="mt-1 h-4"/>
      <div className="mt-4 relative flex flex-1 flex-shrink-0">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    </span>
  );
}
