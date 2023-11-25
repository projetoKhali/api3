package com.khali.api3.util;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.appointment.AppointmentType;
import com.khali.api3.domain.pay_rate_rule.IntegratedPayRateRule;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.slice.Slice;

public class SliceCalculator {

    public static Slice[] calculateReports (Appointment[] appointments, IntegratedPayRateRule[] payRateRules) {
        List<Slice> slicesFinal = new ArrayList<Slice>();

        LinkedList<Slice> slicesOnNotice = new LinkedList<>();

        final PayRateRule verba3016 = Arrays
            .stream(payRateRules)
            .filter(payRateRule -> payRateRule.getPayRateRule().getCode() == 3016)
            .findFirst()
            .orElseThrow(() -> new Error("SliceController.calculateReports -- Verba 3016 não existe!"))
            .getPayRateRule();

        for (Appointment appointment: appointments) {

            LocalDateTime aptStartDateTime = appointment.getStartDate().toLocalDateTime();
            LocalDateTime aptEndDateTime = appointment.getEndDate().toLocalDateTime();

            double aptTotalTime = ((double) ChronoUnit.MINUTES.between(aptStartDateTime, aptEndDateTime)) / 60.0;

            if (appointment.getType() == AppointmentType.OnNotice) {
                slicesOnNotice.add(new Slice(
                    appointment,
                    verba3016,
                    appointment.getStartDate(),
                    appointment.getEndDate())
                );
            }
            else {
                for (IntegratedPayRateRule payRateRule: payRateRules) {

                    if (payRateRule.getPayRateRule().getCode() == 1809 || Week.FDS.compare(payRateRule.getPayRateRule().getDaysOfWeek())) {
                        for (Slice repInt : calculateIntervals(appointment, payRateRule)) slicesFinal.add(repInt);
                    }

                    else if (payRateRule.getPayRateRule().getMinHourCount() != 0) {
                        if (aptTotalTime <= 2) continue;
                        Appointment aptLastHours = appointment.copy();
                        aptLastHours.setStartDate(Timestamp.valueOf((appointment.getStartDate().toLocalDateTime()).plusHours(2)));
                        for (Slice repInt : calculateIntervals(aptLastHours, payRateRule)) slicesFinal.add(repInt);
                    }

                    else {
                        if (aptTotalTime > 2) {
                            Appointment aptFirstHours = appointment.copy();
                            aptFirstHours.setEndDate(Timestamp.valueOf((appointment.getStartDate().toLocalDateTime()).plusHours(2)));
                            List<Slice> slicesTemporary = calculateIntervals(aptFirstHours, payRateRule);
                            for (Slice repInt: slicesTemporary) slicesFinal.add(repInt);
                        } else {
                            List<Slice> slicesTemporary = calculateIntervals(appointment, payRateRule);
                            for (Slice repInt: slicesTemporary) slicesFinal.add(repInt);
                        }
                    }
                }
            }
        }

        for (Slice repInt : calculateOnNotice(slicesOnNotice, appointments, verba3016)) slicesFinal.add(repInt);


        System.out.println("SliceCalculator.CalculateReports() -- " + slicesFinal.size() + " intervals");

        return slicesFinal.toArray(Slice[]::new);
    }

