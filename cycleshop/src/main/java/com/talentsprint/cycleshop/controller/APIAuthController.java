package com.talentsprint.cycleshop.controller;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentsprint.cycleshop.business.LoginBody;
import com.talentsprint.cycleshop.dto.TokenDTO;

import jakarta.annotation.Resource;

@RestController
@CrossOrigin()
@RequestMapping("/api/auth")
public class APIAuthController {
    
    @Autowired
    JwtEncoder jwtEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/token")
    public TokenDTO token(@RequestBody LoginBody loginBody) {
        Instant now = Instant.now();
        long expiry = 3600L;
        var username = loginBody.getUsername();
        var password = loginBody.getPassword();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        String scope = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("self")
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiry))
				.subject(authentication.getName())
				.claim("scope", scope)
				.build();
        TokenDTO t = new TokenDTO();
        t.setToken(this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue());
        t.setUsername(authentication.getName());
//        return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        return t;
    }
    
    @PostMapping("/tokenSet")
    public TokenDTO setToken(@RequestBody TokenDTO token) {
    	System.out.println("heyy");
    	TokenDTO tokenSet = new TokenDTO();
    	tokenSet.setToken(token.getToken());
    	tokenSet.setUsername(token.getUsername());
    	System.out.println("All set");
    	return tokenSet;
    }
}
