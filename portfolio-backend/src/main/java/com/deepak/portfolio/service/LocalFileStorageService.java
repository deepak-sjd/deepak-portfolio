package com.deepak.portfolio.service;

import com.deepak.portfolio.exception.FileStorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    /** Absolute or relative path on disk where files are stored, e.g. "./uploads" */
    @Value("${app.file.upload-dir}")
    private String uploadDir;

    /** Public URL prefix these files are served under, e.g. "/files" (see WebConfig) */
    @Value("${app.file.public-base-url}")
    private String publicBaseUrl;

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            "pdf", "doc", "docx", "png", "jpg", "jpeg", "webp", "gif"
    );

    private static final long MAX_FILE_SIZE_BYTES = 25L * 1024 * 1024; // 25 MB

    @Override
    public StoredFile store(MultipartFile file, String subdirectory) {
        validate(file);

        String originalFileName = StringUtils.cleanPath(
                file.getOriginalFilename() != null ? file.getOriginalFilename() : "file"
        );
        String extension = getExtension(originalFileName);
        String storedFileName = UUID.randomUUID() + "." + extension;

        try {
            Path targetDir = Path.of(uploadDir, subdirectory).toAbsolutePath().normalize();
            Files.createDirectories(targetDir);

            Path targetPath = targetDir.resolve(storedFileName).normalize();

            // Defense-in-depth: ensure we never write outside the intended directory.
            if (!targetPath.getParent().equals(targetDir)) {
                throw new FileStorageException("Invalid file path");
            }

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            String publicUrl = publicBaseUrl + "/" + subdirectory + "/" + storedFileName;

            return new StoredFile(storedFileName, originalFileName, publicUrl, file.getSize());
        } catch (IOException ex) {
            throw new FileStorageException("Failed to store file: " + originalFileName, ex);
        }
    }

    @Override
    public Resource load(String subdirectory, String storedFileName) {
        try {
            Path filePath = Path.of(uploadDir, subdirectory)
                    .resolve(storedFileName)
                    .normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new FileStorageException("File not found: " + storedFileName);
            }
            return resource;
        } catch (MalformedURLException ex) {
            throw new FileStorageException("Invalid file reference: " + storedFileName, ex);
        }
    }

    @Override
    public void delete(String subdirectory, String storedFileName) {
        try {
            Path filePath = Path.of(uploadDir, subdirectory).resolve(storedFileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new FileStorageException("Failed to delete file: " + storedFileName, ex);
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileStorageException("Uploaded file is empty");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new FileStorageException("File exceeds the 25MB size limit");
        }

        String extension = getExtension(
                StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "")
        );

        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new FileStorageException(
                    "Unsupported file type '." + extension + "'. Allowed: " + List.copyOf(ALLOWED_EXTENSIONS)
            );
        }
    }

    private String getExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex == -1 || dotIndex == fileName.length() - 1) {
            throw new FileStorageException("File must have a valid extension");
        }
        return fileName.substring(dotIndex + 1);
    }
}
