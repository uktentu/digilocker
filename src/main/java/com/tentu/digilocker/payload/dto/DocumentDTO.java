package com.tentu.digilocker.payload.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for document operations.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @Size(max = 255)
    private String description;
    
    private Long fileSize;
    
    @NotBlank
    @Size(max = 50)
    private String fileType;
    
    @Size(max = 100)
    private String issuedBy;
    
    private LocalDateTime issueDate;
    
    private LocalDateTime expiryDate;
    
    private String documentId;
    
    private boolean verified;
    
    private Long userId;
    
    private String userName;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}