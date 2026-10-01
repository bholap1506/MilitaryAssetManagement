package com.bhola.backendmilitaryassetmanagement.controller;


import com.bhola.backendmilitaryassetmanagement.dto.PurchaseRequest;
import com.bhola.backendmilitaryassetmanagement.model.Purchase;
import com.bhola.backendmilitaryassetmanagement.service.PurchaseService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseService.getAllPurchases();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @PostMapping
    public Purchase createPurchase(@RequestBody PurchaseRequest request) {

        return purchaseService.createPurchase(request);
    }

}
