package com.bibleapp.dto;

import java.util.List;

import com.bibleapp.domain.BibleBook;

public record BibleBookHitSearchResult (BibleBook bibleBook, List<BibleBookHit> bibleBookHits, List<String> highlights) {};