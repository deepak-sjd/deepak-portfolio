package com.deepak.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI portfolioOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Deepak Portfolio API")
                        .description(
                                "REST API for Deepak's developer portfolio, " +
                                "including projects and contact messages."
                        )
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Deepak Kumar")
                                .url("https://github.com/deepak-sjd")
                        )
                        .license(new License()
                                .name("MIT")
                        )
                );
    }
}