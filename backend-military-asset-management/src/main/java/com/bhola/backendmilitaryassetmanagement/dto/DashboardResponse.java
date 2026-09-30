package com.bhola.backendmilitaryassetmanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponse {

    private Integer openingBalance;
    private Integer purchases;
    private Integer transferIn;
    private Integer transferOut;
    private Integer netMovement;
    private Integer assigned;
    private Integer expended;
    private Integer closingBalance;
}
