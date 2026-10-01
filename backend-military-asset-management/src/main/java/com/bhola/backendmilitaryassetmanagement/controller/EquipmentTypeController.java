package com.bhola.backendmilitaryassetmanagement.controller;


import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.service.EquipmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment-types")
public class EquipmentTypeController {

    @Autowired
    private EquipmentTypeService equipmentTypeService;

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @GetMapping
    public List<EquipmentType> getAllEquipmentTypes(){
        return equipmentTypeService.getAllEquipmentTypes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public EquipmentType createEquipmentType(@RequestBody EquipmentType equipmentType){

        return equipmentTypeService.createEquipmentType(equipmentType);

    }
}
