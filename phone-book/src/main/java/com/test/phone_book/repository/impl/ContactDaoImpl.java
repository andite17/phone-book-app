package com.test.phone_book.repository.impl;

import com.test.phone_book.model.Contact;
import com.test.phone_book.repository.ContactDaoRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ContactDaoImpl implements ContactDaoRepository {
    @Autowired
    private EntityManager em;

    @Override
    public List<Contact> search(String name, String phoneNumber) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Contact> cq = cb.createQuery(Contact.class);

        Root<Contact> contact = cq.from(Contact.class);
        List<Predicate> predicates = new ArrayList<>();

        if(StringUtils.isNotBlank(name)){
            predicates.add(cb.like(cb.lower(contact.get("fullName")), "%" + name + "%"));
        }
        if(StringUtils.isNotBlank(phoneNumber)){
            predicates.add(cb.like(contact.get("phoneNumber"), "%" + phoneNumber + "%"));
        }
        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }
}
