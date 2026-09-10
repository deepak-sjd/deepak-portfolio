package com.deepak.portfolio.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;

/**
 * Single-admin API key authentication.
 *
 * <p>This portfolio backend has exactly one privileged caller (its own owner,
 * managing content via direct API calls / future admin tooling) — there is no
 * user database, no login flow, and no session. A shared secret sent via the
 * {@value #HEADER_NAME} header is therefore a deliberately simple and
 * appropriate mechanism: it is easy to rotate (change the env var), easy to
 * reason about, and does not require building out a full identity system for
 * a single principal.
 *
 * <p>If the header is missing or does not match, the request simply continues
 * as anonymous — {@link SecurityConfig} is what actually rejects the request
 * (with a clean 401/403 JSON body) if the target endpoint requires the
 * {@code ADMIN} role. This filter only ever grants an authority; it never
 * denies a request itself.
 */
public class ApiKeyAuthenticationFilter extends OncePerRequestFilter {

    public static final String HEADER_NAME = "X-Admin-Api-Key";

    private final String expectedApiKey;

    public ApiKeyAuthenticationFilter(String expectedApiKey) {
        this.expectedApiKey = expectedApiKey;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String providedKey = request.getHeader(HEADER_NAME);

        if (providedKey != null && matches(providedKey, expectedApiKey)) {
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));

            AbstractAuthenticationToken authentication = new ApiKeyAuthenticationToken(authorities);
            authentication.setAuthenticated(true);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Constant-time comparison so response timing can't be used to guess the
     * key one byte at a time.
     */
    private boolean matches(String provided, String expected) {
        if (expected == null || expected.isBlank()) {
            return false;
        }
        byte[] providedBytes = provided.getBytes(StandardCharsets.UTF_8);
        byte[] expectedBytes = expected.getBytes(StandardCharsets.UTF_8);
        return MessageDigest.isEqual(providedBytes, expectedBytes);
    }
}
