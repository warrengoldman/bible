package com.bibleapp.service;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.bibleapp.domain.BibleBook;
import com.bibleapp.domain.Chapter;
import com.bibleapp.dto.BibleBookHit;
import com.bibleapp.dto.BibleBookHitSearchResult;
import com.bibleapp.dto.BibleBookSearchResult;
import com.bibleapp.dto.ChapterVerseOffset;
import com.bibleapp.repository.BibleBookClientRepository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchRequest.Builder;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Highlight;
import co.elastic.clients.elasticsearch.core.search.HighlightField;
import co.elastic.clients.elasticsearch.core.search.HighlighterType;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.InnerHits;
import co.elastic.clients.json.JsonData;
import co.elastic.clients.util.ObjectBuilder;

@Service
public class BibleBookService {
	@Autowired
	private BibleBookClientRepository elasticsearchClientRepository;

	public BibleBook findById(String bibleBookId) throws Exception {
		GetResponse<BibleBook> bibleBook = getElasticsearchClient()
			.get(g -> g
			    .index("bible-book") 
			    .id(bibleBookId),
			    BibleBook.class );
		if (bibleBook.found()) {
			return bibleBook.source();
		}
		return null;
	}

	public BibleBookSearchResult getBibleBookSearchResults(String searchText, boolean includeSource) throws Exception {
		return processResponse(findByVerseText(searchText, includeSource), "chapters.verses.text");
	}

	BibleBookSearchResult processResponse(SearchResponse<BibleBook> searchResponse, String highlightKey) throws Exception {
		long bibleBookCount = searchResponse.hits().total().value();
		List<Hit<BibleBook>> listHits = searchResponse.hits().hits();
		List<BibleBookHitSearchResult> searchResults = new ArrayList<>();
		long totalNbrHits = 0l;
		long nbrVerses = 0l;
		for (Hit<BibleBook> bibleBookHit:listHits) {
			totalNbrHits += bibleBookHit.innerHits().get("chapters.verses").hits().total().value();
			List<String> highlights = bibleBookHit.highlight().get(highlightKey);
			BibleBook bibleBook = bibleBookHit.source();
			bibleBook.setId(bibleBookHit.id());
			List<Chapter> chapters = bibleBook.getChapters();
			if (bibleBook == null || CollectionUtils.isEmpty(bibleBook.getChapters())) {
				BibleBook retrievedBook = findById(bibleBookHit.id());
				bibleBook.setBook(retrievedBook.getBook());
				chapters = retrievedBook.getChapters();
			}
			BibleBookHitsTuple bibleBookHitsTuple = getBibleBookHits(bibleBookHit, chapters);
			nbrVerses += bibleBookHitsTuple.nbrVerses;
			searchResults.add(new BibleBookHitSearchResult(bibleBook, bibleBookHitsTuple.bibleBookHits , highlights));
		}
		return new BibleBookSearchResult(bibleBookCount, nbrVerses, totalNbrHits, searchResults);
	}

	private BibleBookHitsTuple getBibleBookHits(Hit<BibleBook> bibleBookHit, List<Chapter> chapters) {
		long nbrVerses = 0l;
		List<BibleBookHit> bibleBookHits = new ArrayList<>();
		List<ChapterVerseOffset> offsets = getChapterVerseOffsets(bibleBookHit);
		for (ChapterVerseOffset chapterVerseOffset:offsets) {
			nbrVerses++;
			String verse = chapters.get(chapterVerseOffset.chapterOffset()).getVerses().get(chapterVerseOffset.verseOffset()).getText();
			bibleBookHits.add(new BibleBookHit(chapterVerseOffset, verse));
		}
		return new BibleBookHitsTuple(bibleBookHits, nbrVerses);
	}
	private record BibleBookHitsTuple(List<BibleBookHit> bibleBookHits, long nbrVerses) {};
	
	SearchResponse<BibleBook> findByVerseText(String searchText, boolean includeSource) throws Exception {
		Highlight highlight = Highlight.of(
			    h -> h.type(HighlighterType.Unified)
			        .fields("chapters.verses.text", HighlightField.of(hf -> hf.numberOfFragments(0)))
			);
		Function<Builder, ObjectBuilder<SearchRequest>> fn = g -> {
			g.index("bible-book");
			if (!includeSource) {
				g.withJson(new StringReader("{\"_source\":  \"false\" }"));
			}
			g.size(10000); // returning all, paging is not apparent for this api
			Function<co.elastic.clients.elasticsearch._types.query_dsl.Query.Builder, ObjectBuilder<Query>> query = q -> q
			    	.nested(n -> n
		    			.path("chapters.verses")
		    			.query(q2 -> q2
	    					.match(t -> t
								.field("chapters.verses.text")
								.query(searchText)
							)
						)
		    			.innerHits(InnerHits.of(ih -> ih))
	    			);
			g.query(query);
			g.highlight(highlight);
			return g;
		};
		SearchResponse<BibleBook> searchResponse = getElasticsearchClient().search(fn,
		    BibleBook.class 	
	    );
		return searchResponse;
	}

	List<String> getVerseTextsWithHits(Hit<BibleBook> bibleBookHit) {
		List<String> versesWithHits = new ArrayList<>();
		List<ChapterVerseOffset> offsets = getChapterVerseOffsets(bibleBookHit);
		List<Chapter> chapters = bibleBookHit.source().getChapters();
		if (!CollectionUtils.isEmpty(chapters)) {
			for (ChapterVerseOffset offset:offsets) {
				String verseWithHit = chapters.get(offset.chapterOffset()).getVerses().get(offset.verseOffset()).getText();
				versesWithHits.add(verseWithHit);
			}
		}
		return versesWithHits;
	}

	private List<ChapterVerseOffset> getChapterVerseOffsets(Hit<BibleBook> bibleBookHit) {
		List<ChapterVerseOffset> offsets = new ArrayList<>();
		// created this method because getting the offset values is a bit expansive as seen below
		Iterator<Hit<JsonData>> iterator = bibleBookHit.innerHits().values().iterator().next().hits().hits().iterator();
		while (iterator.hasNext()) {
			Hit<JsonData> hit = iterator.next();
			int chapterOffset = hit.nested().offset();
			int verseOffset = hit.nested().nested().offset();
			offsets.add(new ChapterVerseOffset(chapterOffset, verseOffset));
		}
		return offsets;
	}

	private ElasticsearchClient getElasticsearchClient() throws Exception {
		return elasticsearchClientRepository.getElasticsearchClient();
	}
}