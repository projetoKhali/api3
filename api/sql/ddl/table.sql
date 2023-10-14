
DROP TYPE IF EXISTS Apt_type;
CREATE TYPE Apt_type AS ENUM (
    'Overtime',
    'OnNotice'
);

DROP TYPE IF EXISTS User_type;
CREATE TYPE User_type AS ENUM (
    'Employer',
    'Manager',
    'Admin'
);

DROP TYPE IF EXISTS Apt_status;
CREATE TYPE Apt_status AS ENUM (
    'Pending',
    'Aproved',
    'Reject'
);

create table if not exists pay_rate_rules(
    prt_id serial primary key,
    code int unique,
    hour_duration numeric,
    pay_rate numeric,
    appointment_type Apt_type,
    start_time time check (start_time < end_time),
    end_time time check (end_time > start_time)
);

create table if not exists clients(
    clt_id serial primary key,
    "name" varchar(255),
    cnpj varchar(255) unique,
    active bool default true,
    insert_date timestamp default now(),
    expire_date timestamp
);

create table if not exists users(
    usr_id serial primary key,
    registration varchar(255) unique not null,
    "name" varchar(255),
    user_type varchar,
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
    active bool default true,
    insert_date timestamp default now(),
    expire_date timestamp,
    constraint gst_id_fk foreign key
    (gst_id) references users (usr_id)
);

create table if not exists members(
    usr_id int,
    rc_id int,
    insert_date timestamp default now(),
    constraint members_pk primary key
    (usr_id,rc_id),
    constraint usr_id_fk foreign key
    (usr_id) references users (usr_id),
    constraint rc_id_fk foreign key
    (rc_id) references result_centers (rc_id)
);

create table if not exists project(
    id serial primary key,
    nome varchar
);

create table if not exists appointments(
    apt_id serial primary key,
    start_date timestamp check (start_date < end_date) not null,
    end_date timestamp check (end_date > start_date)not null,
    usr_id int,
    clt_id int,
    rc_id int,
    project varchar(255) not null,
    appointment_type Apt_type not null,
    justification varchar(255),
    status Apt_status default 'Pending',
    insert_date timestamp default now(),
    apt_updt_id int null,
    feedback varchar(255),

    constraint usr_id_fk foreign key
    (usr_id) references users(usr_id),
    constraint clt_id_fk foreign key
    (clt_id) references clients(clt_id),
    constraint rc_id_fk foreign key
    (rc_id) references result_centers(rc_id),
    constraint apt_updt_fk foreign key
    (apt_updt_id) references appointments(apt_id)
);
