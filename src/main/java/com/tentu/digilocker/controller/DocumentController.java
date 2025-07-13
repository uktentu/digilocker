package com.tentu.digilocker.controller;

import com.tentu.digilocker.payload.dto.DocumentDTO;
import com.tentu.digilocker.payload.response.MessageResponse;
import com.tentu.digilocker.security.services.UserDetailsImpl;
import com.tentu.digilocker.service.DocumentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for document operations.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    /**
     * Get all documents for the authenticated user.
     *
     * @param userDetails the authenticated user details
     * @return list of document DTOs
     */
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<DocumentDTO>> getAllDocuments(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<DocumentDTO> documents = documentService.getAllDocumentsByUserId(userDetails.getId());
        return ResponseEntity.ok(documents);
    }

    /**
     * Get document by ID for the authenticated user.
     *
     * @param id the document ID
     * @param userDetails the authenticated user details
     * @return document DTO
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long id, 
                                                      @AuthenticationPrincipal UserDetailsImpl userDetails) {
        DocumentDTO document = documentService.getDocumentById(id, userDetails.getId());
        return ResponseEntity.ok(document);
    }

    /**
     * Create a new document.
     *
     * @param documentDTO the document DTO
     * @param userDetails the authenticated user details
     * @return created document DTO
     */
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<DocumentDTO> createDocument(@Valid @RequestBody DocumentDTO documentDTO,
                                                     @AuthenticationPrincipal UserDetailsImpl userDetails) {
        DocumentDTO createdDocument = documentService.createDocument(documentDTO, userDetails.getId());
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }

    /**
     * Update an existing document.
     *
     * @param id the document ID
     * @param documentDTO the document DTO
     * @param userDetails the authenticated user details
     * @return updated document DTO
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<DocumentDTO> updateDocument(@PathVariable Long id,
                                                     @Valid @RequestBody DocumentDTO documentDTO,
                                                     @AuthenticationPrincipal UserDetailsImpl userDetails) {
        DocumentDTO updatedDocument = documentService.updateDocument(id, documentDTO, userDetails.getId());
        return ResponseEntity.ok(updatedDocument);
    }

    /**
     * Delete a document.
     *
     * @param id the document ID
     * @param userDetails the authenticated user details
     * @return message response
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteDocument(@PathVariable Long id,
                                                         @AuthenticationPrincipal UserDetailsImpl userDetails) {
        documentService.deleteDocument(id, userDetails.getId());
        return ResponseEntity.ok(new MessageResponse("Document deleted successfully"));
    }

    /**
     * Verify a document.
     *
     * @param id the document ID
     * @param userDetails the authenticated user details
     * @return verified document DTO
     */
    @PutMapping("/{id}/verify")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<DocumentDTO> verifyDocument(@PathVariable Long id,
                                                     @AuthenticationPrincipal UserDetailsImpl userDetails) {
        DocumentDTO verifiedDocument = documentService.verifyDocument(id, userDetails.getId());
        return ResponseEntity.ok(verifiedDocument);
    }

    /**
     * Search documents by name.
     *
     * @param name the name to search for
     * @return list of document DTOs
     */
    @GetMapping("/search")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<DocumentDTO>> searchDocumentsByName(@RequestParam String name) {
        List<DocumentDTO> documents = documentService.searchDocumentsByName(name);
        return ResponseEntity.ok(documents);
    }

    /**
     * Get all unverified documents.
     * Only accessible by moderators and admins.
     *
     * @return list of unverified document DTOs
     */
    @GetMapping("/unverified")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<DocumentDTO>> getUnverifiedDocuments() {
        List<DocumentDTO> documents = documentService.getUnverifiedDocuments();
        return ResponseEntity.ok(documents);
    }

    /**
     * Reject a document.
     * Only accessible by moderators and admins.
     *
     * @param id the document ID
     * @param userDetails the authenticated user details
     * @return message response
     */
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> rejectDocument(@PathVariable Long id,
                                                        @AuthenticationPrincipal UserDetailsImpl userDetails) {
        documentService.rejectDocument(id, userDetails.getId());
        return ResponseEntity.ok(new MessageResponse("Document rejected successfully"));
    }
}
