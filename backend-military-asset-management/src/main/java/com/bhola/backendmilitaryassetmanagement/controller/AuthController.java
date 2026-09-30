package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.dto.LoginRequest;
import com.bhola.backendmilitaryassetmanagement.dto.LoginResponse;
import com.bhola.backendmilitaryassetmanagement.model.User;
import com.bhola.backendmilitaryassetmanagement.repository.UserRepository;
import com.bhola.backendmilitaryassetmanagement.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow();

        String token = jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        user.getUsername(),
                        user.getRole().name()
                )
        );
    }
}