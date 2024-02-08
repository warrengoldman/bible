package com.bibleapp.controllers;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bibleapp.domain.BibleBook;
import com.bibleapp.domain.Chapter;
import com.bibleapp.domain.Verse;
import com.bibleapp.dto.BibleBookHit;
import com.bibleapp.dto.BibleBookHitSearchResult;
import com.bibleapp.dto.BibleBookSearchRequest;
import com.bibleapp.dto.BibleBookSearchResult;
import com.bibleapp.dto.ChapterVerseOffset;
import com.bibleapp.service.BibleBookService;

@RestController
@RequestMapping("biblebook")
public class BibleBookController {

	@Autowired
	private BibleBookService bibleBookService;

	@PostMapping(path="search", produces = MediaType.APPLICATION_JSON_VALUE)
	public BibleBookSearchResult searchBible(@RequestBody BibleBookSearchRequest bibleBookSearchRequest) {
		try {
			return bibleBookService.getBibleBookSearchResults(bibleBookSearchRequest.query(), bibleBookSearchRequest.includeSource());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping(path="chapter/{bibleBookId}/{chapterOffset}", produces = MediaType.APPLICATION_JSON_VALUE)
	public BibleBook getChapter(@PathVariable("bibleBookId") String bibleBookId, @PathVariable("chapterOffset") String chapterOffset) {
		try {
			BibleBook bibleBook = bibleBookService.findById(bibleBookId);
			return getBibleBookWithOnlyChapter(bibleBook, chapterOffset);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	private BibleBook getBibleBookWithOnlyChapter(BibleBook bibleBook, String chapterOffset) {
		BibleBook bibleBookWithOnlyChapter = new BibleBook();
		bibleBookWithOnlyChapter.setId(bibleBook.getId());
		bibleBookWithOnlyChapter.setBook(bibleBook.getBook());
		List<Chapter> chapterNeeded = new ArrayList<>();
		int chapterOffsetInt = Integer.valueOf(chapterOffset).intValue();
		for (Chapter chapter:bibleBook.getChapters()) {
			if (chapter.getChapter() == chapterOffsetInt) {
				chapterNeeded.add(chapter);
			}
		}
		bibleBookWithOnlyChapter.setChapters(chapterNeeded);
		return bibleBookWithOnlyChapter;
	}

	@PostMapping(path="search-simple", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchSimple searchBibleSimple(@RequestBody BibleBookSearchRequest bibleBookSearchRequest) {
		List<BibleBookHitSearchResult> bibleBookHits = createOneBibleBookHitSearchResult();
		SearchSimple searchSimple = new SearchSimple(4,5,6, bibleBookSearchRequest.includeSource(), bibleBookSearchRequest.query(), bibleBookHits);
		return searchSimple;
	}
	private List<BibleBookHitSearchResult> createOneBibleBookHitSearchResult() {
		List<BibleBookHitSearchResult> searchResult = new ArrayList<>();
		searchResult.add(createBibleBookHitSearchResult());
		return searchResult;
	}
	private BibleBookHitSearchResult createBibleBookHitSearchResult() {
		BibleBook bibleBook = createBibleBook();
		List<BibleBookHit> bibleBookHits = createBibleBookHits();
		List<String> highlights = new ArrayList<>();
		highlights.add("Hear diligently my speech, and let this be your <em>consolations</em>.");
		BibleBookHitSearchResult result = new BibleBookHitSearchResult(bibleBook , bibleBookHits, highlights );
		return result;
	}
	private List<BibleBookHit> createBibleBookHits() {
		List<BibleBookHit> bibleBookHits = new ArrayList<BibleBookHit>();
		bibleBookHits.add(createBibleBookHit());
		return bibleBookHits;
	}

	private BibleBookHit createBibleBookHit() {
		BibleBookHit bibleBookHit = new BibleBookHit(createChapterVerseOffset(), createVerseText());
		return bibleBookHit;
	}

	private ChapterVerseOffset createChapterVerseOffset() {
		ChapterVerseOffset chapterVerseOffset = new ChapterVerseOffset(20, 1);
		return chapterVerseOffset;
	}

	private BibleBook createBibleBook() {
		BibleBook bibleBook = new BibleBook();
		bibleBook.setId("18");
		bibleBook.setBook("Job");
		bibleBook.setChapters(createChapters());
		return bibleBook;
	}
	private List<Chapter> createChapters() {
		List<Chapter> chapters = new ArrayList<>();
		chapters.add(createChapter());
		return chapters;
	}
	private Chapter createChapter() {
		Chapter chapter = new Chapter();
		chapter.setChapter(20);
		chapter.setVerses(createVerses());
		return chapter;
	}
	private List<Verse> createVerses() {
		List<Verse> verses = new ArrayList<>();
		verses.add(createVerse());
		return verses;
	}
	private Verse createVerse() {
		Verse verse = new Verse();
		verse.setVerse(1);
		verse.setText(createVerseText());
		return verse;
	}
	private String createVerseText() {
		return "Hear diligently my speech, and let this be your consolations.";
	}
	public record SearchSimple(long count1, long count2, long count3, boolean includeSource, String query, List<BibleBookHitSearchResult> bibleBookHits) implements Serializable {};
}
