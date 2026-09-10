package com.deepak.portfolio.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Central authorization policy for the whole API.
 *
 * <p>Design: everything is public-read except a short, explicit allow-list
 * of GET endpoints per resource; every write (POST/PUT/DELETE) and every
 * endpoint not on that allow-list defaults to requiring the admin API key.
 * This "deny unless explicitly allowed" ordering means a new endpoint added
 * later is protected by default, instead of silently public.
 *
 * <p>Two GET endpoints are deliberately treated as admin-only even though
 * they're reads: {@code GET /api/v1/contact} (returns everyone's private
 * contact-form submissions) and {@code GET /api/v1/services/admin} (already
 * documented as admin-only in {@code ServiceController} itself).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String adminApiKey;
    private final List<String> allowedOrigins;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;

    public SecurityConfig(
            @Value("${admin.api.key}") String adminApiKey,
            @Value("${app.cors.allowed-origins}") String allowedOriginsCsv,
            RestAuthenticationEntryPoint authenticationEntryPoint,
            RestAccessDeniedHandler accessDeniedHandler
    ) {
        this.adminApiKey = adminApiKey;
        this.allowedOrigins = Arrays.stream(allowedOriginsCsv.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .toList();
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Stateless token-per-request API — no cookies/sessions involved,
                // so CSRF protection (which defends session-based auth) doesn't apply.
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .authorizeHttpRequests(auth -> auth
                        // CORS preflight must never be challenged.
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Health checks for uptime monitoring / hosting platform probes.
                        .requestMatchers(HttpMethod.GET, "/actuator/health", "/actuator/health/**").permitAll()
                        .requestMatchers("/actuator/**").hasRole("ADMIN")

                        // Publicly downloadable files (resume PDF, note attachments).
                        .requestMatchers(HttpMethod.GET, "/files/**").permitAll()

                        // API documentation — not sensitive, useful to keep browsable.
                        .requestMatchers(HttpMethod.GET, "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()

                        // Public contact form submission.
                        .requestMatchers(HttpMethod.POST, "/api/v1/contact").permitAll()

                        // --- Admin-only reads (specific patterns first — order matters) ---
                        .requestMatchers(HttpMethod.GET, "/api/v1/services/admin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/contact", "/api/v1/contact/**").hasRole("ADMIN")

                        // --- Public reads, one resource at a time ---
                        .requestMatchers(HttpMethod.GET, "/api/v1/about").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/experiences/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/notes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/projects/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/resume").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/services", "/api/v1/services/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/skills/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/events/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/tasks/**").permitAll()

                        // Everything else under /api/** (every POST/PUT/DELETE, plus any
                        // GET not explicitly allow-listed above) requires the admin key.
                        .requestMatchers("/api/**").hasRole("ADMIN")

                        // Deny-by-default safety net for anything unmatched above.
                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        new ApiKeyAuthenticationFilter(adminApiKey),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(allowedOrigins);
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        source.registerCorsConfiguration("/files/**", configuration);
        return source;
    }
}
