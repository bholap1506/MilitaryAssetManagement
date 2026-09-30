package com.bhola.backendmilitaryassetmanagement.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AssignmentRequest {

    private Long baseId;
    private Long equipmentTypeId;
    private String personnelName;
    private Integer quantity;
    private LocalDateTime assignedAt;
}
