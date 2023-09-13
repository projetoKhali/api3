package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.appointment.Appointment;


// manipulação das tabelas
@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    // Optional<Appointment> findByUser(User user);

    default void saveAppointment(Appointment apt){
        save(apt);
    }

    
    
}

