//  const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

// const app = express();
// const PORT = process.env.PORT || 3001;


// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // port: 3001,
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Dobetter1!',
    database: 'tracker_db',
  },
  console.log(`Connected to the tracker_db database.`)
);

// connecting to mysql
db.connect((err) => {
    if(err){
        throw err;
   }
    console.log("connected");
});
// Beginning prompt to show main menu
const mainMenu = () => {
    inquirer.prompt([{
        name: "menu",
        type: "list",
        message: "Welcome to the Employee Tracker, please select from the following options:",
        choices: [
            "View Departments",
            "View Employees",
            "View Roles",
            "Add an employee",,
            "Add a role",
            "Add a department",
            "Update an employee role",
            "Exit",
        ]
    },
]).then((response) => {
    console.log(response)
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
})
};

// var to show current information in sql tables
const viewDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
         console.log(err);
        console.table(results);
        mainMenu();
      });
}

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, function (err, results) {
        // console.log(results);
        console.table(results);
        mainMenu();
      });
}

const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, function (err, results) {
        // console.log(results);
        console.table(results);
        mainMenu();
      });
}
// add employee to table
const addNewEmployee = () => {
    inquirer.prompt([{
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
        message: "What is the employee's role ID?",
        name: "role_id",
    },
    {
        type: "input",
        message: "Is the new employee a manager? If so, enter manager ID. Otherwise, enter 0",
        // validate: (response) => {
        //     if(response === "Yes") {
        //         return true
        //     } else return false
        // },
        name: "manager_id", 
    },
]).then((response) => {
    db.query('INSERT INTO employees SET ?', {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: response.role_id,
        manager_id: response.manager_id,
    })
    viewEmployees()
    // mainMenu()
})
}

mainMenu();

module.exports = db;

  
