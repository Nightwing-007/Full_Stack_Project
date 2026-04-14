package com.foodblog.dto;

import com.foodblog.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {
    private String token;
    private Long id;
    private String name;
    private String email;
    private Role role;
}
