package com.bhola.backendmilitaryassetmanagement.service;

import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.repository.EquipmentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentTypeService {

    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    public List<EquipmentType> getAllEquipmentTypes() {
        return equipmentTypeRepository.findAll();
    }

    public EquipmentType createEquipmentType(EquipmentType equipmentType) {
        return equipmentTypeRepository.save(equipmentType);
    }
}
