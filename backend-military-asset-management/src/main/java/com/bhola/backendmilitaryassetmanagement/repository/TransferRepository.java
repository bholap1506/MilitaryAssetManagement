package com.bhola.backendmilitaryassetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bhola.backendmilitaryassetmanagement.model.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
    
}
