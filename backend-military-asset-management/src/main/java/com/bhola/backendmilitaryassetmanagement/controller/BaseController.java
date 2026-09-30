package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bases")
public class BaseController {

    @Autowired
    private BaseService baseService;

    @GetMapping()
    public List<Base> getAllBases() {
        return baseService.getAllBases();
    }

    @PostMapping
    public Base createBase(@RequestBody Base base) {
        return baseService.createBase(base);
    }
}
