package com.bhola.backendmilitaryassetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    
    @PostMapping 
    public Transfer creatTransfer(@RequestBody TransferRequest request) {

        return transferService.createTransfer(request);
    }
    
    @GetMapping 
    public List<Transfer> getAllTransfers() {

        return transferService.getAllTransfers();
    }
}
