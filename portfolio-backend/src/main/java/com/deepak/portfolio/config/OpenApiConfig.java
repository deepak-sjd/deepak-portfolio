package com.deepak.portfolio.config;

import com.deepak.portfolio.security.ApiKeyAuthenticationFilter;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    private static final String ADMIN_API_KEY_SCHEME = "adminApiKey";

    @Bean
    public OpenAPI portfolioOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Deepak Portfolio API")
                        .description(
                                "Production REST API for Deepak Kumar's professional portfolio, "
                                + "including projects, experience, skills, notes, about information, "
                                + "resume, professional services, and contact messages. "
                                + "Write operations and a few admin-only reads require the "
                                + ApiKeyAuthenticationFilter.HEADER_NAME + " header — click Authorize below to set it."
                        )
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Deepak Kumar")
                                .url("https://github.com/deepak-sjd")
                        )
                        .license(new License()
                                .name("MIT")
                        )
                )
                // Lets Swagger UI send the admin key on "Try it out" calls via
                // the Authorize button, instead of needing an external client.
                .components(new Components()
                        .addSecuritySchemes(ADMIN_API_KEY_SCHEME, new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .name(ApiKeyAuthenticationFilter.HEADER_NAME)
                        )
                )
                .addSecurityItem(new SecurityRequirement().addList(ADMIN_API_KEY_SCHEME));
    }
}