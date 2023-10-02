-------------------------------------------------------------------------------
-- TYPES ----------------------------------------------------------------------
-------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------
-- TABLES ---------------------------------------------------------------------
-------------------------------------------------------------------------------

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
    (gst_id) REFERENCES users (usr_id)
);

create table if not exists members(
    usr_id int,
    rc_id int,
    CONSTRAINT members_pk primary key
    (usr_id,rc_id),
    CONSTRAINT usr_id_fk foreign key
    (usr_id) REFERENCES users (usr_id),
    CONSTRAINT rc_id_fk foreign key
    (rc_id) REFERENCES result_centers (rc_id)
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
    (usr_id) references users(usr_id),
    CONSTRAINT clt_id_fk foreign key
    (clt_id) references clients(clt_id),
    CONSTRAINT rc_id_fk foreign key
    (rc_id) references result_centers(rc_id)
);

-------------------------------------------------------------------------------
-- VIEWS ----------------------------------------------------------------------
-------------------------------------------------------------------------------

create or replace view vw_users as select
    users.usr_id,
    users.registration,
    users.name,
    users.user_type,
    users.email,
    users.password,
    users.active,
    users.insert_date,
    users.expire_date
from users;

create or replace view vw_appointments as select
    appointments.apt_id,
    appointments.start_date,
    appointments.end_date,
    users.name as user_name,
    clients.name as client_name,
    result_centers.name as center_name,
    appointments.project,
    appointments.appointment_type,
    appointments.justification,
    appointments.status,
    appointments.insert_date,
    appointments.apt_updt_id,
    appointments.feedback
from appointments
join users on appointments.usr_id = users.usr_id
join clients on appointments.clt_id = clients.clt_id
join result_centers on appointments.rc_id = result_centers.rc_id;

create or replace view vw_members as select
    users.name as user_name,
    result_centers.name as center_name
from members
join users on members.usr_id = users.usr_id
join result_centers on members.rc_id = result_centers.rc_id;

create or replace view vw_result_centers as select
    result_centers.rc_id,
    result_centers.name as center_name,
    result_centers.code,
    result_centers.acronym,
    users.name user_name,
    result_centers.insert_date
from result_centers
join users on result_centers.gst_id = users.usr_id;


create or replace view vw_clients as select
    clients.clt_id,
    clients.name as client_name,
    clients.cnpj
from clients;

create or replace view vw_pay_rate_rules as select
    pay_rate_rules.prt_id,
    pay_rate_rules.code,
    pay_rate_rules.hour_duration,
    pay_rate_rules.pay_rate,
    pay_rate_rules.appointment_type,
    pay_rate_rules.start_time,
    pay_rate_rules.end_time
from pay_rate_rules;

create or replace view vw_users as select
    users.usr_id,
    users.registration,
    users.name,
    users.user_type,
    users.email,
    users.password,
    users.active,
    users.insert_date,
    users.expire_date
from users;

create or replace view vw_appointments as select
    appointments.apt_id,
    appointments.start_date,
    appointments.end_date,
    users.name as user_name,
    clients.name as client_name,
    result_centers.name as center_name,
    appointments.project,
    appointments.appointment_type,
    appointments.justification,
    appointments.status,
    appointments.insert_date,
    appointments.apt_updt_id,
    appointments.feedback
from appointments
join users on appointments.usr_id = users.usr_id
join clients on appointments.clt_id = clients.clt_id
join result_centers on appointments.rc_id = result_centers.rc_id;

create or replace view vw_members as select
    users.name as user_name,
    result_centers.name as center_name
from members
join users on members.usr_id = users.usr_id
join result_centers on members.rc_id = result_centers.rc_id;

create or replace view vw_result_centers as select
    result_centers.rc_id,
    result_centers.name as center_name,
    result_centers.code,
    result_centers.acronym,
    users.name user_name,
    result_centers.insert_date
from result_centers
join users on result_centers.gst_id = users.usr_id;

create or replace view vw_clients as select
    clients.clt_id,
    clients.name as client_name,
    clients.cnpj
from clients;

create or replace view vw_pay_rate_rules as select
    pay_rate_rules.prt_id,
    pay_rate_rules.code,
    pay_rate_rules.hour_duration,
    pay_rate_rules.pay_rate,
    pay_rate_rules.appointment_type,
    pay_rate_rules.start_time,
    pay_rate_rules.end_time
from pay_rate_rules;

-------------------------------------------------------------------------------
-- FUNCTIONS ------------------------------------------------------------------
-------------------------------------------------------------------------------

create or replace function fc_desabilitar (usr_id int) returns void as $$ begin
update users
set expire_date = now(),
    active = false
where usr_id = usr_id;
end;
$$ language plpgsql

