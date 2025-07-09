package com.tentu.digilocker.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO for general message responses.
 */
@Data
@AllArgsConstructor
public class MessageResponse {
    private String message;
    private boolean success;
    
    public MessageResponse(String message) {
        this.message = message;
        this.success = true;
    }
}