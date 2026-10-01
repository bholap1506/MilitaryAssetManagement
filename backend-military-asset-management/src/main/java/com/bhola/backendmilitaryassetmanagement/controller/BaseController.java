package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bases")
public class BaseController {

    @Autowired
    private BaseService baseService;

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @GetMapping()
    public List<Base> getAllBases() {
        return baseService.getAllBases();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Base createBase(@RequestBody Base base) {
        return baseService.createBase(base);
    }
}
