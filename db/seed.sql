drop table if exists customer
drop table if exists password


create table password (
hash_id serial primary key,
hash_value text
);

create table customer(
cust_id serial primary key,
email varchar(180),
hash_id int references password(hash_id)
);
insert into password (hash_value)
values ('password');

insert into customer (email, hash_id)
values('john@lew.com', 1);