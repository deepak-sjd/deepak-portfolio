package com.deepak.portfolio.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * Abstraction over "where files physically live". Today: local disk.
 * Later, if you deploy behind S3/Cloud Storage, write a new implementation
 * of this interface and nothing else in the app needs to change.
 */
public interface FileStorageService {

    /**
     * Stores the file and returns a StoredFile describing where it now lives.
     */
    StoredFile store(MultipartFile file, String subdirectory);

    /**
     * Loads a previously stored file for download by its stored (generated) file name.
     */
    Resource load(String subdirectory, String storedFileName);

    /**
     * Deletes a previously stored file. Safe to call even if the file no longer exists.
     */
    void delete(String subdirectory, String storedFileName);

    record StoredFile(
            String storedFileName,
            String originalFileName,
            String publicUrl,
            long sizeInBytes
    ) {
    }
}
