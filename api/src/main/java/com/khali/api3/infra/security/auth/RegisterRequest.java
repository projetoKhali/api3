package com.khali.api3.infra.security.auth;

import java.sql.Timestamp;

import com.khali.api3.domain.user.UserType;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String registration;
    private String name;
    // private UserType userType;
    private String email;
    private String password;
}
