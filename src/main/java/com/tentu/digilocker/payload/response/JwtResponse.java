package com.tentu.digilocker.payload.response;

import lombok.Data;

import java.util.List;

/**
 * DTO for JWT authentication response.
 */
@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String mobileNumber;
    private String fullName;
    private List<String> roles;
    private boolean emailVerified;
    private boolean mobileVerified;

    public JwtResponse(String token, Long id, String username, String email, 
                      String mobileNumber, String fullName, List<String> roles,
                      boolean emailVerified, boolean mobileVerified) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.fullName = fullName;
        this.roles = roles;
        this.emailVerified = emailVerified;
        this.mobileVerified = mobileVerified;
    }
}