package com.bibleapp.dto;

import java.io.Serializable;

public record BibleBookHit(ChapterVerseOffset chapterVerseOffset, String verse) implements Serializable {};