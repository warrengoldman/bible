package com.bibleapp.dto;

public record BibleBookSearchRequest(String query, boolean includeSource) {

}
