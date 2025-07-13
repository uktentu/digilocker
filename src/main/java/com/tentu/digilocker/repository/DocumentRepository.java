package com.tentu.digilocker.repository;

import com.tentu.digilocker.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Document entity.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    /**
     * Find all documents by user ID.
     *
     * @param userId the user ID
     * @return list of documents
     */
    List<Document> findByUserId(Long userId);

    /**
     * Find document by ID and user ID.
     *
     * @param id the document ID
     * @param userId the user ID
     * @return optional document
     */
    Optional<Document> findByIdAndUserId(Long id, Long userId);

    /**
     * Find documents by document ID.
     *
     * @param documentId the document ID
     * @return list of documents
     */
    List<Document> findByDocumentId(String documentId);

    /**
     * Find documents by name containing the given string.
     *
     * @param name the name to search for
     * @return list of documents
     */
    List<Document> findByNameContainingIgnoreCase(String name);

    /**
     * Find documents by issued by containing the given string.
     *
     * @param issuedBy the issuer to search for
     * @return list of documents
     */
    List<Document> findByIssuedByContainingIgnoreCase(String issuedBy);

    /**
     * Find documents by verification status.
     *
     * @param verified the verification status
     * @return list of documents
     */
    List<Document> findByVerified(boolean verified);
}