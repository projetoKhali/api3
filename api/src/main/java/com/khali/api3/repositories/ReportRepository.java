package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.khali.api3.domain.report.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
    @Modifying
@Query(value = "insert into report (report_data, usr_id) values (cast(:json as json), :id)", nativeQuery = true)
void insertReport(@Param("json") String json, @Param("id") int id);

}
