DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

-- creating database named tracker and calling to use
USE tracker_db;

-- create 3 tables
CREATE TABLE department (
  id INT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
);
