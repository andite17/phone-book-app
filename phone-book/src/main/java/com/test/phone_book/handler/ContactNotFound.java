package com.test.phone_book.handler;

public class ContactNotFound extends Exception {
    public ContactNotFound(String message) {
        super(message);
    }
}
