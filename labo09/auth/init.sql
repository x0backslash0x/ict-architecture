drop user if exists 'auth_user'@'%';
drop database if exists auth;

create user 'auth_user'@'%' identified by 'Auth123';
create database auth;
grant all on auth.* to 'auth_user'@'%';

use auth;
create table Users (
    id int not null auto_increment primary key,
    email varchar(255) not null unique,
    password varchar(255) not null
);

insert into Users (email, password) values ('vincent.nys@ap.be', 'Admin123');
