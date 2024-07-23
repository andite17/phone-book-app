package com.test.phone_book.repository;

import com.test.phone_book.dto.ContactResponse;
import com.test.phone_book.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    Optional<Contact> findByPhoneNumber(String number);

    @Query("FROM Contact WHERE favorite = true")
    List<Contact> findAllFavorite();
}
