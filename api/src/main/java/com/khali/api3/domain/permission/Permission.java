package com.khali.api3.domain.permission;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Permission {

    // List of every Permission:
    // To add new permissions to the enum, insert them with a coma ( , ) at the end.
    // The last item on the list should have a semicolon instead ( ; ) to indicate the end of the list of values of the enum
    Appoint("Appoint"),
    Validate("Validate"),
    Register("Register"),
    Report("Report"),
    FullAccess("FullAccess"),
    Config("Config"),
    ;

    private String stringValue;

}
