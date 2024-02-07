package com.bibleapp.domain;

import java.io.Serializable;
import java.util.List;

public class BibleBook implements Serializable {
	private static final long serialVersionUID = 7302034101872351840L;
	private String id;
	private String book;
	private List<Chapter> chapters;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public List<Chapter> getChapters() {
		return chapters;
	}
	public void setChapters(List<Chapter> chapters) {
		this.chapters = chapters;
	}
}
