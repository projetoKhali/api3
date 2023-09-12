CREATE TYPE Apt_type AS ENUM (
    'Overtime',
    'OnNotice'
);
CREATE TYPE User_type AS ENUM (
    'Employer',
    'Manager',
    'Admin'
);
CREATE TYPE Apt_status AS ENUM (
    'Pending',
    'Aproved',
    'Reject'
);

create table if not exists pay_rate_rules(
    id serial primary key,
    code int UNIQUE,
    hour_duration numeric,
    pay_rate numeric,
    appointment_type Apt_type,
    start_time time,
    end_time time
);

create table if not exists clients(
    id serial primary key,
    name varchar(255),
    cnpj varchar(255) UNIQUE
);

create table if not exists users(
    id serial primary key,
    registration varchar(255),
    name varchar(255),
    user_type User_type,
    email varchar(255) UNIQUE,
    password varchar(255),
    active bool TRUE,
    insert_date timestamp CURRENT_TIMESTAMP,
    expire_date timestamp
);


create table if not exists result_centers(
    id serial primary key,
    name varchar(255),
    cod_pay_rate_rules integer,
    acronym varchar(255),
    gst_id int,
    insert_date timestamp CURRENT_TIMESTAMP,
    CONSTRAINT gst_id_fk FOREIGN KEY
    (gst_id) REFERENCES users (id)
    CONSTRAINT cod_pay_rate_rules_fk foreign key(cod_pay_rate_rules)
    REFERENCES pay_rate_rules(cod)
);

create table if not exists members(
    usr_id int,
    rc_id int,
    CONSTRAINT members_pk PRIMARY KEY
    (usr_id,rc_id),
    CONSTRAINT usr_id_fk FOREIGN key
    (usr_id) REFERENCES users (id),
    CONSTRAINT rc_id_fk FOREIGN key
    (rc_id) REFERENCES resultcenters (id)
);

create table if not exists appointments(
    id serial primary key,
    start_date date,
    end_date date,
    usr_id int,
    clt_id int,
    rc_id int,
    project varchar(255),
    appointment_type Apt_type,
    justification varchar(255),
    status Apt_status,
    insert_date timestamp CURRENT_TIMESTAMP,
    apt_updt_id int,
    feedback varchar(255),
    cod_pay_rate_rules integer,
    CONSTRAINT usr_id_fk foreign key
    (usr_id) references users(id),
    CONSTRAINT clt_id_fk foreign key
    (clt_id) references clientes(id),
    CONSTRAINT rc_id_fk foreign key
    (rc_id) references resultcenters(id),
    CONSTRAINT apt_updt_fk foreign key
    (apt_updt_id) references appointments,
    CONSTRAINT cod_pay_rate_rules_fk foreign key
    (cod_pay_rate_rules) REFERENCES pay_rate_rules(cod)
);






