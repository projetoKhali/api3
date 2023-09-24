CREATE TABLE users (
    id BIGINT PRIMARY KEY UNIQUE NOT NULL,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role in ('Employer', 'Manager', 'Admin'))
)