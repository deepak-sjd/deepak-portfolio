package com.deepak.portfolio.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * Represents the single admin principal once a valid API key has been
 * presented. There is no separate user record — the "principal" is just a
 * fixed label, since {@link ApiKeyAuthenticationFilter} only ever creates
 * this token after already verifying the shared secret.
 */
public class ApiKeyAuthenticationToken extends AbstractAuthenticationToken {

    private static final String PRINCIPAL = "admin";

    public ApiKeyAuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
    }

    @Override
    public Object getCredentials() {
        // The key itself is never retained after verification.
        return "";
    }

    @Override
    public Object getPrincipal() {
        return PRINCIPAL;
    }
}
