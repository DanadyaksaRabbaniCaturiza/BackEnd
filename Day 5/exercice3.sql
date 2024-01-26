USE SAKILA;

-- 1. Display the first and last names of all actors from the table actor.
SELECT first_name,last_name from actor;

-- 2. You need to find the ID number, first name, and last name of an actor, of whom you know only the first
-- , "Joe." What is one query would you use to obtain this information?
SELECT actor_id,first_name,last_name from actor where first_name = "Joe";

-- 3. Display the address, district, and city_id from address only for district: California, Alberta and Mekka
SELECT address, district,city_id from address where district in ("California","Alberta","Mekka");

-- 4. Count actor with last name WOOD from table actors.
SELECT count(last_name) from actor  where last_name = "WOOD";

-- 5. Shows list of customer_id and sum of amount spent that made payment more than 20.
SELECT customer_id, sum(amount) from payment where amount > 20 group by customer_id;

SELECT * FROM ADDRESS;
SELECT * FROM ACTOR;
SELECT * FROM CUSTOMER;
SELECT * FROM PAYMENT;