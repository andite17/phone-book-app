package com.test.phone_book.handler;

public class ContactAlreadyExist extends Exception{
    public ContactAlreadyExist(String message) {
        super(message);
    }
}
