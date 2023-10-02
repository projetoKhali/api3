create view vw_users as select
    users.usr_id serial,
    users.registration,
    users."name",
    users.user_type,
    users.email,
    users.password,
    users.active,
    users.insert_date,
    users.expire_date
    from users;

create view vw_appointments as select
    ap.apt_id,
    ap.start_date,
    ap.end_date,
    ap.usr_id,
    users."name" as user_name,
    ap.clt_id,
    clients."name" as client_name,
    ap.rc_id,
    result_centers."name" as center_name,
    ap.project,
    ap.appointment_type,
    ap.justification,
    ap.status,
    ap.insert_date,
    ap.apt_updt_id,
    ap.feedback,
    pr.code
from appointments ap
join users on ap.usr_id = users.usr_id
join clients on ap.clt_id = clients.clt_id
join result_centers on ap.rc_id = result_centers.rc_id
join pay_rate_rules pr on
    ap.start_date::time >= pr.start_time and
    ap.end_date::time <= pr.end_time and
    ap.appointment_type = pr.appointment_type;

create view vw_result_centers as select
    rc.rc_id ,
    rc."name",
    rc.code,
    rc.acronym,
    rc.gst_id,
    users.name gestor,
    rc.insert_date
from result_centers rc
join users on rc.gst_id = users.usr_id;

create view vw_clients as select
    clients.clt_id,
    clients."name",
    clients.cnpj
from clients;

create view vw_pay_rate_rules as select
    pay_rate_rules.prt_id,
    pay_rate_rules.code,
    pay_rate_rules.hour_duration,
    pay_rate_rules.pay_rate,
    pay_rate_rules.appointment_type,
    pay_rate_rules.start_time,
    pay_rate_rules.end_time
from pay_rate_rules;