package com.khali.api3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.khali.api3.converters.days_of_week.DaysOfWeekConverter;

@Configuration
@EnableJpaRepositories
@EnableJpaAuditing
public class JpaConfig {

    @Bean
    public DaysOfWeekConverter daysOfWeekConverter() {
        return new DaysOfWeekConverter();
    }
}

