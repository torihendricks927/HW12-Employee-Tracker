-- creating connection to department and role
SELECT department.department_name AS department
FROM roles
LEFT JOIN department
ON roles.department_id = department.id
ORDER BY department.department_name;

-- creating connection to role and employee
SELECT roles.title AS roles
FROM employee
LEFT JOIN role_
ON employee.role_id = roles.id
ORDER BY role_.id;

-- creating connection ot id and manager id in employee
SELECT employee.first_name AS employee
-- FROM employee
-- LEFT JOIN department
ON employee.manager_id = employee.id
ORDER BY employee.first_name;