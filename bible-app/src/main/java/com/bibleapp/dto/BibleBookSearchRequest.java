package com.bibleapp.dto;

import java.io.Serializable;

public record BibleBookSearchRequest(String query, boolean includeSource) implements Serializable {

}
