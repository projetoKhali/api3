package com.khali.api3.domain.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Cryptography {
    private static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // encripita a senha e retorna um hash
    public static String crypt(String password) {
        return encoder.encode(password);
    }

    // verifica se a senha é igual ao hash
    public static boolean checkPw(String password, String hash) {
        return encoder.matches(password, hash);
    }
}