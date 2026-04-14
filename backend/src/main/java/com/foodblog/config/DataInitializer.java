package com.foodblog.config;

import com.foodblog.entity.User;
import com.foodblog.enums.Role;
import com.foodblog.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if admin user exists
            String adminEmail = "admin@foodblog.com";
            if (!userRepository.existsByEmail(adminEmail)) {
                User admin = User.builder()
                        .name("System Admin")
                        .email(adminEmail)
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build();
                
                userRepository.save(admin);
                System.out.println("[DATA_INITIALIZER] Default admin user created: " + adminEmail);
            } else {
                System.out.println("[DATA_INITIALIZER] Admin user already exists.");
            }
        };
    }
}
