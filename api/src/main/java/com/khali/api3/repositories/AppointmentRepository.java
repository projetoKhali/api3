package com.khali.api3.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.appointment.Appointment;
import java.util.List;
import java.util.Optional;

import com.khali.api3.domain.resultCenter.ResultCenter;



// manipulação das tabelas
@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    // Optional<Appointment> findByUser(User user);

    default void saveAppointment(Appointment apt){
        save(apt);
    }

    // utiliza anotações JPA para saber qual tabela e atributo fazer a pesquisa
    @Query("SELECT a FROM appointments a WHERE a.user = :usr_id")
    List<Appointment> findAppointmentByUser(@Param("usr_id") Long userId);
    
}

