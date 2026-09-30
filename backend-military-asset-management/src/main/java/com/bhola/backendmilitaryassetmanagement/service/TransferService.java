package com.bhola.backendmilitaryassetmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bhola.backendmilitaryassetmanagement.dto.TransferRequest;
import com.bhola.backendmilitaryassetmanagement.model.Transfer;
import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.model.EquipmentType;
import com.bhola.backendmilitaryassetmanagement.repository.BaseRepository;
import com.bhola.backendmilitaryassetmanagement.repository.EquipmentTypeRepository;
import com.bhola.backendmilitaryassetmanagement.repository.TransferRepository;

@Service 
public class TransferService {

    @Autowired 
    private TransferRepository transferRepository;

    @Autowired 
    private BaseRepository baseRepository;

    @Autowired 
    private EquipmentTypeRepository equipmentTypeRepository;

    public Transfer createTransfer(TransferRequest request) {
        
        Base fromBase = baseRepository.findById(request.getFromBaseId())
                            .orElseThrow(() -> new RuntimeException("From Base Not found"));

        
        Base toBase = baseRepository.findById(request.getToBaseId())
                        .orElseThrow(() -> new RuntimeException("To Base Not found"));

        EquipmentType equipmentType = equipmentTypeRepository.findById(request.getEquipmentTypeId())
                                        .orElseThrow(() -> new RuntimeException("Equipment Type not found"));


        Transfer transfer = new Transfer();

        transfer.setFromBase(fromBase);
        transfer.setToBase(toBase);
        transfer.setEquipmentType(equipmentType);
        transfer.setQuantity(request.getQuantity());
        transfer.setTransferDate(request.getTransferDate());

        return transferRepository.save(transfer);
        
    }

    public List<Transfer> getAllTransfers() {
        
        return transferRepository.findAll();
    }
    
}
