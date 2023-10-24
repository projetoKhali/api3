package com.khali.api3.domain.slice;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Slice {
    private Long appointmentId;
    private Long payRateRuleId;
    private Timestamp start;
    private Timestamp end;
}
