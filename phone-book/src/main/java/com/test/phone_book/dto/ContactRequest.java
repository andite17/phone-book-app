package com.test.phone_book.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ContactRequest(
        @NotBlank(message = "fullName field is mandatory")
        String fullName,

        @NotBlank(message = "phoneNumber field is mandatory")
        String phoneNumber,
        String email,
        String address,
        boolean favorite
) {
}
