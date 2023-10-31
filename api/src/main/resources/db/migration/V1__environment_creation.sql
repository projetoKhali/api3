CREATE TYPE IF NOT EXISTS Apt_type AS ENUM (
    'Overtime',
    'OnNotice'
);


CREATE TYPE IF NOT EXISTS Period_type AS ENUM (
    'Nightime',
    'Daytime',
    'Allday'
);


CREATE TYPE IF NOT EXISTS User_type AS ENUM (
    'Employee',
    'Manager',
    'Admin'
);


CREATE TYPE IF NOT EXISTS Apt_status AS ENUM (
    'Pending',
    'Approved',
    'Rejected'
);


CREATE CAST IF NOT EXISTS (VARCHAR AS Apt_type) WITH INOUT AS IMPLICIT;
CREATE CAST IF NOT EXISTS (VARCHAR AS Period_type) WITH INOUT AS IMPLICIT;
CREATE CAST IF NOT EXISTS (VARCHAR AS User_type) WITH INOUT AS IMPLICIT;
CREATE CAST IF NOT EXISTS (VARCHAR AS Apt_status) WITH INOUT AS IMPLICIT;


CREATE TABLE IF NOT EXISTS clients(
    clt_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    cnpj VARCHAR(255) UNIQUE,
    insert_date TIMESTAMP DEFAULT now(),
    expire_date TIMESTAMP
);


CREATE TABLE IF NOT EXISTS users(
    usr_id SERIAL PRIMARY KEY,
    registration VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    user_type User_type DEFAULT 'Employee',
    email VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    insert_date TIMESTAMP DEFAULT now(),
    expire_date TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "parameters"(
    prm_id SERIAL PRIMARY KEY,
    insert_date TIMESTAMP DEFAULT now(),
    closing_day INT,
    start_night_time TIME,
    end_night_time TIME
);


CREATE TABLE IF NOT EXISTS pay_rate_rules(
    prt_id SERIAL PRIMARY KEY,
    code INT UNIQUE NOT NULL,
    hour_duration numeric,
    min_hour_count numeric,
    pay_rate numeric,
    appointment_type Apt_type,
    period Period_type,
    overlap bool,
    expire_date TIMESTAMP
);


CREATE TABLE IF NOT EXISTS result_centers(
    rc_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    code INT UNIQUE NOT NULL,
    acronym VARCHAR(255),
    gst_id INT NOT NULL,
    insert_date TIMESTAMP DEFAULT now(),
    expire_date TIMESTAMP,
    CONSTRAINT gst_id_fk FOREIGN KEY
    (gst_id) REFERENCES users (usr_id)
);


CREATE TABLE IF NOT EXISTS members(
    usr_id INT,
    rc_id INT,
    active BOOLEAN DEFAULT TRUE,
    insert_date TIMESTAMP DEFAULT now(),
    CONSTRAINT members_pk PRIMARY KEY
    (usr_id,rc_id),
    CONSTRAINT usr_id_fk FOREIGN KEY
    (usr_id) REFERENCES users (usr_id),
    CONSTRAINT rc_id_fk FOREIGN KEY
    (rc_id) REFERENCES result_centers (rc_id)
);


CREATE TABLE IF NOT EXISTS projects(
    prj_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    insert_date TIMESTAMP DEFAULT now(),
    expire_date TIMESTAMP
);


CREATE TABLE IF NOT EXISTS appointments(
    apt_id SERIAL PRIMARY KEY,
    start_date TIMESTAMP check (start_date < end_date) NOT NULL,
    end_date TIMESTAMP check (end_date > start_date) NOT NULL,
    usr_id INT,
    clt_id INT,
    rc_id INT,
    prj_id INT,
    appointment_type Apt_type NOT NULL,
    justification VARCHAR(255),
    status Apt_status DEFAULT 'Pending',
    insert_date TIMESTAMP DEFAULT now(),
    active BOOLEAN DEFAULT TRUE,
    apt_updt_id INT NULL,
    feedback VARCHAR(255),

    CONSTRAINT usr_id_fk FOREIGN KEY
    (usr_id) REFERENCES users(usr_id),
    CONSTRAINT clt_id_fk FOREIGN KEY
    (clt_id) REFERENCES clients(clt_id),
    CONSTRAINT rc_id_fk FOREIGN KEY
    (rc_id) REFERENCES result_centers(rc_id),
    CONSTRAINT apt_updt_fk FOREIGN KEY
    (apt_updt_id) REFERENCES appointments(apt_id),
    CONSTRAINT prj_id_fk FOREIGN KEY (prj_id) REFERENCES projects(prj_id)
);


create table if not EXISTS teste(
    id serial primary key,
    name varchar(255)
);