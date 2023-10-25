package com.khali.api3.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.appointment.AppointmentStatus;
import com.khali.api3.repositories.AppointmentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ResultCenterService resultCenterService;

    public List<Appointment> getAppointment(){
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentByID(Long id){
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if(appointment.isPresent()){
            return appointmentRepository.findById(id).get();
        }
        else{throw new EntityNotFoundException("Apontamento não encontrado com o id: " + id);}
    }

    // filtra apontamentos de uma lista por data
    public List<Appointment> findAppointmentByDate(List<Appointment> apontamentos, LocalDate init, LocalDate end) {
        List<Appointment> appointmentsList = new ArrayList<>();

        LocalDateTime dataInicio = init.atStartOfDay();
        LocalDateTime dataFim = end.atStartOfDay();

        for (Appointment appointment : apontamentos) {
            LocalDateTime dateInit = appointment.getStartDate().toLocalDateTime();
            LocalDateTime dateEnd = appointment.getStartDate().toLocalDateTime();
            if ((dateInit.equals(dataInicio) || dateInit.isAfter(dataInicio)) &&
                (dateEnd.equals(dateEnd) || dateEnd.isBefore(dataFim)))
            {
                appointmentsList.add(appointment);
            }
        }
        return appointmentsList;
    }

    // filtra apontamentos de uma lista por data e hora
    public List<Appointment> findAppointmentByDateHour(List<Appointment> apontamentos, LocalDateTime init, LocalDateTime end) {
        List<Appointment> appointmentsList = new ArrayList<>();

        for (Appointment appointment : apontamentos) {
            LocalDateTime dateInit = appointment.getStartDate().toLocalDateTime();
            LocalDateTime dateEnd = appointment.getStartDate().toLocalDateTime();
            if ((dateInit.equals(init) || dateInit.isAfter(init)) &&
                (dateEnd.equals(end) || dateEnd.isBefore(end)))
            {
                appointmentsList.add(appointment);
            }
        }
        return appointmentsList;
    }

    // filtra apontamentos de uma lista por hora
    public List<Appointment> findAppointmentByHour(List<Appointment> apontamentos, LocalTime init, LocalTime end) {
        List<Appointment> appointmentsList = new ArrayList<>();

        for (Appointment appointment : apontamentos) {
            LocalTime dateInit = appointment.getStartDate().toLocalDateTime().toLocalTime();
            LocalTime dateEnd = appointment.getStartDate().toLocalDateTime().toLocalTime();
            if ((dateInit.equals(init) || dateInit.isAfter(init)) &&
                (dateEnd.equals(end) || dateEnd.isBefore(end)))
            {
                appointmentsList.add(appointment);
            }
        }
        return appointmentsList;
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
