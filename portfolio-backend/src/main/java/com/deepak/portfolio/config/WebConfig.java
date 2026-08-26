package com.deepak.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    /**
     * Exposes everything under app.file.upload-dir at /files/**, e.g.
     * a file stored at {uploadDir}/notes/abc.pdf becomes downloadable at
     * GET /files/notes/abc.pdf — matching NoteResource.url built in LocalFileStorageService.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + uploadDir.replaceAll("/$", "") + "/";

        registry.addResourceHandler("/files/**")
                .addResourceLocations(location);
    }
}
