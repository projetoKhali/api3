package com.khali.api3.converters.days_of_week;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class DaysOfWeekConverter implements AttributeConverter<Boolean[], Short> {

    @Override
    public Short convertToDatabaseColumn(Boolean[] attribute) {
        short result = 0;
        for (int i = 0; i < attribute.length; i++) {
            if (attribute[i]) {
                result |= (1 << i);
            }
        }
        return result;
    }

    @Override
    public Boolean[] convertToEntityAttribute(Short dbData) {
        Boolean[] daysOfWeek = new Boolean[7];
        for (int i = 0; i < 7; i++) {
            daysOfWeek[i] = (dbData & (1 << i)) != 0;
        }
        return daysOfWeek;
    }
}

