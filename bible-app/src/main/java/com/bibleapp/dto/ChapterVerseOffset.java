package com.bibleapp.dto;

import java.io.Serializable;

public record ChapterVerseOffset(int chapterOffset, int verseOffset) implements Serializable {}