package com.khali.api3.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khali.api3.domain.appointment.Appointment;
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
    public void exportCsv(HttpServletResponse response, @RequestParam Boolean[] camposBoolean, Integer usr_id) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"relatorio.csv\"");

        // tras lista de todos os slices
        // List<Slice> slices = sliceController.calculateSlices(null, null);
        List<Appointment> allAppointments = appointmentRepository.findByActive();
        System.out.println(allAppointments.size());

        // String[] headers = {"Matricula", "Colaborador", "Verba", "Porcentagem da Verba", "Hora Início", "Hora Fim", "Hora Total", "Tipo de Apontamento", "Centro Resultado", "Cliente", "Projeto", "Justificativa"};
        String[] headers = {"Matricula",
                            "Colaborador",
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
            
            // for (Slice slice : slices) {
            //     List<String> data = new ArrayList<>();
            //     Timestamp total = new Timestamp(slice.getEnd().getTime() - slice.getStart().getTime());
            //     if (camposBoolean[0]) data.add(slice.getAppointment().getUser().getRegistration());
            //     if (camposBoolean[1]) data.add(slice.getAppointment().getUser().getName());
            //     if (camposBoolean[2]) data.add(slice.getPayRateRule().getCode().toString());
            //     if (camposBoolean[3]) data.add(slice.getPayRateRule().getPayRate().toString());
            //     if (camposBoolean[4]) data.add(slice.getStart().toString());
            //     if (camposBoolean[5]) data.add(slice.getEnd().toString());
            //     if (camposBoolean[5]) data.add(total.toString());
            //     if (camposBoolean[6]) data.add(slice.getAppointment().getType().toString());
            //     if (camposBoolean[7]) data.add(slice.getAppointment().getResultCenter().getName());
            //     if (camposBoolean[8]) data.add(slice.getAppointment().getClient().getName());
            //     if (camposBoolean[9]) data.add(slice.getAppointment().getProject().getName());
            //     if (camposBoolean[10]) data.add(slice.getAppointment().getJustification());
                
            //     csvWriter.writeNext(data.toArray(new String[0]));
            //     jsonData.addAll(data);
            // }
            
            List<String> data = new ArrayList<>();
            for (Appointment apt : allAppointments) {
                Timestamp total = new Timestamp(apt.getEndDate().getTime() - apt.getStartDate().getTime());
                if (camposBoolean[1]) data.add(apt.getUser().getRegistration());
                if (camposBoolean[2]) data.add(apt.getUser().getName());
                if (camposBoolean[3]) data.add(apt.getStartDate().toString());
                if (camposBoolean[4]) data.add(apt.getEndDate().toString());
                if (camposBoolean[5]) data.add(total.toString());
                if (camposBoolean[6]) data.add(apt.getType().toString());
                if (camposBoolean[7]) data.add(apt.getResultCenter().getName());
                if (camposBoolean[8]) data.add(apt.getClient().getName());
                if (camposBoolean[9]) data.add(apt.getProject().getName());
                if (camposBoolean[10]) data.add(apt.getJustification());

                csvWriter.writeNext(data.toArray(new String[0]));
                jsonData.addAll(data);
            }

            String json = objectMapper.writeValueAsString(jsonData);
            reportRepository.insertReport(json,usr_id);

            csvWriter.close();
            System.out.println("Arquivo CSV gerado com sucesso!");
        }
    }
}
