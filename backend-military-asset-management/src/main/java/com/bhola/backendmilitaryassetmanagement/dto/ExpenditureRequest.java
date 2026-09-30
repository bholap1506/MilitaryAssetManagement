package com.bhola.backendmilitaryassetmanagement.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExpenditureRequest {

    private Long baseId;
    private Long equipmentTypeId;
    private Integer quantity;
    private LocalDateTime expendedAt;
}
