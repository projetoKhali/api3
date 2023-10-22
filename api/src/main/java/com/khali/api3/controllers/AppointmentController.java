package com.khali.api3.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.appointment.AppointmentStatus;
import com.khali.api3.domain.user.User;
import com.khali.api3.repositories.AppointmentRepository;
import com.khali.api3.services.AppointmentService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private final AppointmentRepository appointmentRepository;
    @Autowired
    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentRepository appointmentRepository,
            AppointmentService appointmentService) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
    }

    @GetMapping("/user/{id}")
    public List<Appointment> getAppointmentsByUser(User user) {
        return appointmentRepository.findAppointmentByUser(user.getId());
    }

    @GetMapping("/manager/{id}")
    public List<Appointment> getManagerAppointments(User user) {
        return appointmentRepository.findByManager(user.getId());
    }

    public List<Appointment> getAppointmentByDate(List<Appointment> appointmentsList, LocalDate dataInit,
            LocalDate dataFim) {
        return appointmentService.findAppointmentByDate(appointmentsList, dataInit, dataFim);
    }

    public List<Appointment> getAppointmentByHour(List<Appointment> appointmentsList, LocalTime dataInit,
            LocalTime dataFim) {
        return appointmentService.findAppointmentByHour(appointmentsList, dataInit, dataFim);
    }

    public List<Appointment> getAppointmentByDateHour(List<Appointment> appointmentsList, LocalDateTime dataInit,
            LocalDateTime dataFim) {
        return appointmentService.findAppointmentByDateHour(appointmentsList, dataInit, dataFim);
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
        appointment.setUser(appointmentDetails.getUser());
        appointment.setType(appointmentDetails.getType());
        appointment.setStartDate(appointmentDetails.getStartDate());
        appointment.setEndDate(appointmentDetails.getEndDate());
        appointment.setResultCenter(appointmentDetails.getResultCenter());
        appointment.setClient(appointmentDetails.getClient());
        appointment.setProject(appointmentDetails.getProject());
        appointment.setJustification(appointmentDetails.getJustification());
        // appointment.setStatus(appointmentDetails.getStatus());
        appointment.setFeedback(appointmentDetails.getFeedback());
        appointment.setApt_updt(appointmentDetails.getApt_updt());

        return appointmentRepository.save(appointment);
    }

    @PutMapping("/validate/{id}")
    public Appointment validateAppointment(
        @PathVariable Long id,
        @RequestParam(name = "index") int index,
        @RequestParam(name = "feedback") String feedback
    ) throws Exception {

        if (index != 1 && index != 2) {
            throw new Exception("O valor passado deve ser 1 ou 2");
        }
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
        AppointmentStatus status = AppointmentStatus.of(index);
        // appointment.setStatus(status);
        appointmentRepository.updateStatusAppointment(id, status);
        appointment.setFeedback(feedback);

        return appointmentRepository.save(appointment);
    }

}
