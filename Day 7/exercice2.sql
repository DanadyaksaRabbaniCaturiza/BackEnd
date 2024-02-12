use sakila; 

-- 1. Show all data using IN, and display the country_id and country columns of the following countries: China,
-- Bangladesh, and India 
select * from country;
select country_id , country from country 
where country in ("China","Bangladesh","India") ;

-- 2. Find every actors whose last names contain the letters OD. Order the rows by last name and first name, in that
-- order
select last_name,first_name from actor
where last_name like "%OD%" order by last_name;

-- 3. Modify table actors. Add a middle_name column to the table actor. Position it between first_name and
-- last_name. Hint: you will need to specify the data type.
select*from actor;
alter table actor add column middle_name varchar(30) after first_name;

-- 4. List every last names of actors and the number of actors who have that last name, but only for names that are
-- shared by at least two actors
select*FROM ACTOR;
select last_name ,count(*) from actor
group by last_name
having count(*) > 1
order by count(*) asc;

-- 5. Join the table and display the first and last names, as well as the address, of each staff member.
select * from staff;
select * from staff_list;

select staff.first_name, staff.last_name, staff_list.address 
from staff join staff_list on staff.staff_id= staff_list.ID ;


-- 6. Find out how many copies of the film “Hunchback Impossible” exist in the inventory system
select*from inventory;
select*from film;

select film.film_id,film.title, count(*) as copies 
from film join inventory on film.film_id = inventory.film_id 
where film.title = "Hunchback Impossible"
group by film.film_id;

-- 7. Find and display the most frequently rented movies in descending order.
select * from film;
select * from rental;
select * from film order by rental_rate desc,film_id asc limit 1;

-- 8. Write down a query in order to display each store its store ID, city, and country
select*from store;
select*from address;
select*from city;
select*from country;

select store.store_id , city.city, country.country
from store join address on store.address_id = address.address_id 
join city on address.city_id = city.city_id
join country on city.country_id = country.country_id; 

-- 9. Use subqueries to display every actors who appear in the film Alone Trip.
select * from actor;
select * from film;
select * from film_actor;

select * from actor where actor_id in(
select actor.actor_id 
from film_actor join actor on film_actor.actor_id = actor.actor_id
where film_id = (select film_id from film where title = 'ALone Trip'));

-- select actor_id from film_actor join film on film_actor.film_id  =  film.film_id where title = "Alone trip";

-- 10. Delete the middle_name column from table actors
select* from new_actor;
ALTER TABLE actor
DROP COLUMN middle_name;