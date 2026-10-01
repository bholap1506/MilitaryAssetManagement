package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.dto.ExpenditureRequest;
import com.bhola.backendmilitaryassetmanagement.model.Expenditure;
import com.bhola.backendmilitaryassetmanagement.service.ExpenditureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenditures")
public class ExpenditureController {

    @Autowired
    private ExpenditureService expenditureService;

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER')")
    @PostMapping
    public Expenditure createExpenditure(@RequestBody ExpenditureRequest request) {
        return expenditureService.createExpenditure(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER')")
    @GetMapping
    public List<Expenditure> getAllExpenditures() {

        return expenditureService.getAllExpenditures();
    }
}
