package com.test.phone_book.controller;

import com.test.phone_book.dto.ContactRequest;
import com.test.phone_book.dto.ContactResponse;
import com.test.phone_book.handler.ContactAlreadyExist;
import com.test.phone_book.handler.ContactNotFound;
import com.test.phone_book.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/contact")
public class ContactController {
    @Autowired
    private ContactService service;

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@RequestBody @Valid ContactRequest request) throws ContactAlreadyExist {
        return ResponseEntity.status(201).body(service.createContact(request));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ContactResponse>> search(
            @RequestParam String name,
            @RequestParam String number
    ) throws ContactNotFound {
        return ResponseEntity.ok(service.search(name, number));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> findById(@PathVariable String id) throws ContactNotFound {
        return ResponseEntity.ok(service.findByPhoneNumber(id));
    }

    @GetMapping
    public ResponseEntity<List<ContactResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PutMapping("/{phoneNumber}")
    public ResponseEntity<ContactResponse> updateContact(
            @PathVariable String phoneNumber,
            @RequestBody @Valid ContactRequest request
    ) throws ContactNotFound {
        return ResponseEntity.ok(service.updateContact(phoneNumber,request));
    }

    @DeleteMapping("/{phoneNumber}")
    public ResponseEntity<String> delete(@PathVariable String phoneNumber) throws ContactNotFound {
        service.delete(phoneNumber);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Contact deleted succesfully");
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<ContactResponse>> findAllFavorite() {
        return ResponseEntity.ok(service.findAllFavorite());
    }

    @PutMapping("{phoneNumber}/favorite")
    public ResponseEntity<ContactResponse> addToFavorite(@PathVariable String phoneNumber) throws ContactNotFound {
        return ResponseEntity.ok(service.addToFavorite(phoneNumber));
    }
}
