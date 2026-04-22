CREATE DATABASE IF NOT EXISTS Products;
USE Products;

create table Products (
	id INT NOT NULL,
	description VARCHAR(50) NOT NULL,
	price VARCHAR(50) NOT NULL
);
insert into Products (id, description, price) values (1, 'Organic Coconut Oil', 8.99);
insert into Products (id, description, price) values (2, 'Chipotle Sauce', 3.29);
insert into Products (id, description, price) values (3, 'Plant-Based Protein Bars', 19.99);
insert into Products (id, description, price) values (4, 'LED Strip Lights', 19.99);
insert into Products (id, description, price) values (5, 'Elegant Maxi Skirt', 44.99);
insert into Products (id, description, price) values (6, 'Coconut Cream Pie Yogurt', 1.99);
insert into Products (id, description, price) values (7, 'Thai Coconut Curry Sauce', 3.99);
insert into Products (id, description, price) values (8, 'Cotton Sweatpants', 29.99);
insert into Products (id, description, price) values (9, 'Caramel Apple Chips', 3.49);
insert into Products (id, description, price) values (10, 'Protein Powder', 44.99);
