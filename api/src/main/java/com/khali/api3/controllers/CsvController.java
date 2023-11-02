package com.khali.api3.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.slice.Slice;
import com.opencsv.CSVWriter;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/csv")
public class CsvController {

    @GetMapping("/export")
    public void exportCsv(HttpServletResponse response, @RequestParam Boolean[] camposBoolean) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"relatorio.csv\"");

        // tras lista de todos os slices
        List<Slice> slices = new ArrayList<>();

        try (PrintWriter writer = response.getWriter()) {
            CSVWriter csvWriter = new CSVWriter(writer);

            // escreve o cabeçalho do arquivo csv
            List<String> header = new ArrayList<>();
            if(camposBoolean[0]) header.add("Matricula");
            if(camposBoolean[1]) header.add("Colaborador");
            if(camposBoolean[2]) header.add("Verba");
            if(camposBoolean[3]) header.add("Porcentagem da Verba");
            if(camposBoolean[4]) header.add("Hora Início");
            if(camposBoolean[5]) header.add("Hora Fim");
            if(camposBoolean[6]) header.add("Tipo de Apontamento");
            if(camposBoolean[7]) header.add("Centro Resultado");
            if(camposBoolean[8]) header.add("Cliente");
            if(camposBoolean[9]) header.add("Projeto");
            if(camposBoolean[10]) header.add("Justificativa");

            csvWriter.writeNext(header.toArray(String[]::new));
            
            for (Slice slice : slices) {
                List<String> data = new ArrayList<>();
                if (camposBoolean[0]) data.add(slice.getAppointment().getUser().getRegistration());
                if (camposBoolean[1]) data.add(slice.getAppointment().getUser().getName());
                if (camposBoolean[2]) data.add(slice.getPayRateRule().getCode().toString());
                if (camposBoolean[3]) data.add(slice.getPayRateRule().getPayRate().toString());
                if (camposBoolean[4]) data.add(slice.getStart().toString());
                if (camposBoolean[5]) data.add(slice.getEnd().toString());
                if (camposBoolean[6]) data.add(slice.getAppointment().getType().toString());
                if (camposBoolean[7]) data.add(slice.getAppointment().getResultCenter().getName());
                if (camposBoolean[8]) data.add(slice.getAppointment().getClient().getName());
                if (camposBoolean[9]) data.add(slice.getAppointment().getProject().getName());
                if (camposBoolean[10]) data.add(slice.getAppointment().getJustification());

                csvWriter.writeNext(data.toArray(new String[0]));
            }

            csvWriter.close();
            System.out.println("Arquivo CSV gerado com sucesso!");
        }
        // return ;
    }
}
