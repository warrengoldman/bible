package com.bibleapp.dto;

import java.io.Serializable;
import java.util.List;

public record BibleBookSearchResult(long bibleBookCount, 
		long nbrVerses, 
		long totalNbrHits, 
		List<BibleBookHitSearchResult> bibleBookHits) implements Serializable {

}
