package com.deepak.portfolio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ============================================================
    // VALIDATION EXCEPTION
    // ============================================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception
    ) {

        Map<String, String> errors = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        ErrorResponse response = new ErrorResponse(
                Instant.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Validation Failed",
                "One or more fields contain invalid data.",
                errors
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    // ============================================================
    // RESOURCE NOT FOUND
    // ============================================================

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException exception
    ) {

        ErrorResponse response = new ErrorResponse(
                Instant.now(),
                HttpStatus.NOT_FOUND.value(),
                "Resource Not Found",
                exception.getMessage(),
                Map.of()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }


// ============================================================
// CONFLICT
// ============================================================

@ExceptionHandler(IllegalArgumentException.class)
public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
        IllegalArgumentException exception
) {

    ErrorResponse response = new ErrorResponse(
            Instant.now(),
            HttpStatus.CONFLICT.value(),
            "Conflict",
            exception.getMessage(),
            Map.of()
    );

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);
}

    // ============================================================
    // UNEXPECTED EXCEPTION
    // ============================================================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedException(
            Exception exception
    ) {

        ErrorResponse response = new ErrorResponse(
                Instant.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "An unexpected error occurred.",
                Map.of()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    // ============================================================
    // ERROR RESPONSE
    // ============================================================

    public record ErrorResponse(
            Instant timestamp,
            int status,
            String error,
            String message,
            Map<String, String> errors
    ) {
    }
}