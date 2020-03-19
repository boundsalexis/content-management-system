# Content Management System
Connects to a database and allows you to add new departments, roles and emploees


# links
> [GitHub Repository](https://github.com/boundsalexis/content-management-system)

## Images
![Final Product](/3mhdit.gif)

# Technologies Used
> Node JS 
> Mysql Databse
 
# Installation
Do these before running the file
- Install MySQL Workbench
 - Clone from github repo
 - Run NPM Install
 - In the index.js file change your user and password (line 13, 16)
 - If you want to change the database name, change it in the database.sql file and in the index.js file
 - Be aware that our DB file drops any existing DB named my_company
 - Copy and paste the database.sql file into your MySQL Workbench 
 



# Summary
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business


# Code Snippet
```javascript
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
```
> Allows prompt choices to be dynamic and accurate
``` javascript
let managerPromise = new Promise(function (resolve, reject) {
            connection.query("SELECT id FROM employee WHERE first_name = ? AND last_name = ?", [manager[0], manager[1]], function (err, result) {
                manager_id = result[0].id;

                resolve(manager_id);
            })
        });
```
> This is how i took the answers from the prompt and got the associated id

# Jest
> When I was testing with Jest it became abundantly clear how useful it can be.
> I built the classes in under an hour and spent too many hours testing the rest of the program manually


## Authors

* **Alexis Bounds** 

- [Link to Portfolio Site](https://github.com/boundsalexis/basic-portfolio)
- [Link to Github](https://github.com/boundsalexis)
- [Link to LinkedIn](https://www.linkedin.com/in/alexis-bounds-9b7711169/)