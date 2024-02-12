-- 1. Try to create table with output 
use purwadhika_branch;
create table branch(id INT AUTO_INCREMENT PRIMARY KEY not null,BRANCH_NAME varchar(225) not null, pic varchar(225) not null,address varchar(225) not null,city varchar(225) not null,province varchar(225) not null);
drop table branch;

insert into branch(BRANCH_NAME,pic,address,city,province) values ("BSD","THOMAS","GREEN OFFICE PARK 9","BSD","TANGERANG") ; 
insert into branch(BRANCH_NAME,pic,address,city,province) values ("JKT","BUDI","MSIG TOWER","JAKARTA SELATAN","JAKARTA") ; 
insert into branch(BRANCH_NAME,pic,address,city,province) values ("BTM","ANGEL","NONGSA","BATAM","KEP.RIAU") ; 


set sql_safe_updates = 0; -- disable

-- 2. Change PIC name into Dono if city is BSD
update branch set pic = "Dono" where city = "BSD";

-- 3. Add another branch with branch name BLI, pic is Tono, address is Gianyar, city is Gianyar, province is Bali
insert into branch(BRANCH_NAME,pic,address,city,province) values ("BLI","TONO","GIANYAR","GIANYAR","BALI") ; 
select * from branch;