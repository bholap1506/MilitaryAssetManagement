package com.bhola.backendmilitaryassetmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "transfers")
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_base_id", nullable = false)
    private Base fromBase;

    @ManyToOne
    @JoinColumn(name = "to_base_id", nullable = false)
    private Base toBase;

    @ManyToOne
    @JoinColumn(name = "equipment_type_id", nullable = false)
    private EquipmentType equipmentType;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private LocalDateTime transferDate;

    public Transfer() {}

}
