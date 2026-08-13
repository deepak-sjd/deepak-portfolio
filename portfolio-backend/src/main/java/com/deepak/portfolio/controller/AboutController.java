package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.AboutRequest;
import com.deepak.portfolio.dto.response.AboutResponse;
import com.deepak.portfolio.service.AboutService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/about")
public class AboutController {

    private final AboutService aboutService;

    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    // ============================================================
    // GET ABOUT
    // ============================================================

    @GetMapping
    public AboutResponse getAbout() {
        return aboutService.getAbout();
    }

    // ============================================================
    // CREATE ABOUT
    // ============================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AboutResponse createAbout(
            @Valid @RequestBody AboutRequest request
    ) {
        return aboutService.createAbout(request);
    }

    // ============================================================
    // UPDATE ABOUT
    // ============================================================

    @PutMapping("/{id}")
    public AboutResponse updateAbout(
            @PathVariable Long id,
            @Valid @RequestBody AboutRequest request
    ) {
        return aboutService.updateAbout(id, request);
    }
}