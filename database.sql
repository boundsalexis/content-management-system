DROP DATABASE IF EXISTS my_company;
CREATE DATABASE my_company;
USE my_company;

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary decimal,
    department_id INT 
);

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30)

);

