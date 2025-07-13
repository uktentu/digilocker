package com.tentu.digilocker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity representing a document in the DigiLocker system.
 */
@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotBlank
    @Size(max = 255)
    private String filePath;

    @Column(name = "file_size")
    private Long fileSize;

    @NotBlank
    @Size(max = 50)
    private String fileType;

    @Size(max = 100)
    private String issuedBy;

    @Column(name = "issue_date")
    private LocalDateTime issueDate;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Column(name = "document_id")
    private String documentId;

    @Column(name = "is_verified")
    private boolean verified = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}