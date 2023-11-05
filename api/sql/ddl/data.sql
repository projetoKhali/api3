INSERT INTO users (registration, name, user_type, email, password) VALUES ('123', 'emp', 'Employee'::user_type, 'e@m.p', '1');
INSERT INTO users (registration, name, user_type, email, password) VALUES ('124', 'man', 'Manager'::user_type, 'm@a.n', '1');
INSERT INTO users (registration, name, user_type, email, password) VALUES ('125', 'adm', 'Admin'::user_type, 'a@d.m', '1');

INSERT INTO result_centers (name, code, acronym, gst_id) VALUES ('result center', 1, 'rc', 2);

INSERT INTO members (usr_id, rc_id) VALUES (1, 1);

INSERT INTO clients (name, cnpj) VALUES ('client', '1');

INSERT INTO projects (name, description) VALUES ('project', 'Khali API3 test project');

INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1100, 1, 1, 75, 'Overtime'::Apt_type, 'DayTime'::Shift_type, false, 62);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1200, 1, 1, 100, 'Overtime'::Apt_type, 'NightTime'::Shift_type, false, 62);
INSERT INTO pay_rate_rules (code, hour_duration, min_hour_count, pay_rate, appointment_type, shift, overlap, days_of_week) VALUES (1300, 1, 1, 225, 'Overtime'::Apt_type, 'AllDay'::Shift_type, false, 65);
