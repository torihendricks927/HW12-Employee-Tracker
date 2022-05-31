//  const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

// const app = express();
// const PORT = process.env.PORT || 3001;

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // port: 3001,
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Dobetter1!",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

// connecting to mysql
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected");
});
// Beginning prompt to show main menu
const mainMenu = () => {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message:
          "Welcome to the Employee Tracker, please select from the following options:",
        choices: [
          "View Departments",
          "View Employees",
          "View Roles",
          "Add an employee",
          ,
          "Add a role",
          "Add a department",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      // switched response connection to name "menu" instead of choices
      if (response.menu === "View Departments") {
        viewDepartments();
      } else if (response.menu === "View Employees") {
        viewEmployees();
      } else if (response.menu === "View Roles") {
        viewRoles();
      } else if (response.menu === "Add an employee") {
        addNewEmployee();
      } else if (response.menu === "Add a role") {
        addNewRole();
      } else if (response.menu === "Add a department") {
        addNewDepartment();
      } else if (response.menu === "Update an employee role") {
        employeeRoleUpdate();
      } else {
        // db.end();
        console.log("Thank you for choosing our service");
      }
    });
};

// var to show current information in sql tables
const viewDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    console.log(err);
    console.table(results);
    mainMenu();
  });
};

const viewRoles = () => {
  db.query(`SELECT * FROM roles`, function (err, results) {
    // console.log(results);
    console.table(results);
    mainMenu();
  });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employees`, function (err, results) {
    // console.log(results);
    console.table(results);
    mainMenu();
  });
};
// add employee to table
const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the role ID for the employee?",
        name: "role_id",
      },
      {
        type: "input",
        message:
          "If employee has a manager, what is the manager ID? If none, insert null.",
        name: "manager_id",
      },

      // {
      //     type: "confirm",
      //     message: "Is the new employee a manager?",
      //     name: "manager_id",
      // },
    ])
    .then((response) => {
      var managerID = [];
      if (response.manager_id === "null") {
        managerID = null;
      } else {
        managerID = response.manager_id;
      }
      db.query("INSERT INTO employees SET ?", {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: response.role_id,
        manager_id: managerID,
        // manager_id: response.manager_id|null,
      });
      viewEmployees();
    });
};

// add a new role
const addNewRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new role? ",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary for the new role? ",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department ID for the new role? ",
        name: "department_id",
      },

    ])
    .then((response) => {
      db.query("INSERT INTO roles set ?", {
        title: response.title,
        salary: response.salary,
        department_id: response.department_id
       
      });
      viewRoles();
    });
};


// adding new department
const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department? ",
        name: "department_name",
      },
    ])
    .then((response) => {
      db.query("INSERT INTO department set ?", {
        department_name: response.department_name,
      });
      viewDepartments();
    });
};


// update an employee
const employeeRoleUpdate = () => {
//    var employeeOptions = viewEmployees;
//    var roleOptions = viewRoles;

    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee do you want to update?",
            choices: viewEmployees(),
        },
        {
            type: "list",
            name: "role",
            message: "What is the new role?",
            choices: viewRoles(),
        }
])
.then((response) => {
    // db.query("SELECT * FROM EMPLOYEE", (response) => {
    //     var employeeOptions = [];
    //     response.forEach(({ first_name, last_name, id}) => {
    //         employeeOptions.push({
    //             name: first_name + " " + last_name,
    //             value: id
    //         });
    //     });

    // db.query("SELECT * FROM ROLE", (response) => {
    //     var roleOptions = [];
    //     response.forEach(({ title, id}) => {
    //         roleOptions.push({
    //             name: title,
    //             value: id
    //         });
    //     });

   
    db.query(" UPDATE EMPLOYEE SET role_id = ? WHERE id = ?;", {
        role_id: res.role,
        employees : res.employee,
    })

    console.log("Role has been changed");
    viewEmployees();

   
    });
//     })
//     })
 }

mainMenu();

module.exports = db;
