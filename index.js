//DEPENDENCIES

const mysql = require("mysql");
const inquirer = require("inquirer");

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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    pickTask();
    ;
});
// a function to be called initially and after every action until the user wishes to quit
function pickTask() {
    console.log("\n\n");
    inquirer.prompt([
        {
            name: "task",
            message: "Select a task",
            type: "list",
            choices: ["Add department", "Add employee", "Add role", "Update employee's role", "View departments", "View employees", "View roles", "Quit"]
        }]).then(function (res) {
            if (res.task === "Add department") {
                addDepartment();
            }
            else if (res.task === "Add employee") {
                addEmployee();
            }
            else if (res.task === "Add role") {
                addRole();
            }
              else if(res.task === "Update employee's role"){
            updateRole();
            

              }
            
            else if (res.task === "View departments") {
                viewDepartment();
            }
            else if (res.task === "View employees") {
                viewEmployee();
            }
            else if (res.task === "View roles") {
                viewRole();
            }
        })
}
/////////ALL ADDING FUNCTIONS////////////////////////
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the new department's name?",
            type: "input"
        }]).then(function (res) {
            connection.query("INSERT INTO department (name) VALUES (?)", [res.name], function (err, result) {
                if (err) throw err;
                console.log("The department has been added");
                pickTask();
            })
        })
}
function addEmployee() {
    updateRolesArray();
    updateEmployeeArray();
    inquirer.prompt([
        {
            name: "firstname",
            message: "What is the new employee's first name?",
            type: "input"
        },
        {
            name: "lastname",
            message: "What is the new employee's last name?",
            type: "input"
        },
        {
            name: "role",
            message: "What is the new Employee's role?",
            type: "list",
            choices: rolesArray
        },
        {
            name: "manager",
            message: "Who is their manager?",
            type: "list",
            choices: employeeArray
        }
    ]).then(function (res) {
        var role_id;
        var manager_id;
        var manageranswer = res.manager;
        var manager = manageranswer.split(" ");

        let rolePromise = new Promise(function (resolve, reject) {
            connection.query("SELECT id FROM roles WHERE title = ?", [res.role], function (err, result) {
                role_id = result[0].id;

                resolve(role_id);
            })
        });
        let managerPromise = new Promise(function (resolve, reject) {
            connection.query("SELECT id FROM employee WHERE first_name = ? AND last_name = ?", [manager[0], manager[1]], function (err, result) {
                manager_id = result[0].id;

                resolve(manager_id);
            })
        });
        Promise.all([rolePromise, managerPromise, res]).then(function (values) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [values[2].firstname, values[2].lastname, values[0], values[1]], function (err, result) {
                if (err) throw err;
                console.log("The employee has been added\n");
                pickTask();

            })
        })

    })
}

function addRole() {
    updateDepartmentArray();
    inquirer.prompt([
        {
            name: "title",
            message: "What is the new role's title?",
            type: "input"
        },
        {
            name: "salary",
            message: "What is the new role's salary?",
            type: "input"
        },
        {
            name: "department",
            message: "What department is this role in?",
            type: "list",
            choices: departmentArray
        }
    ]).then(function (res) {
        var department_id;
        let departmentPromise = new Promise(function (resolve, reject) {
            connection.query("SELECT id FROM department WHERE name = ?", [res.department], function (err, result) {
                department_id = result[0].id;

                resolve(department_id);
            })
        });
        Promise.all([departmentPromise, res]).then(function (values) {
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [values[1].title, values[1].salary, values[0]], function (err, result) {
                if (err) throw err;
                console.log("The employee has been added \n");
                pickTask();
            }
            )
        })

 
})
}
// function updateDepartment(){

// }
// function updateEmployee(){

// }
function updateRole(){
    updateEmployeeArray();
  
    updateRolesArray();
    inquirer.prompt([
        {name:"test",
        message:"would you like to update?",
        type: "confirm"
        },
        {name:"employee",
        message:"choose and employee",
        type:"list",
        choices: employeeArray
        },
        {name: "role",
        message: "what is their new role?",
        type:"list",
        choices: rolesArray
        }
    ]).then(function(res){
        
        var role_id;
        var employee_id;
        var employeeanswer = res.employee;
        var employee = employeeanswer.split(" ");


        let employeePromise = new Promise(function (resolve, reject) {
            connection.query("SELECT id FROM employee WHERE first_name = ? AND last_name = ?", [employee[0], employee[1]], function (err, result) {
                employee_id = result[0].id;
                resolve(employee_id);
            })   
        });

        let rolePromise = new Promise(function(resolve, rejet){
            connection.query("SELECT id FROM roles WHERE title= ?", [res.role], function (err,result){
                role_id = result[0].id;
                resolve(role_id);
            })
        })
        Promise.all([employeePromise, rolePromise]).then(function(values){
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [values[1], values[0]], function(err,result){
                console.log(result);
            })
        })
        
    })
}
function viewEmployee() {
    connection.query("SELECT first_name, last_name, title, salary, name FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON department.id = roles.department_id", function (err, result) {
       
        console.table(result);
        pickTask();
    })

}
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, result) {
        console.table(result);
        pickTask();

    })
}
function viewRole() {
    connection.query("SELECT * FROM roles", function (err, result) {
        console.table(result);
        pickTask();

    })


}

//ALLOWS US TO USE THE DB INFO IN OUR INQUIRER PROMPTS
var employeeArray = [];
function updateEmployeeArray() {
    employeeArray = [];
    connection.query("SELECT first_name, last_name FROM employee", function (err, result) {
        for (i = 0; i < result.length; i++) {
            let employee = result[i].first_name + " " + result[i].last_name;
            employeeArray.push(employee);
        }
    })
}
var rolesArray = [];
function updateRolesArray() {
    rolesArray = [];
    connection.query("SELECT title FROM roles", function (err, result) {
        for (i = 0; i < result.length; i++) {
            let role = result[i].title;
            rolesArray.push(role);
        }
    })
}

var departmentArray = [];
function updateDepartmentArray() {
    departmentArray = [];
    connection.query("SELECT name FROM department", function (err, result) {
        for (i = 0; i < result.length; i++) {
            let department = result[i].name;
            departmentArray.push(department);
        }
    })
}