import { lusitana } from '@/app/ui/fonts';

export default async function BibleSearchResults() {
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        The lusitana classname
      </h2>
      <h1 className="text-blue-500">I'm blue!</h1>
    </div>
  );
}
