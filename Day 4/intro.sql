create database db_purwadhika;
create database db_contoh;

show databases; 
show create database db_purwadhika;

use db_purwadhika;

drop database db_contoh;

create table students(name varchar(30) not null, marks Integer);

alter table students add address varchar(100) not null;

create table contoh (contoh varchar(255));
drop table contoh;

insert into students(name,marks,address) values ('ikmal','100','jakarta');
insert into students(name,marks,address)values ('ayesha','90','cibubur');
insert into students(name,marks,address)values ('Hanief','50','jakarta');
select * from students ; -- select all colums in table students
select * from students where address = 'jakarta' and marks > 40;
select * from students where address = 'jakarta' or marks > 40;

select distinct address from students;
select count(name) total_students, address from students group by address;
select avg(marks) avg_marks_students, address from students group by address;
select name from students; -- select name colums in table students

select * from  students where name like '%mal%'; -- nama terdapat mal 
select * from  students where name like '%mal'; -- nama diakhiri dengan mal
select * from  students where name like 'mal%'; -- nama diawali dengan mal

select * from students order by name desc; -- sort students by marks decending
select * from  students order by marks; -- sort students by marks ascending 

select name,address,marks as nilai from students where marks > 50 group by name,address,marks;
select name,address,marks as nilai from  students  group by name,address,marks having marks > 50;

select * from students ;
select * from students limit 2 offset 0;
select * from students limit 2 offset 2 ;

select count(name),address from students where name like '%i%' group by address ;
select count(name),address from students group by address having name like '%i%';

update students set address = 'jakarta',marks =50 where name ='ikmal';
update students set address = 'cibubur' where name ='ayesha';
update students set address = 'purwadhika';

set sql_safe_updates = 0; -- di sable
delete from students where name = 'ikmal'; -- mengahapus data student 
delete from students where name = 'ayesha';
delete from students where name = 'Hanief';