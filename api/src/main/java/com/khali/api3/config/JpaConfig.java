package com.khali.api3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.khali.api3.converters.days_of_week.DaysOfWeekConverter;

@Configuration
public class JpaConfig {

    @Bean
    public DaysOfWeekConverter daysOfWeekConverter() {
        return new DaysOfWeekConverter();
    }
}

