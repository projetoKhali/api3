package com.khali.api3.domain.user;

public enum UserType {
    Employee(0),
    Manager(1),
    Admin(2);

    public static final UserType[] USER_TYPES = values();

    private int level;

    private UserType (int level) {
        this.level = level;
    }

    public static UserType of (int level) {
        for (UserType userType : USER_TYPES) {
            if (userType.getLevel() != level) continue;
            return userType;
        }
        throw new IllegalArgumentException("UserType.of -- Error: Invalid argument: " + level);
    }

    public int getLevel() { return level; }
}

