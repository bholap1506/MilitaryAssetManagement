package com.bhola.backendmilitaryassetmanagement.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DashboardRequest {

    private LocalDate startDate;
    private LocalDate endDate;

    private Long baseId;

    private Long equipmentTypeId;;
}
