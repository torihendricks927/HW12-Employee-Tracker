INSERT INTO department (department_name)
VALUES ('Georgia Retina'),
    ('Gainesville Eye Associates');
       
INSERT INTO roles (title, salary, department_id)
VALUES ('Technician', 50000, 1),
       ('Physician', 100000, 2),
       ('Manager', 80000, 1);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Depp", 1, 1),
       ("Amber", "Heard", 2, 1),
       ("Jason", "Momoa", 3, 1);
       
