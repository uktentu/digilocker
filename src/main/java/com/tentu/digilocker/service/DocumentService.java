package com.tentu.digilocker.service;

import com.tentu.digilocker.model.Document;
import com.tentu.digilocker.model.User;
import com.tentu.digilocker.payload.dto.DocumentDTO;
import com.tentu.digilocker.repository.DocumentRepository;
import com.tentu.digilocker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for document operations.
 */
@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all documents for a user.
     *
     * @param userId the user ID
     * @return list of document DTOs
     */
    public List<DocumentDTO> getAllDocumentsByUserId(Long userId) {
        List<Document> documents = documentRepository.findByUserId(userId);
        return documents.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get document by ID for a user.
     *
     * @param id the document ID
     * @param userId the user ID
     * @return document DTO
     * @throws RuntimeException if document not found
     */
    public DocumentDTO getDocumentById(Long id, Long userId) {
        Document document = documentRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
        return convertToDTO(document);
    }

    /**
     * Create a new document.
     *
     * @param documentDTO the document DTO
     * @param userId the user ID
     * @return created document DTO
     */
    @Transactional
    public DocumentDTO createDocument(DocumentDTO documentDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        Document document = new Document();
        document.setName(documentDTO.getName());
        document.setDescription(documentDTO.getDescription());
        document.setFilePath(""); // Will be set by file upload service
        document.setFileSize(documentDTO.getFileSize());
        document.setFileType(documentDTO.getFileType());
        document.setIssuedBy(documentDTO.getIssuedBy());
        document.setIssueDate(documentDTO.getIssueDate());
        document.setExpiryDate(documentDTO.getExpiryDate());
        document.setDocumentId(documentDTO.getDocumentId());
        document.setVerified(false); // New documents are not verified by default
        document.setUser(user);

        Document savedDocument = documentRepository.save(document);
        return convertToDTO(savedDocument);
    }

    /**
     * Update an existing document.
     *
     * @param id the document ID
     * @param documentDTO the document DTO
     * @param userId the user ID
     * @return updated document DTO
     * @throws RuntimeException if document not found
     */
    @Transactional
    public DocumentDTO updateDocument(Long id, DocumentDTO documentDTO, Long userId) {
        Document document = documentRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));

        document.setName(documentDTO.getName());
        document.setDescription(documentDTO.getDescription());
        document.setFileSize(documentDTO.getFileSize());
        document.setFileType(documentDTO.getFileType());
        document.setIssuedBy(documentDTO.getIssuedBy());
        document.setIssueDate(documentDTO.getIssueDate());
        document.setExpiryDate(documentDTO.getExpiryDate());
        document.setDocumentId(documentDTO.getDocumentId());

        Document updatedDocument = documentRepository.save(document);
        return convertToDTO(updatedDocument);
    }

    /**
     * Delete a document.
     *
     * @param id the document ID
     * @param userId the user ID
     * @throws RuntimeException if document not found
     */
    @Transactional
    public void deleteDocument(Long id, Long userId) {
        Document document = documentRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
        documentRepository.delete(document);
    }

    /**
     * Verify a document.
     *
     * @param id the document ID
     * @param userId the user ID
     * @return verified document DTO
     * @throws RuntimeException if document not found
     */
    @Transactional
    public DocumentDTO verifyDocument(Long id, Long userId) {
        Document document = documentRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
        document.setVerified(true);
        Document verifiedDocument = documentRepository.save(document);
        return convertToDTO(verifiedDocument);
    }

    /**
     * Search documents by name.
     *
     * @param name the name to search for
     * @return list of document DTOs
     */
    public List<DocumentDTO> searchDocumentsByName(String name) {
        List<Document> documents = documentRepository.findByNameContainingIgnoreCase(name);
        return documents.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Document entity to DocumentDTO.
     *
     * @param document the document entity
     * @return document DTO
     */
    private DocumentDTO convertToDTO(Document document) {
        DocumentDTO dto = new DocumentDTO();
        dto.setId(document.getId());
        dto.setName(document.getName());
        dto.setDescription(document.getDescription());
        dto.setFileSize(document.getFileSize());
        dto.setFileType(document.getFileType());
        dto.setIssuedBy(document.getIssuedBy());
        dto.setIssueDate(document.getIssueDate());
        dto.setExpiryDate(document.getExpiryDate());
        dto.setDocumentId(document.getDocumentId());
        dto.setVerified(document.isVerified());
        dto.setUserId(document.getUser().getId());
        dto.setUserName(document.getUser().getUsername());
        dto.setCreatedAt(document.getCreatedAt());
        dto.setUpdatedAt(document.getUpdatedAt());
        return dto;
    }
}