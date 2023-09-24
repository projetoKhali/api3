
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
    code int unique,
    hour_duration numeric,
    pay_rate numeric,
    appointment_type Apt_type,
    start_time time check (start_time < end_time),
    end_time time check (end_date > start_time)
);

create table if not exists clients(
    clt_id serial primary key,
    "name" varchar(255),
    cnpj varchar(255) unique
);

create table if not exists users(
    usr_id serial primary key,
    registration varchar(255) unique not null,
    "name" varchar(255),
    user_type User_type DEFAULT 'Employer',
    email varchar(255) unique not null,
    "password" varchar(255) not null,
    active bool default true,
    insert_date timestamp default now(),
    expire_date timestamp
);

create table if not exists result_centers(
    rc_id serial primary key,
    "name" varchar(255),
    code int unique not null,
    acronym varchar(255),
    gst_id int not null,
    insert_date timestamp default now(),
    CONSTRAINT gst_id_fk foreign KEY
    (gst_id) REFERENCES users (id)
);

create table if not exists members(
    usr_id int,
    rc_id int,
    CONSTRAINT members_pk primary key
    (usr_id,rc_id),
    CONSTRAINT usr_id_fk foreign key
    (usr_id) REFERENCES users (id),
    CONSTRAINT rc_id_fk foreign key
    (rc_id) REFERENCES result_centers (id)
);

create table if not exists appointments(
    apt_id serial primary key,
    start_date timestamp check (start_date < end_date),
    end_date timestamp check (end_date < start_date),
    usr_id int,
    clt_id int,
    rc_id int,
    project varchar(255),
    appointment_type Apt_type default 'Overtime',
    justification varchar(255),
    status Apt_status default 'Pending',
    insert_date timestamp default now(),
    apt_updt_id int,
    feedback varchar(255),
    
    CONSTRAINT usr_id_fk foreign key
    (usr_id) references users(id),
    CONSTRAINT clt_id_fk foreign key
    (clt_id) references clients(id),
    CONSTRAINT rc_id_fk foreign key
    (rc_id) references result_centers(id)
);
