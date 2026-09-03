package com.deepak.portfolio.exception;

public class DuplicateSlugException extends RuntimeException {
    public DuplicateSlugException(String slug) {
        super("A note with slug '" + slug + "' already exists");
    }
}