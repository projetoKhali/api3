package com.khali.api3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.repositories.AppointmentRepository;

@RestController
@RequestMapping("/Appointments")
public class AppointmentController {
    private final AppointmentRepository appointmentRepository;
    
    @Autowired
    public AppointmentController(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }
}