    private static ArrayList<Slice> calculateOnNotice (LinkedList<Slice> slices, Appointment[] appointments, PayRateRule verba3016) {
        ArrayList<Slice> subIntervals = new ArrayList<>();

        for (int i = 0; i < slices.size(); i++) {
            Slice currentInterval = slices.get(i);

            Timestamp onNoticeStart = currentInterval.getStart();
            Timestamp onNoticeEnd = currentInterval.getEnd();

            LocalDateTime onNoticeStartDateTime = onNoticeStart.toLocalDateTime();
            LocalDateTime onNoticeEndDateTime = onNoticeEnd.toLocalDateTime();

            for (Appointment apt : appointments) {
                if (apt.getType() != AppointmentType.Overtime) continue;

                java.sql.Timestamp aptStart = apt.getStartDate();
                java.sql.Timestamp aptEnd = apt.getEndDate();

                LocalDateTime aptStartDateTime = aptStart.toLocalDateTime();
                LocalDateTime aptEndDateTime = aptEnd.toLocalDateTime();

                // Situação A: apt faz instersecção com o fim do sobreaviso
                // apt.start > sobreaviso.end && apt.end <= sobreaviso.end 
                if (
                    aptStartDateTime.isBefore(onNoticeEndDateTime) && 
                    !aptEndDateTime.isBefore(onNoticeEndDateTime) &&
                    aptStartDateTime.isAfter(onNoticeStartDateTime)
                ) {
                    currentInterval.setEnd(aptStart);
                }

                // Situação B: apt faz instersecção com o começo do sobreaviso
                // apt.end > sobreaviso.start && apt.start <= sobreaviso.start 
                else if (
                    aptEndDateTime.isAfter(onNoticeStartDateTime) && 
                    !aptStartDateTime.isAfter(onNoticeStartDateTime) &&
                    aptEndDateTime.isBefore(onNoticeEndDateTime)
                ) {
                    currentInterval.setStart(aptEnd);
                }

                // Situação C: apt faz instersecção com o meio do sobreaviso
                // apt.start > sobreaviso.start && apt.end < sobreaviso.end 
                else if (aptStartDateTime.isAfter(onNoticeStartDateTime) && aptEndDateTime.isBefore(onNoticeEndDateTime)) {

                    // Nesse caso, separamos currentInterval em dois. 
                    // Tratamos a primeira metade de acordo com a situação A
                    // currentInterval.setEnd(aptStart);

                    // Cria uma nova lista de sub intervals para calcular as possíveis situações B ou C
                    // da segunda metade de currentInterval. 
                    LinkedList<Slice> temp = new LinkedList<>();
                    temp.add(new Slice(
                        currentInterval.getAppointment(),
                        verba3016,
                        onNoticeStart,
                        aptStart
                    ));
                    temp.add(new Slice(
                        currentInterval.getAppointment(),
                        verba3016,
                        aptEnd,
                        onNoticeEnd
                    ));

                    for (Slice subInt : calculateOnNotice(temp, appointments, verba3016)) subIntervals.add(subInt);

                    slices.remove(currentInterval);
                    i--;

                    break;

                } 
            }
        }

        ArrayList<Slice> intervalsFinal = new ArrayList<>();

        for (int i = subIntervals.size() -1; i >= 0; i--) {
            Slice repInt = subIntervals.get(i);
            if (!intervalsFinal.contains(repInt)) intervalsFinal.add(repInt);
        }
        for (int i = slices.size() -1; i >= 0; i--) {
            Slice repInt = slices.get(i);
            if (!intervalsFinal.contains(repInt)) intervalsFinal.add(repInt);
        }

        return intervalsFinal;
    }

