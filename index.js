//DEPENDENCIES

const mysql = require("mysql");
const inquirer =require("inquirer");

// CREATE CONNECTION TO MYSQL DATABASE

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "my_company"
  });

// function to excute upon connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
;});

//do not need a listener because we are not interacting with the browser

