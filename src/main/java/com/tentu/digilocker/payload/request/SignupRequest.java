package com.tentu.digilocker.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

/**
 * DTO for user registration requests.
 */
@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 10, max = 15)
    private String mobileNumber;

    @NotBlank
    @Size(max = 100)
    private String fullName;

    @Size(min = 12, max = 12)
    private String aadhaarNumber;

    private Set<String> roles;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}