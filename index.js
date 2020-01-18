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
// a function to be called initially and after every action until the user wishes to quit
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
      else if(res.task === "Add role"){
        addRole();
      }
      else if(res.task === "Update department"){
practiceJoins();
      }
      else if(res.task === "Update employee"){
        updateEmployeeArray();
      }
    //   else if(res === "Update role"){

    //   }
       else if(res.task === "View department"){
        viewDepartment();
      }
      else if(res.task === "View employee"){
        viewEmployee();
      }
      else if(res.task === "View role"){
        viewRole();
      }
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
    updateEmployeeArray();
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
        message: "What is the new Employee's role?",
        type: "list",
        choices: rolesArray
        },
        {name: "manager",
        message: "Who is their manager?",
        type: "list",
        choices: employeeArray
        }
    ]).then(function(res){
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [res.firstname,res.lastname,res.role, res.manager], function(err, result){
                if(err) throw err;
                console.log(result)
                console.log("The employee has been added");
                pickTask();
            
})
})}
function addRole(){
    inquirer.prompt([
        {name: "title",
        message: "What is the new role's title?",
        type: "input"
        },
        {name: "salary",
        message: "What is the new role's salary?",
        type: "input"
        },
        {name: "department",
        message: "What department is the id?",
        type: "number"
        }
    ]).then(function(res){
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [res.title,res.salary,res.department], function(err, result){
                if(err) throw err;
                console.log(result)
                console.log("The role has been added");
                pickTask();
            
})
})
}
// function updateDepartment(){

// }
// function updateEmployee(){

// }
// function updateRole(){
//     inquirer.prompt([
//         {name:"role",
//         message:"what is their new role?",
//         choices:[]// [trying to figur eit out]
//         },
//         {name:"employee",
//         message:"choose and employee",
//         choices:[]
//         }
//     ]).then(function(res){
//         connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role, res.employee], function(err,result){
//             console.log(query);
//         })
//     })
// }
function viewDepartment(){
    connection.query("SELECT * FROM department", function(err, result){
        for (let i =0; i <result.length; i++){
            console.log("ID: " +result[i].id +"           Name: " + result[i].name);
        }
    pickTask();
    })

}
function viewEmployee(){
    connection.query("SELECT * FROM employee", function(err, result){
        for(let i = 0; i < result.length; i++){
            console.log("First name: " +result[i].first_name+ "        Last name: "+ result[i].last_name + "         Role id:"+ result[i].manager_id);
        }
    })
}
function viewRole(){
    connection.query("SELECT * FROM role", function(err,result){
        for(let i = 0; i < result.length; i++){
            console.log("Title: " +result[i].title+ "       Salary: "+ result[i].salary + "        Department id:"+ result[i].department_id);
        }
    })

}
function practiceJoins(){
    let queryString= "SELECT first_name, last_name, title, salary FROM employee t1 INNER JOIN roles t2 ON t1.role_id = t2.id";
    connection.query(queryString, function(err,result){
        console.log(result)
    })
}
var employeeArray=[];
function updateEmployeeArray(){
    employeeArray =[];
    connection.query("SELECT first_name, last_name FROM employee", function(err, result){
        for(i=0; i < result.length; i ++){
            let employee = result[i].first_name + " " +result[i].last_name;
            employeeArray.push(employee);
        }
    //     console.log(employeeArray);
    // return(employeeArray);
    })
}
var rolesArray=[];
function updateRolesArray(){
    rolesArray =[];
    connection.query("SELECT title FROM roles", function(err, result){
        for(i=0; i < result.length; i ++){
            let role = result[i].title
            rolesArray.push(role);
        }
    //     console.log(employeeArray);
    // return(employeeArray);
    })
}
// function update

var departmentArray= [];
function updateDepartmentArray(){
    departmentArray=[];
    connection.query("SELECT name FROM department", function(err,result){
        for(i=0; i < result.length; i++){
            let department = result[i].name;
            departmentArray.push(department);
        }
    })
}