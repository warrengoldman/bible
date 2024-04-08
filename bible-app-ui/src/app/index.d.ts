declare global {
  type BibleBook = {

  };

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
  type BibleBookMetaData = {
    name: string;
    id: string;
    chapterCount: number;
  }
}
export {};