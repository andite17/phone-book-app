package com.test.phone_book.repository;

import com.test.phone_book.model.Contact;

import java.util.List;

public interface ContactDaoRepository {
    List<Contact> search(String name, String phoneNumber);
}
