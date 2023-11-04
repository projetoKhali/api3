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
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1809, 1.1429, 2, 30,  'Overtime'::Apt_type, 'NightTime'::Shift_type, true,  127);

INSERT INTO appointments (start_date, end_date, usr_id, clt_id, rc_id, prj_id, appointment_type, justification) VALUES ('2023-10-31 13:00:00', '2023-10-31 17:00:00', 1, 1, 1, 1, 'Overtime'::Apt_type, 'teste');
