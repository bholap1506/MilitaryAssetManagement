package com.bhola.backendmilitaryassetmanagement.service;

import com.bhola.backendmilitaryassetmanagement.dto.DashboardRequest;
import com.bhola.backendmilitaryassetmanagement.dto.DashboardResponse;
import com.bhola.backendmilitaryassetmanagement.model.Assignment;
import com.bhola.backendmilitaryassetmanagement.model.Expenditure;
import com.bhola.backendmilitaryassetmanagement.model.Purchase;
import com.bhola.backendmilitaryassetmanagement.model.Transfer;
import com.bhola.backendmilitaryassetmanagement.repository.AssignmentRepository;
import com.bhola.backendmilitaryassetmanagement.repository.ExpenditureRepository;
import com.bhola.backendmilitaryassetmanagement.repository.PurchaseRepository;
import com.bhola.backendmilitaryassetmanagement.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class DashboardService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private ExpenditureRepository expenditureRepository;

    public DashboardResponse getDashboard(DashboardRequest request) {

        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();

        Long baseId = request.getBaseId();
        Long equipmentTypeId = request.getEquipmentTypeId();

        int openingBalance = 0;

        int purchases = 0;
        int transferIn = 0;
        int transferOut = 0;
        int assigned = 0;
        int expended = 0;

        /*
         * Calculate Opening Balance
         * using transactions before the selected start date.
         */
        for (Purchase purchase : purchaseRepository.findAll()) {

            if (!matchesBase(purchase.getBase().getId(), baseId)) {
                continue;
            }

            if (!matchesEquipment(
                    purchase.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (startDate != null &&
                    purchase.getPurchaseDate().toLocalDate().isBefore(startDate)) {

                openingBalance += purchase.getQuantity();
            }
        }

        for (Transfer transfer : transferRepository.findAll()) {

            if (!matchesEquipment(
                    transfer.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (startDate != null &&
                    transfer.getTransferDate().toLocalDate().isBefore(startDate)) {

                if (matchesBase(transfer.getToBase().getId(), baseId)) {
                    openingBalance += transfer.getQuantity();
                }

                if (matchesBase(transfer.getFromBase().getId(), baseId)) {
                    openingBalance -= transfer.getQuantity();
                }
            }
        }

        for (Assignment assignment : assignmentRepository.findAll()) {

            if (!matchesBase(assignment.getBase().getId(), baseId)) {
                continue;
            }

            if (!matchesEquipment(
                    assignment.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (startDate != null &&
                    assignment.getAssignedAt().toLocalDate().isBefore(startDate)) {

                openingBalance -= assignment.getQuantity();
            }
        }

        for (Expenditure expenditure : expenditureRepository.findAll()) {

            if (!matchesBase(expenditure.getBase().getId(), baseId)) {
                continue;
            }

            if (!matchesEquipment(
                    expenditure.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (startDate != null &&
                    expenditure.getExpendedAt().toLocalDate().isBefore(startDate)) {

                openingBalance -= expenditure.getQuantity();
            }
        }

        /*
         * Calculate transactions inside selected date range.
         */

        for (Purchase purchase : purchaseRepository.findAll()) {

            if (!matchesBase(purchase.getBase().getId(), baseId)) {
                continue;
            }

            if (!matchesEquipment(
                    purchase.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (isWithinDateRange(
                    purchase.getPurchaseDate(), startDate, endDate)) {

                purchases += purchase.getQuantity();
            }
        }

        for (Transfer transfer : transferRepository.findAll()) {

            if (!matchesEquipment(
                    transfer.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (!isWithinDateRange(
                    transfer.getTransferDate(), startDate, endDate)) {
                continue;
            }

            if (matchesBase(transfer.getToBase().getId(), baseId)) {
                transferIn += transfer.getQuantity();
            }

            if (matchesBase(transfer.getFromBase().getId(), baseId)) {
                transferOut += transfer.getQuantity();
            }
        }

        for (Assignment assignment : assignmentRepository.findAll()) {

            if (!matchesBase(assignment.getBase().getId(), baseId)) {
                continue;
            }

            if (!matchesEquipment(
                    assignment.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (isWithinDateRange(
                    assignment.getAssignedAt(), startDate, endDate)) {

                assigned += assignment.getQuantity();
            }
        }

        for (Expenditure expenditure : expenditureRepository.findAll()) {

            if (!matchesBase(expenditure.getBase().getId(), baseId)) {
                continue;
            }

            if (!matchesEquipment(
                    expenditure.getEquipmentType().getId(),
                    equipmentTypeId)) {
                continue;
            }

            if (isWithinDateRange(
                    expenditure.getExpendedAt(), startDate, endDate)) {

                expended += expenditure.getQuantity();
            }
        }

        int netMovement = purchases + transferIn - transferOut;

        int closingBalance =
                openingBalance
                        + netMovement
                        - assigned
                        - expended;

        DashboardResponse response = new DashboardResponse();

        response.setOpeningBalance(openingBalance);
        response.setPurchases(purchases);
        response.setTransferIn(transferIn);
        response.setTransferOut(transferOut);
        response.setNetMovement(netMovement);
        response.setAssigned(assigned);
        response.setExpended(expended);
        response.setClosingBalance(closingBalance);

        return response;
    }

    private boolean matchesBase(Long actualBaseId, Long requestedBaseId) {

        return requestedBaseId == null ||
                actualBaseId.equals(requestedBaseId);
    }

    private boolean   matchesEquipment(
            Long actualEquipmentId,
            Long requestedEquipmentId) {

        return requestedEquipmentId == null ||
                actualEquipmentId.equals(requestedEquipmentId);
    }

    private boolean isWithinDateRange(
            LocalDateTime dateTime,
            LocalDate startDate,
            LocalDate endDate) {

        if (startDate != null &&
                dateTime.toLocalDate().isBefore(startDate)) {
            return false;
        }

        if (endDate != null &&
                dateTime.toLocalDate().isAfter(endDate)) {
            return false;
        }

        return true;
    }
}