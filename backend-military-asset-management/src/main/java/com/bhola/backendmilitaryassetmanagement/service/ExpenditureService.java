package com.bhola.backendmilitaryassetmanagement.service;

import com.bhola.backendmilitaryassetmanagement.dto.ExpenditureRequest;
import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.model.Expenditure;
import com.bhola.backendmilitaryassetmanagement.repository.BaseRepository;
import com.bhola.backendmilitaryassetmanagement.repository.EquipmentTypeRepository;
import com.bhola.backendmilitaryassetmanagement.repository.ExpenditureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenditureService {

    @Autowired
    private ExpenditureRepository expenditureRepository;

    @Autowired
    private BaseRepository baseRepository;

    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;

    public Expenditure createExpenditure(ExpenditureRequest request) {

        Base base = baseRepository
                .findById(request.getBaseId())
                .orElseThrow(() -> new RuntimeException("Base not found"));

        EquipmentType equipmentType = equipmentTypeRepository
                .findById(request.getEquipmentTypeId())
                .orElseThrow(() -> new RuntimeException("Equipment Type not found"));


        Expenditure expenditure = new Expenditure();

        expenditure.setBase(base);
        expenditure.setEquipmentType(equipmentType);
        expenditure.setQuantity(request.getQuantity());
        expenditure.setExpendedAt(request.getExpendedAt());

        return expenditureRepository.save(expenditure);
    }

    public List<Expenditure> getAllExpenditures() {

        return expenditureRepository.findAll();
    }
}
