insert into customer (email, hash_id)
values(${email}, ${hash_id})
returning *;