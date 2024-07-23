package com.test.phone_book.dto;

import lombok.Builder;

@Builder
public class ContactResponse {
    public String fullName;
    public String phoneNumber;
    public String email;
    public String address;
    public boolean favorite;
}
