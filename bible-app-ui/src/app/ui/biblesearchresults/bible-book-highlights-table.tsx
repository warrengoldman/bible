'use client'
import Link from "next/link";

export default function BibleBookHighlightsTable({
  highlights,
}: {
  highlights: string[];
}) {
  return (
    <table className="ml-10 min-w-full ">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th>Searched Text Highlighted</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {highlights?.map((highlight) => (
          <tr key={highlight}>
            <td>
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight,
                }}
              ></span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
