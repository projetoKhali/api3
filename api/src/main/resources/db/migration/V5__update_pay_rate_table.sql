ALTER TABLE pay_rate_rules ADD COLUMN days_of_week SMALLINT;

create type shift as enum (
    'NightTime',
    'DayTime',
    'AllDay'
);

alter table pay_rate_rules add column shift shift;