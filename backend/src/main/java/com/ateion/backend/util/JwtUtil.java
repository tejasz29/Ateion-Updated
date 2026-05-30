package com.ateion.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Generates a secure, randomized cryptographic key for our tokens
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    // Tokens will expire after 24 hours (in milliseconds)
    private final long EXPIRATION_TIME = 86400000; 

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }
}