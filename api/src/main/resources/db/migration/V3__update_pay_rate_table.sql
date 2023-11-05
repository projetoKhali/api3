CREATE TYPE Shift_type AS ENUM (
    'NightTime',
    'DayTime',
    'AllDay'
);

alter table pay_rate_rules add column shift_type Shift_type default 'AllDay';
alter table pay_rate_rules add days_of_week SMALLINT;