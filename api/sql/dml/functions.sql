create or replace function fc_desabilitar (usr_id int) returns void as
$$ begin
       update users set
       expire_date = now(),
       active = false
       where id = usr_id;
end; $$ language plpgsql



