package com.bhola.backendmilitaryassetmanagement.controller;

import com.bhola.backendmilitaryassetmanagement.dto.AssignmentRequest;
import com.bhola.backendmilitaryassetmanagement.model.Assignment;
import com.bhola.backendmilitaryassetmanagement.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public Assignment createAssignment(@RequestBody AssignmentRequest request) {

        return assignmentService.createAssignment(request);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }
}
