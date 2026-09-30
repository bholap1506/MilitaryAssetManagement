
package com.bhola.backendmilitaryassetmanagement.repository;

import com.bhola.backendmilitaryassetmanagement.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    
}