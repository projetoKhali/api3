package com.khali.api3.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
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
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    long rejected;
    long approvated;

    @Autowired
    private final AppointmentRepository appointmentRepository;
    @Autowired
    private final AppointmentService appointmentService;

    public AppointmentController(
        AppointmentRepository appointmentRepository,
        AppointmentService appointmentService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findByActive(true);
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
        Appointment savedAppointment = appointmentRepository.save(appointment);
        appointmentRepository.insertNotification(savedAppointment.getId(), savedAppointment.getUser().getId());
        return savedAppointment;
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
        appointmentRepository.save(appointmentDetails);
        // referenciando apontamento antigo no novo
        appointmentDetails.setApt_updt(appointment.getId());

        return appointmentRepository.save(appointmentDetails);
    }

    @Transactional
    @PutMapping("/validate/{id}")
    public Appointment updateAppointmentWithStatus(
            @PathVariable Long id,
            @RequestParam(name = "index") int index,
            @RequestParam(name = "feedback") String feedback) throws Exception {
        if (index != 1 && index != 2) {
            throw new Exception("O valor passado deve ser 1 ou 2");
        }
    
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
    
        AppointmentStatus status = AppointmentStatus.of(index);
        // appointment.setStatus(status);
        appointmentRepository.updateStatusAppointment(id, status);
        appointment.setFeedback(feedback);
        appointment = appointmentRepository.save(appointment);
    
        if (status == AppointmentStatus.Rejected) {
            appointmentRepository.updateToRejected(id);
        } else if (status == AppointmentStatus.Approved) {
            appointmentRepository.updateToApproved(id);
        }
        return appointment;
    }
    

    @GetMapping("/notification/{usr_id}")
    public List<Long> notificationAppointment(@PathVariable Long usr_id) {
        List<Long> notification = new ArrayList<>();
        
        long pendingNotificationsForManager = appointmentRepository.countPendingNotificationsForManager(usr_id);
        notification.add(pendingNotificationsForManager);
        
        long falseRejectedOrApprovedNotifications = appointmentRepository.countFalseRejectedOrApprovedNotifications(usr_id);
        notification.add(falseRejectedOrApprovedNotifications);
        
        return notification;
    }
    

    @PutMapping("/notification/update/{usr_id}")
    @Transactional
    public void updateNotificationsStatusToTrue(@PathVariable Long usr_id) {
        appointmentRepository.updateStatusToTrueForUser(usr_id);
    }

}
