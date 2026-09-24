package com.medassist.basic.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medassist.basic.config.SecurityConfig;
import com.medassist.basic.dto.LoginUser;
import com.medassist.basic.dto.RegisterUser;
import com.medassist.basic.model.User;
import com.medassist.basic.repository.UserRepository;
import com.medassist.basic.security.JwtUtility;


@RestController 
@RequestMapping("/api/auth")
public class AuthService {
    

    private final UserRepository userrepo;
    private final JwtUtility jwtutility;
    private final SecurityConfig securityConfig;
    private final PasswordEncoder passwordEncoder;

    AuthService(UserRepository userrepo,JwtUtility jwtutility,SecurityConfig securityConfig,PasswordEncoder passwordEncoder)
    {
        this.userrepo = userrepo;
        this.jwtutility = jwtutility;
        this.securityConfig = securityConfig;
        this.passwordEncoder=passwordEncoder;
    }

    @PostMapping("/login")
    public  boolean login(@RequestBody LoginUser luser)
    {
        String email = luser.getEmail();
        
        String password = luser.getPassword();
        
        Optional<User> op  = userrepo.findByEmail(email);
        System.out.println(email+"  "+password);
        if(op.isEmpty())
        {
            return false;
        }

        User user = op.get();
        boolean res = passwordEncoder.matches(password, user.getPassword());
        return res;
    }
    @PostMapping("/register")
    public boolean  register(@RequestBody RegisterUser ruser)
    {
        if(ruser.getName()==null || ruser.getEmail()==null || ruser.getPassword() == null)
        {

            return false;
        }

        User user = new User();
        user.setName(ruser.getName());
        user.setEmail(ruser.getEmail());
        user.setPassword(passwordEncoder.encode( ruser.getPassword()));
        userrepo.save(user);
        return true;
    }
}
