CREATE OR REPLACE VIEW vw_users AS SELECT
    users.usr_id,
    users.registration,
    users."name",
    users.user_type,
    users.email,
    users.password,
    users.active,
    users.insert_date,
    users.expire_date
FROM users;


CREATE OR REPLACE VIEW vw_appointments AS SELECT
    ap.apt_id,
    ap.start_date,
    ap.end_date,
    ap.usr_id,
    users."name" AS user_name,
    ap.clt_id,
    clients."name" AS client_name,
    ap.rc_id,
    result_centers."name" AS center_name,
    ap.project,
    ap.appointment_type,
    ap.justification,
    ap.status,
    ap.insert_date,
    ap.apt_updt_id,
    ap.feedback
FROM appointments ap
JOIN users ON ap.usr_id = users.usr_id
JOIN clients ON ap.clt_id = clients.clt_id
JOIN result_centers ON ap.rc_id = result_centers.rc_id;


CREATE OR REPLACE VIEW vw_result_centers AS SELECT
    rc.rc_id ,
    rc."name",
    rc.code,
    rc.acronym,
    rc.gst_id,
    rc.gst_id,
    users.name gestor,
    rc.insert_date
FROM result_centers rc
JOIN users ON rc.gst_id = users.usr_id;


CREATE OR REPLACE VIEW vw_clients AS SELECT
    clients.clt_id,
    clients."name" AS client_name,
    clients.cnpj
FROM clients;


CREATE OR REPLACE VIEW vw_members AS SELECT
    me.usr_id,
    me.rc_id,
    users.name AS user_name,
    result_centers.name AS center_name
FROM members me
JOIN users ON me.usr_id = users.usr_id
JOIN result_centers ON me.rc_id = result_centers.rc_id;


CREATE OR REPLACE VIEW vw_pay_rate_rules AS SELECT
    pay_rate_rules.prt_id,
    pay_rate_rules.code,
    pay_rate_rules.hour_duration,
    pay_rate_rules.pay_rate,
    pay_rate_rules.appointment_type,
    pay_rate_rules.start_time,
    pay_rate_rules.end_time
FROM pay_rate_rules;

