package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.appointment.AppointmentStatus;
import com.khali.api3.domain.resultCenter.ResultCenter;

@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    public List<Appointment> findAll();

    @Query(value = "select * from appointments where apt_updt_id = null", nativeQuery = true)
    public List<Appointment> findByActive();

    public List<Appointment> findByResultCenter(ResultCenter resultCenter);

    public Optional<Appointment> findById(Long id);

    @Query(value = "SELECT * FROM appointments a WHERE a.usr_id = :usr_id", nativeQuery = true)
    List<Appointment> findAppointmentByUser(@Param("usr_id") Long userId);

    @Query(value = "select * from appointments where rc_id in ( select rc_id from result_centers where gst_id = :usr_id) and status = 'Pending'", nativeQuery = true)
    List<Appointment> findByManager(@Param("usr_id") Long userId);

    @Query(value = "update appointments set status = :#{#status.name()} where apt_id = :apt_id returning *", nativeQuery = true)
    Optional<Appointment> updateStatusAppointment(
        @Param("apt_id") Long apt_id,
        @Param("status") AppointmentStatus status
    );

    @Modifying
    @Query(value = "INSERT INTO notifications (apt_id, users_usr_id, type) VALUES (:aptId, :userId, 'Pending')", nativeQuery = true)
    void insertNotification(@Param("aptId") Long appointmentId, @Param("userId") Long userId);

    @Modifying
    @Query(value = "UPDATE notifications SET type = 'Rejected' WHERE apt_id = :aptId", nativeQuery = true)
    void updateToRejected(@Param("aptId") Long appointmentId);

    @Modifying
    @Query(value = "UPDATE notifications SET type = 'Approved' WHERE apt_id = :aptId", nativeQuery = true)
    void updateToApproved(@Param("aptId") Long appointmentId);

    @Modifying
    @Query(value =
        "UPDATE Notification n " +
        "SET n.status = true " +
        "WHERE n.userId.id = :usr_id " +
        "AND n.type IN ('Rejected', 'Approved') " +
        "AND n.status = false",
        nativeQuery = true)
    void updateStatusToTrueForUser(@Param("usr_id") Long usr_id);

    @Query(value =
        "SELECT COUNT(*) FROM notifications n " +
        "WHERE n.apt_id IN (SELECT a.apt_id FROM appointments a " +
        "WHERE a.rc_id IN (SELECT rc.rc_id FROM result_centers rc WHERE rc.gst_id = :userId) " +
        "AND a.status = 'Pending')",
        nativeQuery = true)
    long countPendingNotificationsForManager(@Param("userId") Long userId);

    @Query(value =
        "SELECT COUNT(*) FROM notifications WHERE usr_id = :userId " +
        "AND status = false AND (type = 'Rejected' OR type = 'Approved')",
        nativeQuery = true)
    long countFalseRejectedOrApprovedNotifications(@Param("userId") Long userId);
}
