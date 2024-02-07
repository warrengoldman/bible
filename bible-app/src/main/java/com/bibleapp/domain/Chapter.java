package com.bibleapp.domain;

import java.io.Serializable;
import java.util.List;

public class Chapter implements Serializable {
	private static final long serialVersionUID = 7812604598985095180L;
	private int chapter;
	private List<Verse> verses;
	public int getChapter() {
		return chapter;
	}
	public void setChapter(int chapter) {
		this.chapter = chapter;
	}
	public List<Verse> getVerses() {
		return verses;
	}
	public void setVerses(List<Verse> verses) {
		this.verses = verses;
	}
}