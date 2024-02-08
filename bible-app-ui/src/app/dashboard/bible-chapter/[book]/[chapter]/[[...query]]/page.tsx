import { bibleBook } from '@/app/lib/search-bible';
import BibleBook from '@/app/ui/biblesearchresults/bible-chapter';
export default async function Page({ params }: { params: { book: string, chapter: string, query: string} }) {
  const {book, chapter, query} = params;
  const bibleBookRes = await bibleBook(book, chapter);
  return (
     <BibleBook bibleBook={bibleBookRes} query={query}/>
  );
}
