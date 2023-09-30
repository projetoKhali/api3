create view vw_users as select
    users.id serial,
    users.registration,
    users.name,
    users.user_type,
    users.email,
    users.password,
    users.active,
    users.insert_date,
    users.expire_date;

    
create view vw_appointments as select
    appointments.id,
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
    appointments.feedback,
    appointments.cod_pay_rate_rules,
from appointments
join users on appointments.usr_id = users.id
join clients on appointments.clt_id = clients.id
join result_centers on appointments.rc_id = result_centers.id;

create view vw_members as select
    users.name as user_name,
    result_centers.name as center_name
from members
join users on members.usr_id = users.id
join result_centers on members.rc_id = result_centers.id;

create view vw_result_centers as select
    result_centers.id ,
    result_centers.name as center_name,
    result_centers.code,
    result_centers.acronym,
    users.name user_name,
    result_centers.insert_date,
    result_centers.cod_pay_rate_rules,
from result_centers
join users on result_centers.gst_id = users.id;

create view vw_clients as select
    clients.id,
    clients.name as client_name,
    clients.cnpj
from clients;

create view vw_pay_rate_rules as select
    pay_rate_rules.id,
    pay_rate_rules.code,
    pay_rate_rules.hour_duration,
    pay_rate_rules.pay_rate,
    pay_rate_rules.appointment_type,
    pay_rate_rules.start_time,
    pay_rate_rules.end_time
from pay_rate_rules;