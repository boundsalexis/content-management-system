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
    pickTask();
;});

function pickTask(){
    inquirer.prompt([
        {name: "task",
        message: "Select a task",
        type: "list",
        choices: ["Add department", "Add employee", "Add role", "Update department", "Update employee", "Update role", "View department", "View employee", "View role","Quit"]
    }]).then(function(res){
      if(res.task === "Add department"){
        addDepartment();
      }
      else if (res.task === "Add employee"){
        addEmployee();
      }
    //   else if(res === "Add role"){

    //   }
    //   else if(res === "Update department"){

    //   }
    //   else if(res === "Update employee"){

    //   }
    //   else if(res === "Update role"){

    //   }
    //    else if(res === "View department"){

    //   }
    //   else if(res === "View employee"){

    //   }
    //   else if(res === "View role"){

    //   }
    })
}

function addDepartment(){
    inquirer.prompt([
        {name: "name",
        message: "What is the new department's name?",
        type: "input"
        }]).then(function(res){
            connection.query("INSERT INTO department (name) VALUES (?)", [res.name], function(err, result){
                if(err) throw err;
                console.log(result);
                console.log("The department has been added");
                pickTask();
            })
        })
}
function addEmployee(){
    inquirer.prompt([
        {name: "firstname",
        message: "What is the new employee's first name?",
        type: "input"
        },
        {name: "lastname",
        message: "What is the new employee's last name?",
        type: "input"
        },
        {name: "role",
        message: "What is the new employee's role id?",
        type: "number"
        },
        {name: "manager",
        message: "What is the new employee's manager id?",
        type: "number"
        }
    ]).then(function(res){
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [res.firstname,res.lastname,res.role, res.manager], function(err, result){
                if(err) throw err;
                console.log(result)
                console.log("The employee has been added");
                pickTask();
            
})
})}
// function addRole(){

// }
// function updateDepartment(){

// }
// function updateEmployee(){

// }
// function updateRole(){

// }
// function viewDepartment(){

// }
// function viewEmployee(){

// }
// function viewRole(){

// }
