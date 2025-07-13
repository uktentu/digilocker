package com.tentu.digilocker.repository;

import com.tentu.digilocker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Find user by username.
     *
     * @param username the username
     * @return optional user
     */
    Optional<User> findByUsername(String username);

    /**
     * Find user by email.
     *
     * @param email the email
     * @return optional user
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by mobile number.
     *
     * @param mobileNumber the mobile number
     * @return optional user
     */
    Optional<User> findByMobileNumber(String mobileNumber);

    /**
     * Check if user exists by username.
     *
     * @param username the username
     * @return true if exists, false otherwise
     */
    Boolean existsByUsername(String username);

    /**
     * Check if user exists by email.
     *
     * @param email the email
     * @return true if exists, false otherwise
     */
    Boolean existsByEmail(String email);

    /**
     * Check if user exists by mobile number.
     *
     * @param mobileNumber the mobile number
     * @return true if exists, false otherwise
     */
    Boolean existsByMobileNumber(String mobileNumber);
}