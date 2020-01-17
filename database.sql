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

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Salle', 'mae', 1,2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('jacob', 'jingleheimer', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kevon', 'james', 3 ,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'autstin',4,2);


INSERT INTO roles (title, salary, department_id) VALUES ('manager', 200000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('cashier', 30000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('stocker', 30000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('cleaner', 20000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('customer service', 30000, 1);

INSERT INTO department (name) VALUES ('frontend');
INSERT INTO department (name) VALUES ('backend');
