package com.bhola.backendmilitaryassetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhola.backendmilitaryassetmanagement.dto.TransferRequest;
import com.bhola.backendmilitaryassetmanagement.model.Transfer;
import com.bhola.backendmilitaryassetmanagement.service.TransferService;

@RestController 
@RequestMapping("/api/transfers")
public class TransferController {
    
    @Autowired 
    private TransferService transferService;

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @PostMapping 
    public Transfer creatTransfer(@RequestBody TransferRequest request) {

        return transferService.createTransfer(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @GetMapping 
    public List<Transfer> getAllTransfers() {

        return transferService.getAllTransfers();
    }
}
