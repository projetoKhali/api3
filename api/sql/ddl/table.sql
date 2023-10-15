DROP TYPE IF EXISTS Apt_type CASCADE;
CREATE TYPE Apt_type AS ENUM (
    'Overtime',
    'OnNotice'
);


DROP TYPE IF EXISTS Period_type CASCADE;
CREATE TYPE Period_type AS ENUM (
    'Nightime',
    'Daytime',
    'Allday'
);


DROP TYPE IF EXISTS User_type CASCADE;
CREATE TYPE User_type AS ENUM (
    'Employee',
    'Manager',
    'Admin'
);


DROP TYPE IF EXISTS Apt_status CASCADE;
CREATE TYPE Apt_status AS ENUM (
    'Pending',
    'Approved',
    'Rejected'
);


CREATE CAST (VARCHAR AS Apt_type) WITH INOUT AS IMPLICIT;
CREATE CAST (VARCHAR AS Period_type) WITH INOUT AS IMPLICIT;
CREATE CAST (VARCHAR AS User_type) WITH INOUT AS IMPLICIT;
CREATE CAST (VARCHAR AS Apt_status) WITH INOUT AS IMPLICIT;


DROP TABLE IF EXISTS clients CASCADE;
CREATE TABLE IF NOT EXISTS clients(
    clt_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    cnpj VARCHAR(255) UNIQUE,
    insert_date TIMESTAMP DEFAULT now(),
    expire_date TIMESTAMP
);


DROP TABLE IF EXISTS users CASCADE;
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


DROP TABLE IF EXISTS "parameters" CASCADE;
CREATE TABLE IF NOT EXISTS "parameters"(
    prm_id SERIAL PRIMARY KEY,
    insert_date TIMESTAMP DEFAULT now(),
    closing_day INT,
    start_night_time TIME,
    end_night_time TIME
);


DROP TABLE IF EXISTS pay_rate_rules CASCADE;
CREATE TABLE IF NOT EXISTS pay_rate_rules(
    prt_id SERIAL PRIMARY KEY,
    code INT UNIQUE NOT NULL,
    hour_duration numeric,
    pay_rate numeric,
    appointment_type Apt_type,
    period Period_type,
    overlap bool,
    expire_date TIMESTAMP
);


DROP TABLE IF EXISTS result_centers CASCADE;
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


DROP TABLE IF EXISTS members CASCADE;
CREATE TABLE IF NOT EXISTS members(
    usr_id INT,
    rc_id INT,
    insert_date TIMESTAMP DEFAULT now(),
    CONSTRAINT members_pk PRIMARY KEY
    (usr_id,rc_id),
    CONSTRAINT usr_id_fk FOREIGN KEY
    (usr_id) REFERENCES users (usr_id),
    CONSTRAINT rc_id_fk FOREIGN KEY
    (rc_id) REFERENCES result_centers (rc_id)
);


DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE IF NOT EXISTS projects(
    prj_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    insert_date TIMESTAMP DEFAULT now(),
    expire_date TIMESTAMP
);


DROP TABLE IF EXISTS appointments CASCADE;
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
