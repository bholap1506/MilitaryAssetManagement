package com.bhola.backendmilitaryassetmanagement.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TransferRequest {

    private Long fromBaseId;
    private Long toBaseId;
    private Long equipmentTypeId;
    private Integer quantity;
    private LocalDateTime transferDate;
}
