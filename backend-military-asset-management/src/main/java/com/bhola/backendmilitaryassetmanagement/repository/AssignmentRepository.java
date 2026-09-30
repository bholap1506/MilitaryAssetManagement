package com.bhola.backendmilitaryassetmanagement.repository;

import com.bhola.backendmilitaryassetmanagement.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}