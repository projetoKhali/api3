create or replace view vw_users as select
    users.usr_id,
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
    ap.feedback
from appointments ap
join users on ap.usr_id = users.usr_id
join clients on ap.clt_id = clients.clt_id
join result_centers on ap.rc_id = result_centers.rc_id;

create or replace view vw_result_centers as select
    rc.rc_id ,
    rc."name",
    rc.code,
    rc.acronym,
    rc.gst_id,
    users.name as gestor,
    rc.insert_date
from result_centers rc
join users on rc.gst_id = users.usr_id;

create or replace view vw_members as select
    me.usr_id,
    me.rc_id,
    users.name as user_name,
    result_centers.name as center_name
from members me
join users on me.usr_id = users.usr_id
join result_centers on me.rc_id = result_centers.rc_id;


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
    clients."name" as client_name,
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

