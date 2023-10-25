package com.khali.api3.controllers;

import java.util.Optional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.slice.Slice;
import com.khali.api3.repositories.AppointmentRepository;

@RestController
@RequestMapping("/slices")
public class SliceController {

    @Autowired
    private final AppointmentRepository appointmentRepository;

    public SliceController(
        AppointmentRepository appointmentRepository
    ) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public List<Slice> calculateSlices (
        Optional<Timestamp> periodStart,
        Optional<Timestamp> periodEnd
    ) {
        List<Slice> slices = new ArrayList<Slice>();
        return slices;
    }
}
