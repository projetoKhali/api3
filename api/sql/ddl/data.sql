insert into users (registration, name, user_type, email, password) values ('123', 'emp', 'Employee'::user_type, 'e@m.p', '1');
insert into users (registration, name, user_type, email, password) values ('124', 'man', 'Manager'::user_type, 'm@a.n', '1');
insert into users (registration, name, user_type, email, password) values ('125', 'adm', 'Admin'::user_type, 'a@d.m', '1');

insert into result_centers (name, code, acronym, gst_id) values ('result center', 1, 'rc', 2);

insert into members (usr_id, rc_id) values (1, 1);

insert into clients (name, cnpj) values ('client', '1');

insert into projects (name, description) values ('project', 'Khali API3 test project');
