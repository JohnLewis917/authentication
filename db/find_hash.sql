select * from customer
join password on customer.hash_id = password.hash_id
where email = $1;