package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.khali.api3.domain.appointment.Appointment;
import java.util.Optional;


// manipulação das tabelas
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    Optional<Appointment> findByUserId(int userId);

    default void saveAppointment(Appointment apt){
    }

    
    
}

