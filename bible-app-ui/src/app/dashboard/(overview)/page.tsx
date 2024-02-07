import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { BibleResultsSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import Table from '@/app/ui/biblesearchresults/table';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Bible Search
      </h1>
      <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search verses..." />
      </div>
      <Suspense key={query} fallback={<BibleResultsSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
    </main>
  );
}