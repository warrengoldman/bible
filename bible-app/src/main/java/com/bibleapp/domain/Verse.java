package com.bibleapp.domain;

import java.io.Serializable;

public class Verse implements Serializable {
	private static final long serialVersionUID = -5742319165698283277L;
	private int verse;
	private String text;

	public int getVerse() {
		return verse;
	}
	public void setVerse(int verse) {
		this.verse = verse;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
}
