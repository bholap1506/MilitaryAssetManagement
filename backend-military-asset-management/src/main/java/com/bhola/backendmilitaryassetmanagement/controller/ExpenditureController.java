package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.dto.ExpenditureRequest;
import com.bhola.backendmilitaryassetmanagement.model.Expenditure;
import com.bhola.backendmilitaryassetmanagement.service.ExpenditureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenditures")
public class ExpenditureController {

    @Autowired
    private ExpenditureService expenditureService;

    @PostMapping
    public Expenditure createExpenditure(@RequestBody ExpenditureRequest request) {
        return expenditureService.createExpenditure(request);
    }

    @GetMapping
    public List<Expenditure> getAllExpenditures() {

        return expenditureService.getAllExpenditures();
    }
}
