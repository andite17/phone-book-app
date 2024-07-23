package com.test.phone_book.service;

import com.test.phone_book.dto.ContactRequest;
import com.test.phone_book.dto.ContactResponse;
import com.test.phone_book.handler.ContactAlreadyExist;
import com.test.phone_book.model.Contact;
import com.test.phone_book.handler.ContactNotFound;
import com.test.phone_book.repository.ContactDaoRepository;
import com.test.phone_book.repository.ContactRepository;
import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ContactService {
    @Autowired
    private ContactRepository repository;
    @Autowired
    private ContactDaoRepository daoRepository;
    @Autowired
    private ContactMapper mapper;

    public ContactResponse createContact(ContactRequest request) throws ContactAlreadyExist {
        var contact = repository.findByPhoneNumber(request.phoneNumber());
        if(contact.isPresent()) {
            throw new ContactAlreadyExist("Contact with number %s already exist".formatted(request.phoneNumber()));
        }

        Contact result = repository.save(mapper.toContact(request));
        return mapper.toContactResponse(result);
    }

    public ContactResponse findByPhoneNumber(String id) throws ContactNotFound {
        Contact contact = repository.findByPhoneNumber(id)
                .orElseThrow(()->new ContactNotFound("Contact with Phone Number::%s Not Found".formatted(id)));

        return mapper.toContactResponse(contact);
    }

    public List<ContactResponse> findAll() {
        return repository.findAll(Sort.by("fullName").ascending())
                .stream()
                .map(mapper::toContactResponse)
                .toList();
    }

    public void delete(String phoneNumber) throws ContactNotFound {
        Contact contact = repository.findByPhoneNumber(phoneNumber)
                .orElseThrow(()->new ContactNotFound("Contact with Phone Number::%s Not Found".formatted(phoneNumber)));
        repository.delete(contact);
    }

    public ContactResponse updateContact(String phoneNumber,ContactRequest request) throws ContactNotFound {
        var contact = repository.findByPhoneNumber(phoneNumber)
                .orElseThrow(()-> new ContactNotFound("Contact with number::%s Not Found".formatted(phoneNumber)));

        Contact result = repository.save(mergeContact(contact, request));

        return mapper.toContactResponse(result);
    }

    public List<ContactResponse> search(String name, String number) {
        List<Contact> contacts= daoRepository.search(name.toLowerCase(),number);
        return contacts.stream()
                .map(mapper::toContactResponse)
                .toList();
    }

    public ContactResponse addToFavorite(String phoneNumber) throws ContactNotFound {
        var contact = repository.findByPhoneNumber(phoneNumber)
                .orElseThrow(()-> new ContactNotFound("Contact with number::%s Not Found".formatted(phoneNumber)));

        contact.setFavorite(true);
        Contact result = repository.save(contact);
        return mapper.toContactResponse(result);
    }

    public List<ContactResponse> findAllFavorite() {
        List<Contact> contacts = repository.findAllFavorite();

        return contacts.stream()
                .map(mapper::toContactResponse)
                .toList();
    }

    public Contact mergeContact(Contact contact, ContactRequest request) {
        if(StringUtils.isNotBlank(request.fullName())) {
            contact.setFullName(request.fullName());
        }
        if(StringUtils.isNotBlank(request.phoneNumber())) {
            contact.setPhoneNumber(request.phoneNumber());
        }
        if(StringUtils.isNotBlank(request.address())) {
            contact.setAddress(request.address());
        }
        if(StringUtils.isNotBlank(request.email())) {
            contact.setEmail(request.email());
        }
        if(request.favorite() != contact.isFavorite()) {
            contact.setFavorite(request.favorite());
        }
        return contact;
    }

}
