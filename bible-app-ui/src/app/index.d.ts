declare global {
  type VerseHit = {
    chapterVerseOffset: {
      chapterOffset: number;
      verseOffset: number;
    };
    verse: string;
  };

  type BibleBookHit = {
    bibleBook: { book: string; id: string };
    bibleBookHits: [
      VerseHit
    ];
    highlights: [string];
  };

  type BibleBookSearchResult = 
    {
      bibleBookCount: number;
      nbrVerses: number;
      totalNbrHits: number;
      bibleBookHits: [
        BibleBookHit
      ];
    }
}
export {};