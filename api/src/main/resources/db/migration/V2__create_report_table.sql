-- Drop table

create table if not exists public.report (
	rp_id serial4 NOT NULL,
	reportdata varchar NULL,
	usr_id int4 NULL,
	insert_date timestamp NULL DEFAULT now(),
	constraint report_pkey PRIMARY KEY (rp_id)
);


