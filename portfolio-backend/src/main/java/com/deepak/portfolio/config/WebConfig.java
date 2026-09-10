package com.deepak.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS used to be configured here too, but that duplicated (and could
 * silently conflict with) the CORS configuration Spring Security also needs
 * to see requests through. It now lives in one place:
 * {@code security.SecurityConfig#corsConfigurationSource()}.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + uploadDir.replaceAll("/$", "") + "/";

        registry.addResourceHandler("/files/**")
                .addResourceLocations(location);
    }
}