export default async function BibleSearchResultsTable({
  bibleBookSearchResult
}: {
  bibleBookSearchResult: object
}) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {bibleBookSearchResult?.map((bibleBookHit) => (
              <div
                key={bibleBookHit.bibleBookCount}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-start border-b pb-4">
                  <div className="mb-1 flex items-center">
                    <label>Number of Books: </label>
                    <b className="ml-1">
                      <p>{bibleBookHit.bibleBookCount}</p>
                    </b>
                    <label className="ml-5">Number of Verses: </label>
                    <b className="ml-1">
                      <p>{bibleBookHit.nbrVerses}</p>
                    </b>
                    <div className="flex ml-5">
                      <label>Total count: </label>
                      <b className="ml-1">
                        <p>{bibleBookHit.totalNbrHits}</p>
                      </b>
                    </div>
                  </div>
                </div>
                <div>
                  <table className="min-w-full text-gray-900 md:table">
                    <tbody className="bg-white">
                      {bibleBookHit.bibleBookHits?.map((bbHit) => (
                        <>
                          <tr className="h-6"><td colSpan={2}></td></tr>
                          <tr>
                            <td>
                              <b>Bible Book Name</b>
                            </td>
                            <td>
                              <b>Bible Book Number</b>
                            </td>
                          </tr>
                          <tr
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                          >
                            <td>
                                {bbHit.bibleBook.book}
                            </td>
                            <td>
                                {bbHit.bibleBook.id}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table className="ml-10 min-w-full ">
                                <thead className="rounded-lg text-left text-sm font-normal">
                                  <tr>
                                    <th>Chapter</th>
                                    <th>Verse</th>
                                    <th>Verse Text</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                {bbHit.bibleBookHits?.map((verseHit) => (
                                  <tr key={verseHit.chapterVerseOffset.verseOffset}>
                                    <td>{verseHit.chapterVerseOffset.chapterOffset+1}</td>
                                    <td>{verseHit.chapterVerseOffset.verseOffset+1}</td>
                                    <td>{verseHit.verse}</td>
                                  </tr>
                                ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table className="ml-10 min-w-full ">
                                <thead className="rounded-lg text-left text-sm font-normal">
                                  <tr>
                                    <th>Searched Text Highlighted</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                {bbHit.highlights?.map((highlight) => (
                                  <tr key={highlight}>
                                    <td><span dangerouslySetInnerHTML={{ __html:highlight}}></span></td>
                                  </tr>
                                ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}