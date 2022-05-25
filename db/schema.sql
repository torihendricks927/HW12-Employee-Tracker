DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

-- creating database named tracker and calling to use
USE tracker_db;

-- create 3 tables
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id),
);

CREATE TABLE role_ (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id)
  REFERENCES department(id),
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  role_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id)
  REFERENCES role(id),
);
