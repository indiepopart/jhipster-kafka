package com.okta.developer.store.security.oauth2;

import com.okta.developer.store.security.SecurityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class JwtAuthorityExtractor extends JwtAuthenticationConverter {

    public JwtAuthorityExtractor() {
    }

    @Override
    protected Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
        return SecurityUtils.extractAuthorityFromClaims(jwt.getClaims());
    }
}
