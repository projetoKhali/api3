package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.appointment.AppointmentStatus;
import com.khali.api3.domain.resultCenter.ResultCenter;



// manipulação das tabelas
@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

    public List<Appointment> findByResultCenter(ResultCenter resultCenter);
    public Optional<Appointment> findById(Long id);
    
    // utiliza anotações JPA para saber qual tabela e atributo fazer a pesquisa
    @Query(value = "SELECT * FROM appointments a WHERE a.usr_id = :usr_id", nativeQuery = true)
    List<Appointment> findAppointmentByUser(@Param("usr_id") Long userId);

    @Query(value = "select * from appointments a where rc_id in ( select rc_id from result_centers where gst_id = :usr_id) and status = 'Pending';", nativeQuery = true)
    List<Appointment> findByManager(@Param("usr_id") Long userId);
    
    @Query(value = "select * from appointments where active = true;", nativeQuery = true)
    public List<Appointment> findByActive();

    @Query(value= "update appointments set status = :#{#status.name()} where apt_id = :apt_id returning *;", nativeQuery = true)
    Optional<Appointment> updateStatusAppointment(
        @Param("apt_id") Long apt_id,
        @Param("status") AppointmentStatus status
    );

}

