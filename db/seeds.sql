INSERT INTO department (id, department_name)
VALUES (001, "Georgia Retina");
       
INSERT INTO role_ (id, title, salary, department_id)
VALUES (10, "Technician", 50000, 001),
       (20, "Physician", 100000, 001),
       (30, "Manager", 80000, 001);
       
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Johnny", "Depp", 10, NULL),
       (2, "Amber", "Heard", 20, NULL),
       (3, "Jason", "Momoa", 30, 123);
       
