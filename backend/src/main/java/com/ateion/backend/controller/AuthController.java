package com.ateion.backend.controller;

import com.ateion.backend.dto.LoginRequestDTO;
import com.ateion.backend.dto.SignUpRequestDTO;
import com.ateion.backend.entity.User;
import com.ateion.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// FIXED: Added Map and HashMap imports for JSON conversion!
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    // 1. Handles the Sign Up Modal
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequest) {
        
        // Check if the email is already in the database
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Email is already registered!");
        }

        // Create the new user
        User newUser = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(signUpRequest.getPassword()) // Note: We will encrypt this later!
                .ageSegment(signUpRequest.getAgeSegment()) 
                .build();

        // Save to Supabase
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    // 2. Handles the Log In Modal
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        
        // Find the user by their email
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            
            // Check if the password matches
            if (user.getPassword().equals(loginRequest.getPassword())) {
                
                // FIXED: Create a JSON object to send back to the React frontend!
                Map<String, Object> userData = new HashMap<>();
                userData.put("fullName", user.getFullName());
                userData.put("email", user.getEmail());
                userData.put("ageSegment", user.getAgeSegment()); // Sends the segment to the Playground!
                
                return ResponseEntity.ok(userData);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Incorrect password!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found!");
        }
    }
}