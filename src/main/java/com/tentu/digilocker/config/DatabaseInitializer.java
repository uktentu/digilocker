package com.tentu.digilocker.config;

import com.tentu.digilocker.model.ERole;
import com.tentu.digilocker.model.Role;
import com.tentu.digilocker.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Database initializer to populate initial data.
 */
@Component
public class DatabaseInitializer implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepository;

    /**
     * Initialize database with roles.
     *
     * @param args command line arguments
     */
    @Override
    public void run(String... args) {
        initRoles();
    }

    /**
     * Initialize roles if they don't exist.
     */
    private void initRoles() {
        Arrays.stream(ERole.values()).forEach(role -> {
            if (roleRepository.findByName(role).isEmpty()) {
                Role newRole = new Role();
                newRole.setName(role);
                roleRepository.save(newRole);
            }
        });
    }
}