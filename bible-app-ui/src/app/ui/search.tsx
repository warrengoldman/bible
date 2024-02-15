'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [book, setBook] = useState();
  const [q, setQ] = useState();
  const bookChange = (e) => {setBook(e.target.value);};
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
  return (
    <span className="block">
      <div>
        <input name="book" onChange={bookChange}></input>
        <input name="chapter" onChange={chapterChange} ></input>
      </div>
      <div className="mt-8 relative flex flex-1 flex-shrink-0">
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
