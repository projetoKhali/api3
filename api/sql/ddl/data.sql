INSERT INTO users (registration, name, user_type, email, password) VALUES ('123', 'emp', 'Employee'::user_type, 'e@m.p', '1');
INSERT INTO users (registration, name, user_type, email, password) VALUES ('124', 'man', 'Manager'::user_type, 'm@a.n', '1');
INSERT INTO users (registration, name, user_type, email, password) VALUES ('125', 'adm', 'Admin'::user_type, 'a@d.m', '1');

INSERT INTO result_centers (name, code, acronym, gst_id) VALUES ('result center', 1, 'rc', 2);

INSERT INTO members (usr_id, rc_id) VALUES (1, 1);

INSERT INTO clients (name, cnpj) VALUES ('client', '1');

INSERT INTO projects (name, description) VALUES ('project', 'Khali API3 test project');

INSERT INTO parameters (closing_day, start_night_time, end_night_time) VALUES (28, '18:00:00', '06:00:00');

INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (3016, 1,      0, 0,   'OnNotice'::Apt_type, 'AllDay'::Shift_type,    false, 127);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1601, 1,      0, 75,  'Overtime'::Apt_type, 'DayTime'::Shift_type,   false, 62);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1602, 1,      2, 100, 'Overtime'::Apt_type, 'DayTime'::Shift_type,   false, 62);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (3000, 1.1429, 0, 75,  'Overtime'::Apt_type, 'NightTime'::Shift_type, false, 62);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (3001, 1.1429, 2, 100, 'Overtime'::Apt_type, 'NightTime'::Shift_type, false, 62);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (3000, 1.1429, 0, 75,  'Overtime'::Apt_type, 'AllDay'::Shift_type,    false, 65);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (3001, 1.1429, 2, 100, 'Overtime'::Apt_type, 'AllDay'::Shift_type,    false, 65);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1809, 1.1429, 0, 30,  'Overtime'::Apt_type, 'NightTime'::Shift_type, true,  127);

INSERT INTO appointments (start_date, end_date, usr_id, clt_id, rc_id, prj_id, appointment_type, justification) VALUES ('2023-10-31 13:00:00', '2023-10-31 17:00:00', 1, 1, 1, 1, 'Overtime'::Apt_type, 'teste_13_17');
INSERT INTO appointments (start_date, end_date, usr_id, clt_id, rc_id, prj_id, appointment_type, justification) VALUES ('2023-11-01 18:00:00', '2023-11-01 22:00:00', 1, 1, 1, 1, 'Overtime'::Apt_type, 'teste_18_22');
INSERT INTO appointments (start_date, end_date, usr_id, clt_id, rc_id, prj_id, appointment_type, justification) VALUES ('2023-11-02 03:00:00', '2023-11-02 08:00:00', 1, 1, 1, 1, 'Overtime'::Apt_type, 'teste_03_08');





-------------------------------------------

-- Inserir dados na tabela pay_rate_rules
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES 
    (3016, 1, 0, 0, 'OnNotice', 'AllDay', false, 127),
    (1601, 1, 0, 75, 'Overtime', 'DayTime', false, 62),
    (1602, 1, 2, 100, 'Overtime', 'DayTime', false, 62),
    (3000, 1.1429, 0, 75, 'Overtime', 'NightTime', false, 62),
    (3001, 1.1429, 2, 100, 'Overtime', 'AllDay', false, 65),
    (1809, 1.1429, 0, 30, 'Overtime', 'NightTime', true, 127);

-- Inserir dados na tabela clients
INSERT INTO clients ("name", cnpj, expire_date) VALUES
    ('Client 1', '123456789', NULL),
    ('Client 2', '987654321', NULL);

-- Inserir dados na tabela users
INSERT INTO users (registration, "name", user_type, email, "password", expire_date) VALUES
    ('001', 'User 1', 'Employee', 'user1@example.com', 'password1', NULL),
    ('002', 'User 2', 'Manager', 'user2@example.com', 'password2', NULL);

-- Inserir dados na tabela "parameters"
INSERT INTO "parameters" (closing_day, start_night_time, end_night_time) VALUES
    (15, '18:00:00', '06:00:00');


-- Inserir dados na tabela result_centers
INSERT INTO result_centers ("name", code, acronym, gst_id, expire_date) VALUES
    ('Center 1', 101, 'C1', 1, NULL),
    ('Center 2', 102, 'C2', 2, NULL);

-- Inserir dados na tabela members
INSERT INTO members (usr_id, rc_id, active) VALUES
    (1, 1, true),
    (2, 2, true);

-- Inserir dados na tabela projects
INSERT INTO projects ("name", description, expire_date) VALUES
    ('Project 1', 'Description 1', NULL),
    ('Project 2', 'Description 2', NULL);

-- Inserir dados na tabela appointments
INSERT INTO appointments (start_date, end_date, usr_id, clt_id, rc_id, prj_id, appointment_type, justification, status, apt_updt_id, feedback) VALUES
    ('2023-01-01', '2023-01-02', 1, 1, 1, 1, 'Overtime', 'Justification 1', 'Pending', NULL, 'Feedback 1'),
    ('2023-02-01', '2023-02-02', 2, 2, 2, 2, 'OnNotice', 'Justification 2', 'Approved', NULL, 'Feedback 2');

-- Inserir dados na tabela report
INSERT INTO public.report (reportdata, usr_id) VALUES
    ('Report Data 1', 1),
    ('Report Data 2', 2);

-- Inserir dados na tabela notifications
INSERT INTO notifications (apt_id, usr_id, status, type) VALUES
    (1, 1, false, 'Pending'),
    (2, 2, true, 'Approved');