    private static ArrayList<Slice> calculateIntervals (Appointment appointment, IntegratedPayRateRule payRateRule) {

        ArrayList<Slice> reportsOvertime = new ArrayList<Slice>();

        LocalDateTime aptStartDateTime = appointment.getStartDate().toLocalDateTime();
        LocalDate aptStartLocalDate = aptStartDateTime.toLocalDate();

        LocalDateTime aptEndDateTime = appointment.getEndDate().toLocalDateTime();
        LocalDate aptEndLocalDate = aptEndDateTime.toLocalDate();

        if (!detectaInterDiaSemana(payRateRule, aptStartLocalDate, aptEndLocalDate)) return new ArrayList<>(List.of());

        if (payRateRule.getTimeRange().isPresent()) {
            for (LocalDate actualDay = aptStartLocalDate; !actualDay.isAfter(aptEndLocalDate); actualDay = actualDay.plusDays(1)) {

                int actualDayOfWeek = actualDay.getDayOfWeek().getValue();

                if (payRateRule.getPayRateRule().getDaysOfWeek()[actualDayOfWeek % 7]) {

                    LocalDateTime verbastart = actualDay.atTime(payRateRule.getTimeRange().get().x.toLocalDateTime().toLocalTime());
                    LocalDateTime verbaEnd = null;

                    // situação em que a hora termina no dia seguinte
                    if (payRateRule.getTimeRange().get().y.toLocalDateTime().toLocalTime().isBefore(payRateRule.getTimeRange().get().x.toLocalDateTime().toLocalTime())) {
                        if (actualDay == aptStartLocalDate || (Week.FDS.compare(payRateRule.getPayRateRule().getDaysOfWeek()) && actualDayOfWeek % 7 == 6)) {

                            LocalDateTime verbaStart_ = actualDay.atTime(0, 0);
                            LocalDateTime verbaEnd_ = actualDay.atTime(payRateRule.getTimeRange().get().y.toLocalDateTime().toLocalTime());

                            if (!verbaStart_.isAfter(aptEndDateTime) && !aptStartDateTime.isAfter(verbaEnd_)) {

                                LocalDateTime laterStart_ = Collections.max(Arrays.asList(verbaStart_, aptStartDateTime));
                                LocalDateTime earlierEnd_ = Collections.min(Arrays.asList(verbaEnd_, aptEndDateTime));

                                
                                Slice ri = new Slice(
                                    appointment,
                                    payRateRule.getPayRateRule(),
                                    Timestamp.valueOf(laterStart_),
                                    Timestamp.valueOf(earlierEnd_)
                                );
                                reportsOvertime.add(ri);
                            }
                        }

                        // se no dia seguinte a payRateRule é válida
                        if (payRateRule.getPayRateRule().getDaysOfWeek()[(actualDayOfWeek + 1) % 7] && payRateRule.getTimeRange().isPresent()) {
                            verbaEnd = (actualDay.plusDays(1)).atTime(payRateRule.getTimeRange().get().y.toLocalDateTime().toLocalTime());
                        }

                        // se no dia seguinte a payRateRule não está ativa
                        else verbaEnd = actualDay.plusDays(1).atTime(0,0);
                    }

                    // situação em que a hora começa e termina no mesmo dia
                    else verbaEnd = actualDay.atTime(payRateRule.getTimeRange().get().y.toLocalDateTime().toLocalTime());

                    if (!verbastart.isAfter(aptEndDateTime) && !aptStartDateTime.isAfter(verbaEnd)) {

                        LocalDateTime laterStart = Collections.max(Arrays.asList(verbastart, aptStartDateTime));
                        LocalDateTime earlierEnd = Collections.min(Arrays.asList(verbaEnd, aptEndDateTime));

                        Slice ri = new Slice(
                            appointment,
                            payRateRule.getPayRateRule(),
                            Timestamp.valueOf(laterStart),
                            Timestamp.valueOf(earlierEnd)
                        );
                        reportsOvertime.add(ri);
                    }

                }
            }
        }

        return reportsOvertime;
    }

    private static boolean detectaInterDiaSemana (IntegratedPayRateRule payRateRule, LocalDate aptStartLocalDate, LocalDate aptEndLocalDate) {
        LocalDate actualDay = aptStartLocalDate;
        while (!actualDay.isAfter(aptEndLocalDate)) {
            int actualDayOfWeek = actualDay.getDayOfWeek().getValue();
            // uso %7 pois getDayOfWeek().getValue() considera domingo como sendo 7, e para padronizar quero que seja 0
            if (payRateRule.getPayRateRule().getDaysOfWeek()[(actualDayOfWeek % 7)]) {
                return true;
            }
            actualDay = actualDay.plusDays(1);
            actualDayOfWeek = actualDay.getDayOfWeek().getValue();
        }

        return false;
    }
}

