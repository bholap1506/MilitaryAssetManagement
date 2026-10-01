package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.dto.DashboardRequest;
import com.bhola.backendmilitaryassetmanagement.dto.DashboardResponse;
import com.bhola.backendmilitaryassetmanagement.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashBoardController {

    @Autowired
    private DashboardService dashboardService;

    @PreAuthorize("hasAnyRole('ADMIN', 'BASE_COMMANDER', 'LOGISTICS_OFFICER')")
    @GetMapping
    public DashboardResponse getDashboard(
            @ModelAttribute DashboardRequest request) {

        return dashboardService.getDashboard(request);
    }
}