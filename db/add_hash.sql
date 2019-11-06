insert into password (hash_value)
values ($1)
returning hash_id;