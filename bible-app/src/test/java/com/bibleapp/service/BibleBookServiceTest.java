package com.bibleapp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.bibleapp.domain.BibleBook;
import com.bibleapp.dto.BibleBookHitSearchResult;
import com.bibleapp.dto.BibleBookSearchResult;
import com.bibleapp.repository.BibleBookClientRepository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;

@ExtendWith(MockitoExtension.class)
class BibleBookServiceTest {

	@Mock
	private BibleBookClientRepository elasticsearchClientRepository;

	@InjectMocks
	private BibleBookService bibleBookService;

	@Test
	void getGenesisBook_1() throws Exception {
		when (elasticsearchClientRepository.getElasticsearchClient()).thenReturn(getClientSsl());
		BibleBook genesis = bibleBookService.findById("1");
		assertNotNull(genesis);
		assertTrue(genesis.getChapters().get(0).getVerses().get(0).getText().startsWith("In the beginning"));
	}

	@Test
	void getBibleBookSearchResults() throws Exception {
		boolean includeSource = false;
		String searchText = "Jesus";
		when (elasticsearchClientRepository.getElasticsearchClient()).thenReturn(getClientSsl());
		BibleBookSearchResult bibleBookSearchResult = bibleBookService.getBibleBookSearchResults(searchText, includeSource);
		List<BibleBookHitSearchResult> bibleBookHitSearchResults = bibleBookSearchResult.bibleBookHits();
		int nbrBooksJesusIsMentionedIn = 26;
		assertEquals(nbrBooksJesusIsMentionedIn, bibleBookHitSearchResults.size());
	}

	@Test
	void getBibleBookSearchResults_consolation() throws Exception {
		boolean includeSource = false;
		String searchText = "consolation";
		when (elasticsearchClientRepository.getElasticsearchClient()).thenReturn(getClientSsl());
		BibleBookSearchResult bibleBookSearchResult = bibleBookService.getBibleBookSearchResults(searchText, includeSource);
		List<BibleBookHitSearchResult> bibleBookHitSearchResults = bibleBookSearchResult.bibleBookHits();
		int nbrBooksTextIsMentionedIn = 11;
		assertEquals(nbrBooksTextIsMentionedIn, bibleBookHitSearchResults.size());
	}

	@Test
	void searchTheBible_variousMethods_consolation() throws Exception {
		boolean includeSource = true;
		String searchText = "consolation";
		String highlightKey = "chapters.verses.text";
		when (elasticsearchClientRepository.getElasticsearchClient()).thenReturn(getClientSsl());
		SearchResponse<BibleBook> searchResponse = bibleBookService.findByVerseText(searchText, includeSource);
		assertNotNull(searchResponse);
		List<Hit<BibleBook>> listHits = searchResponse.hits().hits();
		// use the first bible book with a hit
		Hit<BibleBook> bibleBookHit = listHits.get(0);

		// highlights for search
		Map<String, List<String>> highlight = bibleBookHit.highlight();
		List<String> highlights = highlight.get(highlightKey);
		assertTrue(highlights.get(0).contains("<em>consol"));

		// a source hit, the bible book the text is in
		BibleBook bibleBook = bibleBookHit.source();
		assertNotNull(bibleBook);

		// get the verses with hits
		List<String> versesThatHadHits = bibleBookService.getVerseTextsWithHits(bibleBookHit);
		if (includeSource) {
			String verseWithText = versesThatHadHits.get(0);
			// make sure it contains text (stemmed), without the highlight
			assertTrue(verseWithText.contains(" consola"));
		}


		BibleBookSearchResult bibleBookSearchResult = bibleBookService.processResponse(searchResponse, highlightKey);
		List<BibleBookHitSearchResult> bibleBookHitSearchResults = bibleBookSearchResult.bibleBookHits();
		Integer nbrBooksConsolationIsMentionedIn = 11;
		assertEquals(nbrBooksConsolationIsMentionedIn, bibleBookHitSearchResults.size());
		for (BibleBookHitSearchResult hit: bibleBookHitSearchResults) {
			for (String highlightHit:hit.highlights()) {
				assertTrue(highlightHit.contains("<em>consol"));
			}
		}
	}

	private ElasticsearchClient getClientSsl() throws Exception {
		String certName = "C:\\tools\\elastic\\elasticsearch-8.12.0\\config\\certs\\http_ca.crt";
		String userName = "elastic";
		String password = "4NYmsBkxQ11s_1x1diVN";
		String serverUrl = "https://localhost:9200";
		return new BibleBookClientRepository().getElasticsearchClient(certName, userName, password, serverUrl);
	}
}
