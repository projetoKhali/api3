
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
    start_time time,
    end_time time
);

create table if not exists clients(
    id serial primary key,
    "name" varchar(255),
    cnpj varchar(255) unique
);

create table if not exists users(
    id serial primary key,
    registration varchar(255),
    name varchar(255),
    user_type User_type,
    email varchar(255) unique,
    "password" varchar(255),
    active bool default true,
    insert_date timestamp default now(),
    expire_date timestamp
);

create table if not exists result_centers(
    id serial primary key,
    "name" varchar(255),
    code int,
    acronym varchar(255),
    gst_id int,
    insert_date timestamp default now(),
    CONSTRAINT gst_id_fk FOREIGN KEY
    (gst_id) REFERENCES users (id)
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
    start_date timestamp,
    end_date timestamp,
    status Apt_status DEFAULT 'Pending',
    insert_date timestamp default now(),
    apt_updt_id int,
    feedback varchar(255),
    CONSTRAINT usr_id_fk foreign key
    (usr_id) references users(id),
    CONSTRAINT clt_id_fk foreign key
    (clt_id) references clients(id),
    CONSTRAINT rc_id_fk foreign key
    (rc_id) references result_centers(id),
    CONSTRAINT apt_updt_fk foreign key
    (apt_updt_id) references appointments,
);
