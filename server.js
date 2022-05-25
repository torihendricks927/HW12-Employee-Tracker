 const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

const app = express();
const PORT = process.env.PORT || 3001;


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3001,
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
    console.log(connected);
});
// Beginning prompt to show main menu
const mainMenu = () => {
    inquirer.prompt([{
        name: "Main Menu",
        type: "list",
        message: "Welcome to the Employee Tracker, please select from the following options:",
        choices: [
            "View Departments",
            "View Employees",
            "View Roles",
            "Exit",
        ]
    },
]).then((response) => {
        if (response.choices === "View Departments") {
            viewDepartments();
        } else if (response.choices === "View Employees") {
            viewEmployees();
        } else if (response.choices === "View Roles") {
            viewRoles(); 
        } else {
            db.end();
        }
})
};

// var being called in inquirer prompt to show tables
const viewDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        // console.log(results);
        console.table(results);
        mainMenu();
      });
}

const viewRoles = () => {
    db.query(`SELECT * FROM role_`, function (err, results) {
        // console.log(results);
        console.table(results);
        mainMenu();
      });
}

const viewEmployees = () => {
    db.query(`SELECT * FROM employess`, function (err, results) {
        // console.log(results);
        console.table(results);
        mainMenu();
      });
}



//   app.get('/db', (req,res) => {
//       let sql = 'CREATE DATABASE tracker_db';
//       db.query(sql, (err, result) => {
//           if(err) throw err;
//           console.log(result);
//           res.send('created database');
//       })
//   }
//   )
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

mainMenu();

  
