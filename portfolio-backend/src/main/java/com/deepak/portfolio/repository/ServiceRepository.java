package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByActiveTrueOrderByDisplayOrderAsc();

    Optional<Service> findBySlug(String slug);

    boolean existsBySlug(String slug);

    /**
     * Removes any service_projects join-table rows pointing at this project
     * ID. Call this before deleting a Project.
     *
     * <p>The Service -> relatedProjects relationship has no cascade or
     * orphan-removal configured (correctly — deleting a Project shouldn't
     * delete a Service), but that also means nothing cleans up the join
     * table automatically when a Project is deleted directly. A leftover
     * row there points at a project_id that no longer exists, and because
     * relatedProjects uses @OrderColumn, Hibernate materializes that as a
     * null element instead of skipping it — which is exactly what was
     * crashing GET /api/v1/services with a NullPointerException.
     */
    @Modifying
    @Query(value = "DELETE FROM service_projects WHERE project_id = :projectId", nativeQuery = true)
    void removeProjectFromAllServices(Long projectId);
}