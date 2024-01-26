-- 1. Create db name as purwadhika_student, purwadhika_schedule, purwadhika_branch
create database purwadhika_student;
create database purwadhika_schedule;
create database  purwadhika_branch;

-- 2. Show list of database with name contain purwadhika.
show databases;

-- 3. Delete database purwadhika_schedule
drop database purwadhika_student;
drop database purwadhika_schedule;
drop database purwadhika_branch;

-- 4. Create table name as Students in purwadhika_student db, with field id, last_name, first_name, address, city. The
-- id field should be in integer type while the rest is varchar.
use purwadhika_student;
create table Students(name varchar(30) not null, Id Integer not null,first_name  varchar(30) not null, last_name varchar(30) not null, address varchar(30) not null,city varchar(30) not null);

-- 5. Add email column into table Students with type varchar.
alter table Students add column email varchar (100) not null;

-- 6. Add gender, batch_code, phone_number, alternative_phone_number column in single query.
alter table Students add column gender varchar(100) not null,add column  batch_code int not null,add column phone_number  int not null,add column alternative_phone_number  varchar(100) not null;

-- 7. Change alternative_phone_number column name into description with varchar type.
alter table Students rename column alternative_phone_number to decription;

-- 8. Remove column gender in table Students 
alter table Students drop column gender;

drop table Students;

select * from Students;




