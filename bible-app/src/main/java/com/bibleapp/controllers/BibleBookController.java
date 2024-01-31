package com.bibleapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bibleapp.dto.BibleBookSearchRequest;
import com.bibleapp.dto.BibleBookSearchResult;
import com.bibleapp.service.BibleBookService;

@RestController
@RequestMapping("biblebook")
public class BibleBookController {

	@Autowired
	private BibleBookService bibleBookService;

	@PostMapping("search")
	public BibleBookSearchResult searchBible(@RequestBody BibleBookSearchRequest bibleBookSearchRequest) {
		try {
			return bibleBookService.getBibleBookSearchResults(bibleBookSearchRequest.query(), bibleBookSearchRequest.includeSource());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
