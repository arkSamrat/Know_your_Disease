package com.medassist.basic.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController
{
    
    

    @GetMapping("/api/auth/login")
    public static void login()
    {
        
    }
}