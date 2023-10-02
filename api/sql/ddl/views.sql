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
join users on result_centers.gst_id = users.id;


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

