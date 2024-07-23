package com.test.phone_book.service;

import com.test.phone_book.dto.ContactRequest;
import com.test.phone_book.dto.ContactResponse;
import com.test.phone_book.model.Contact;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ContactMapper {


    public Contact toContact(ContactRequest request) {
        return Contact.builder()
                .fullName(request.fullName())
                .phoneNumber(request.phoneNumber())
                .address(request.address())
                .email(request.email())
                .favorite(false)
                .build();
    }

    public ContactResponse toContactResponse(Contact contact) {
        return ContactResponse.builder()
                .fullName(contact.getFullName())
                .phoneNumber(contact.getPhoneNumber())
                .address(contact.getAddress())
                .email(contact.getEmail())
                .favorite(contact.isFavorite())
                .build();
    }

}
