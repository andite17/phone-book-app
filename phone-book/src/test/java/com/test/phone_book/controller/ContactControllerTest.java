package com.test.phone_book.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.phone_book.dto.ContactRequest;
import com.test.phone_book.dto.ContactResponse;
import com.test.phone_book.model.Contact;
import com.test.phone_book.repository.ContactRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest  {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ContactRepository repository;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(){
        repository.deleteAll();
    }

    @Test
    void testCreateContactSuccess() throws Exception {
        ContactRequest request = new ContactRequest("Budi Aryo", "0857123123123", "budi@mail.com", "Jl gamelan raya", false);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/phonebook")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        ).andExpectAll(
                MockMvcResultMatchers.status().isCreated()
        ).andDo(result ->{
            ContactResponse response = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<ContactResponse>() {
            });

            assertEquals("Budi Aryo", response.fullName);
            assertEquals("0857123123123", response.phoneNumber);
            assertEquals("budi@mail.com", response.email);
            assertEquals("Jl gamelan raya", response.address);
            assertFalse(false, String.valueOf(response.favorite));
        });
    }

    @Test
    void testCreateContactFailed() throws Exception {
        ContactRequest request = new ContactRequest("", "", "budi@mail.com", "Jl gamelan raya", false);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/phonebook")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        ).andExpectAll(
                MockMvcResultMatchers.status().isBadRequest()
        );
    }

    @Test
    void testCreateContactDuplicate() throws Exception {
        Contact oldRequest = new Contact(1,"test", "123123123", "test@mail.com", "Jl test", false);
        repository.save(oldRequest);

        ContactRequest newRequest = new ContactRequest("test", "123123123", "test@mail.com", "Jl test", false);


        mockMvc.perform(
                MockMvcRequestBuilders.post("/phonebook")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newRequest))
        ).andExpectAll(
                MockMvcResultMatchers.status().isBadRequest()
        );
    }
}