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
select actor.actor_id, count(film_actor.film_id)  as film_count, actor.first_name,actor.last_name from actor inner join actor on actor.actor_id = film_actor.actor_id GROUP BY actor.actor_id ORDER BY film_count DESC LIMIT 10;


SELECT * FROM ACTOR;
SELECT * FROM film_actor;
SELECT * FROM film;