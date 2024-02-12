use sakila; 
-- 1. Add new actor into table actors with name JHONNY DAVIS
insert into actor(first_name,last_name) values('JHONNY','DAVIS');

-- 2. There are several new actor to add. Add new actor into table actors with name ADAM DAVIS, JEREMY DAVIS,
-- CRAIG DAVIS, STEVE DAVIS in a single query.
insert into actor(first_name,last_name) values('ADAM','DAVIS'),('JEREMY','DAVIS'),('CRAIG','DAVIS'),('STEVE','DAVIS') ;

-- 3. Count how many actors with last name DAVIS.
select count(last_name) from actor where last_name = "DAVIS";

-- 4. Delete actor with last name DAVIS and first name JENNIFER.
delete from actor where last_name = "DAVIS" and first_name = "JENNIFER";

-- 5. Update actor with last name DAVIS and change his/her first name into GEORGE
set sql_safe_updates = 0; -- disable
update actor set first_name = "GEORGE" where last_name = "DAVIS";

-- 6. Find top 10 actor with the most perform on film.
select actor.actor_id, actor.first_name, actor.last_name, count(film_actor.actor_id) as film_count from actor inner join film_actor on actor.actor_id = film_actor.actor_id GROUP BY actor.actor_id ORDER BY film_count DESC LIMIT 10;

-- 7. Display title, description, length, and rating from film, where special features include deleted scenes and behind
-- the scenes order by most length
select title, description, rating, length,special_features from film where special_features like '%Deleted Scenes,Behind the Scenes%' order by length;

-- 8. Display country and total of inactive customer (active = 0) from country where customer active = 0 order by the
-- highest inactive (active = 0) customer

select customer_list.country, count(*) as inactive_count  
from customer  
inner join customer_list on customer_list.ID = customer.customer_id 
where active = 0 
group by country
order by inactive_count desc  ;

SELECT * FROM ACTOR;
SELECT * FROM film_actor;
SELECT * FROM film;
select * from customer_list;
SELECT * FROM customer;
SELECT * FROM country;