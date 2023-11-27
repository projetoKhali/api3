package com.khali.api3.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khali.api3.domain.slice.Slice;
import com.khali.api3.repositories.AppointmentRepository;
import com.khali.api3.repositories.ReportRepository;
import com.opencsv.CSVWriter;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/csv-export")
public class ReportController {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    SliceController sliceController;
    
    @Autowired
    AppointmentRepository appointmentRepository;

    public ReportController(
        ReportRepository reportRepository,
        SliceController sliceController,
        AppointmentRepository appointmentRepository){
            this.reportRepository = reportRepository;
            this.sliceController = sliceController;
            this.appointmentRepository = appointmentRepository;}

    @GetMapping
    @Transactional
    public void exportCsv(HttpServletResponse response, @RequestParam Boolean[] camposBoolean, Integer usr_id, Optional<Timestamp> periodStard, Optional<Timestamp> periodEnd) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"relatorio.csv\"");

        // tras lista de todos os slices
        List<Slice> slices = sliceController.getSlices(periodStard, periodEnd);
        // List<Appointment> allAppointments = appointmentRepository.findByActive();
        // System.out.println(allAppointments.size());

        String[] headers = {"Matricula",
                            "Colaborador",
                            "Verba",
                            "Porcentagem da Verba",
                            "Hora Início",
                            "Hora Fim",
                            "Hora Total",
                            "Tipo de Apontamento",
                            "Centro Resultado",
                            "Cliente",
                            "Projeto",
                            "Justificativa"};

        try (PrintWriter writer = response.getWriter()) {
            CSVWriter csvWriter = new CSVWriter(writer);

            // escreve o cabeçalho do arquivo csv
            List<String> header = new ArrayList<>();

            for (int i = 0; i < headers.length; i++) { if (camposBoolean[i]) { header.add(headers[i]); }}

            csvWriter.writeNext(header.toArray(String[]::new));

            // Use a biblioteca Jackson para serializar a lista em JSON
            ObjectMapper objectMapper = new ObjectMapper();
            List<String> jsonData = new ArrayList<>();
            
            for (Slice apt : slices) {
                List<String> data = new ArrayList<>();
                Timestamp total = new Timestamp(apt.getEnd().getTime() - apt.getStart().getTime());
                if (camposBoolean[0]) data.add(apt.getAppointment().getUser().getRegistration());
                if (camposBoolean[1]) data.add(apt.getAppointment().getUser().getName());
                if (camposBoolean[2]) data.add(apt.getPayRateRule().getCode().toString());
                if (camposBoolean[3]) data.add(apt.getPayRateRule().getPayRate().toString());
                if (camposBoolean[4]) data.add(apt.getStart().toString());
                if (camposBoolean[5]) data.add(apt.getEnd().toString());
                if (camposBoolean[6]) data.add(total.toString());
                if (camposBoolean[7]) data.add(apt.getAppointment().getType().toString());
                if (camposBoolean[8]) data.add(apt.getAppointment().getResultCenter().getName());
                if (camposBoolean[9]) data.add(apt.getAppointment().getClient().getName());
                if (camposBoolean[10]) data.add(apt.getAppointment().getProject().getName());
                if (camposBoolean[11]) data.add(apt.getAppointment().getJustification());
                csvWriter.writeNext(data.toArray(String[]::new));
                jsonData.addAll(data);
            }

            String json = objectMapper.writeValueAsString(jsonData);
            reportRepository.insertReport(json,usr_id);

            csvWriter.close();
            System.out.println("Arquivo CSV gerado com sucesso!");
        }
    }
}
