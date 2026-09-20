package com.deepak.portfolio;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioBackendApplication {

    private static final Logger log = LoggerFactory.getLogger(PortfolioBackendApplication.class);

    public static void main(String[] args) {
        runFlywayManually();
        SpringApplication.run(PortfolioBackendApplication.class, args);
    }

    private static void runFlywayManually() {
        String url = System.getenv().getOrDefault("DB_URL", "jdbc:postgresql://localhost:5432/portfolio");
        String user = System.getenv().getOrDefault("DB_USERNAME", "postgres");
        String password = System.getenv("DB_PASSWORD");

        log.info("Running Flyway migrations manually against {}", url);

        Flyway.configure()
                .dataSource(url, user, password)
                .baselineOnMigrate(false)
                .load()
                .migrate();

        log.info("Flyway migrations complete.");
    }
}