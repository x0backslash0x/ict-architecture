CREATE DATABASE IF NOT EXISTS Customers;
USE Customers;

create table Customers (
	id INT not null,
	first_name VARCHAR(50) not null,
	last_name VARCHAR(50) not null,
	email VARCHAR(50) not null
);
insert into Customers (id, first_name, last_name, email) values (1, 'Rooney', 'Sands', 'rsands0@dell.com');
insert into Customers (id, first_name, last_name, email) values (2, 'Susanetta', 'McNiff', 'smcniff1@simplemachines.org');
insert into Customers (id, first_name, last_name, email) values (3, 'Michael', 'Hogben', 'mhogben2@multiply.com');
insert into Customers (id, first_name, last_name, email) values (4, 'Freeland', 'Rentz', 'frentz3@blinklist.com');
insert into Customers (id, first_name, last_name, email) values (5, 'Carey', 'McCowan', 'cmccowan4@simplemachines.org');
insert into Customers (id, first_name, last_name, email) values (6, 'Willow', 'Cameli', 'wcameli5@comsenz.com');
insert into Customers (id, first_name, last_name, email) values (7, 'Leoline', 'Eckly', 'leckly6@surveymonkey.com');
insert into Customers (id, first_name, last_name, email) values (8, 'Lebbie', 'Zoellner', 'lzoellner7@gizmodo.com');
insert into Customers (id, first_name, last_name, email) values (9, 'Teddie', 'Etches', 'tetches8@123-reg.co.uk');
insert into Customers (id, first_name, last_name, email) values (10, 'Marni', 'Nicol', 'mnicol9@state.gov');
