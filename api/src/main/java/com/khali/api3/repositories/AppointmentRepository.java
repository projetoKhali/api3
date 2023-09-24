package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.resultCenter.ResultCenter;



// manipulação das tabelas
@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    // Optional<Appointment> findByUser(User user);

    default void saveAppointment(Appointment apt){
        save(apt);
    }

    public List<Appointment> findByResultCenter(ResultCenter resultCenter);
    public List<Appointment> findAll();
    public Optional<Appointment> findById(Long id);
    
    // utiliza anotações JPA para saber qual tabela e atributo fazer a pesquisa
    @Query(value = "SELECT * FROM appointments a WHERE a.usr_id = :usr_id", nativeQuery = true)
    List<Appointment> findAppointmentByUser(@Param("usr_id") Long userId);

    @Query(value = "select * from db.appointments a where rc_id in ( select id from db.result_centers where gst_id = :usr_id);", nativeQuery = true)
    List<Appointment> findByManager(@Param("usr_id") Long userId);
}

