use world;

-- 1. Find country name with most population from table country
select * from country order by population desc limit 1;
select Name, Population 
from country 
where Population = (select max(Population ) from country);
-- order by population desc
-- limit 1;

-- 2. Find the second one country with most population from table country
select * from country order by population desc limit 1 offset 1;
select Name, Population 
from country 
where Population < (select max(Population) from country)
order by Population desc 
limit 1;

-- 3. Find country name with lowest population from table country
Select Name, Population
from country 
where Population = (select min(population) from country)
order by name asc;

-- 4. Find the third one country with lowest population from table country
Select Name, Population
from country 
where Population > (select min(population) from country)
order by population 
limit 1 offset 1;

-- 5. Find the largest continent by sum surface area with life expectancy more than 75
select * from country;
select Continent , sum(SurfaceArea) as total_surface 
from country 
where LifeExpectancy > 75 
group by continent 
order by total_surface  desc limit 1;