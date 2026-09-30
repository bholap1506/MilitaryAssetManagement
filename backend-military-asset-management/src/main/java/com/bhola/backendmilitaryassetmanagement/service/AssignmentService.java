package com.bhola.backendmilitaryassetmanagement.service;

import com.bhola.backendmilitaryassetmanagement.dto.AssignmentRequest;
import com.bhola.backendmilitaryassetmanagement.model.Assignment;
import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.repository.EquipmentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bhola.backendmilitaryassetmanagement.repository.AssignmentRepository;
import com.bhola.backendmilitaryassetmanagement.repository.BaseRepository;


import java.util.List;

@Service 
public class AssignmentService {

    @Autowired 
    private AssignmentRepository assignmentRepository;

    @Autowired 
    private BaseRepository baseRepository;

    @Autowired
    private EquipmentTypeRepository  equipmentTypeRepository;

    public Assignment createAssignment(AssignmentRequest request) {

        Base base = baseRepository
                .findById(request.getBaseId())
                .orElseThrow(() -> new RuntimeException("Base not found"));

        EquipmentType equipmentType = equipmentTypeRepository
                .findById(request.getEquipmentTypeId())
                .orElseThrow(() -> new RuntimeException("Equipment Type not found"));


        Assignment assignment = new Assignment();

        assignment.setBase(base);
        assignment.setEquipmentType(equipmentType);
        assignment.setPersonnelName(request.getPersonnelName());
        assignment.setQuantity(request.getQuantity());
        assignment.setAssignedAt(request.getAssignedAt());


        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments(){
        return assignmentRepository.findAll();
    }
    
}
