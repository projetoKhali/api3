package com.khali.api3.domain.appointment;

public enum AppointmentStatus {
    Pending(0),
    Aproved(1),
    Reject(2);

    public static final AppointmentStatus[] STATUSES = values();

    private int index;

    // Create a new Status from a string. Exclusively for the list above
    private AppointmentStatus (int index) {
        this.index = index;
    }

    // returns the string value of the Status
    public int getIntValue() {
        return index;
    }

    // returns the appointmentStatus corresponding to the given index
    public static AppointmentStatus of (int index) {
        if (index >= 0 && index < STATUSES.length) { return STATUSES[index]; }
        throw new IllegalArgumentException("AppointmentStatus.of -- Error: Invalid argument: " + index);
    }
}
