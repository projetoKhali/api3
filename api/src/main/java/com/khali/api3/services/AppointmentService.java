package com.khali.api3.services;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.appointment.AppointmentStatus;
import com.khali.api3.repositories.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
    
    public List<Appointment> getAppointment(){
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentByID(Long id){
        return appointmentRepository.findById(id).orElse(null);
    }


    public Appointment updateAppointment(Long id, Appointment newAppointment){
        Appointment appointmentExists = appointmentRepository.findById(id).orElse(null);
        
        if (appointmentExists != null) {
            if (newAppointment.getApt_updt() != null) {
                appointmentExists.setApt_updt(newAppointment.getApt_updt());
            }

            if (newAppointment.getClient() != null) {
                appointmentExists.setClient(newAppointment.getClient());
            }

            if (newAppointment.getEndDate() != null) {
                appointmentExists.setEndDate(newAppointment.getEndDate());
            }

            if (newAppointment.getFeedback() != null) {
                appointmentExists.setFeedback(newAppointment.getFeedback());
            }

            if (newAppointment.getInsertDate() != null) {
                appointmentExists.setInsertDate(newAppointment.getInsertDate());
            }

            if (newAppointment.getJustification() != null) {
                appointmentExists.setJustification(newAppointment.getJustification());
            }

            if (newAppointment.getProject() != null) {
                appointmentExists.setProject(newAppointment.getProject());
            }

            if (newAppointment.getResultCenter() != null) {
                appointmentExists.setResultCenter(newAppointment.getResultCenter());
            }

            if (newAppointment.getStartDate() != null) {
                appointmentExists.setStartDate(newAppointment.getStartDate());
            }

            if (newAppointment.getStatus() != null) {
                appointmentExists.setStatus(newAppointment.getStatus());
            }

            if (newAppointment.getType() != null) {
                appointmentExists.setType(newAppointment.getType());
            }

            if (newAppointment.getUser() != null) {
                appointmentExists.setUser(newAppointment.getUser());
            }

            return appointmentRepository.save(appointmentExists);
        } else {
            throw new NoSuchElementException("Appointment not found with ID: " + id);
        }
    }

    public void alterStatusAppointments(List<Appointment> appointments, boolean isApproveButtonPressed) {
        AppointmentStatus status = isApproveButtonPressed ? AppointmentStatus.Approved : AppointmentStatus.Rejected;
        List<Appointment> updatedAppointments = new ArrayList<>();
        for(Appointment appointment : appointments){
            appointment.setStatus(status);
        }

        appointmentRepository.saveAll(updatedAppointments);

    }
    

}
