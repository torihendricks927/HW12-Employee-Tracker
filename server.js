 const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

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

db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
  });

  app.get('/db', (req,res) => {
      let sql = 'CREATE DATABASE tracker_db';
      db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('created database');
      })
  }
  )
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });



  
