package com.bhola.backendmilitaryassetmanagement.controller;


import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.service.EquipmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment-types")
public class EquipmentTypeController {

    @Autowired
    private EquipmentTypeService equipmentTypeService;

    @GetMapping
    public List<EquipmentType> getAllEquipmentTypes(){
        return equipmentTypeService.getAllEquipmentTypes();
    }

    @PostMapping
    public EquipmentType createEquipmentType(@RequestBody EquipmentType equipmentType){

        return equipmentTypeService.createEquipmentType(equipmentType);

    }
}
