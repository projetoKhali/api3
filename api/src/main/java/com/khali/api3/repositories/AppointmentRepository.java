package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.user.User;

import java.util.Optional;


// manipulação das tabelas
@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    Optional<Appointment> findByUserId(User user);

    default void saveAppointment(Appointment apt){
    }

    
    
}

