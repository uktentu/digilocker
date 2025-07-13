package com.tentu.digilocker.repository;

import com.tentu.digilocker.model.ERole;
import com.tentu.digilocker.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Role entity.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Find role by name.
     *
     * @param name the role name
     * @return optional role
     */
    Optional<Role> findByName(ERole name);
}