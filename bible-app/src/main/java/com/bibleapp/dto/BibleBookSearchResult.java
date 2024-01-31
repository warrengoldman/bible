package com.bibleapp.dto;

import java.util.List;

public record BibleBookSearchResult(long bibleBookCount, long nbrVerses, long totalNbrHits, List<BibleBookHitSearchResult> bibleBookHits) {

}
