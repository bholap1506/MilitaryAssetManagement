package com.bhola.backendmilitaryassetmanagement.service;

import com.bhola.backendmilitaryassetmanagement.dto.PurchaseRequest;
import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.model.Purchase;
import com.bhola.backendmilitaryassetmanagement.repository.BaseRepository;
import com.bhola.backendmilitaryassetmanagement.repository.EquipmentTypeRepository;
import com.bhola.backendmilitaryassetmanagement.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final BaseRepository baseRepository;
    private final EquipmentTypeRepository equipmentTypeRepository;

    public PurchaseService(
            PurchaseRepository purchaseRepository,
            BaseRepository baseRepository,
            EquipmentTypeRepository equipmentTypeRepository)
    {

        this.purchaseRepository = purchaseRepository;
        this.baseRepository = baseRepository;
        this.equipmentTypeRepository = equipmentTypeRepository;
    }

    public Purchase createPurchase(PurchaseRequest request) {

        Base base = baseRepository.findById(request.getBaseId())
                .orElseThrow(() -> new RuntimeException("Base not found"));

        EquipmentType equipmentType = equipmentTypeRepository.findById(request.getEquipmentTypeId())
                .orElseThrow(() -> new  RuntimeException("Equipment Type not found"));

        Purchase purchase = new Purchase();

        purchase.setBase(base);
        purchase.setEquipmentType(equipmentType);
        purchase.setQuantity(request.getQuantity());
        purchase.setPurchaseDate(request.getPurchaseDate());

        return purchaseRepository.save(purchase);

    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }
}
