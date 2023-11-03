
package com.khali.api3.domain.user;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Cryptography {
    
    public static String hash(String input) {
        try {
            // Crie uma instância do MessageDigest com o algoritmo MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // Converta a entrada em bytes
            byte[] bytes = input.getBytes();

            // Calcule o hash MD5
            byte[] digest = md.digest(bytes);

            // Converta o hash em uma representação hexadecimal
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }

            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        String input = "123456";
        String hash = Cryptography.hash(input);
        System.out.println(hash);
    }
}
