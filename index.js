const {user, password} = require("./.env");
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");
const clTable = require("console.table");
const db = require(".");

// Data variables
const queryDepartments = "SELECT * FROM department";
const queryRoles = "SELECT * FROM role";
const queryEmployees = "SELECT * FROM employee";

// Use .env
const connection = mysql.createConnection(
    {
        host: "localhost",
        user:  process.env.USER,
        password: process.env.PASSWORD,
        database: "employees"
    },
    console.log("Connected to the employees database")
);

// Prompt the questions
const firstQuestions= () => {
    inquirer
    .prompt({
      name: "menuOptions",
      type: "list",
      message: "Please choose an option.",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role"
      ],
      //a function will be called after an option is selected
    }).then(function(response) {
        switch (response.menuOptions) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Update an employee role":
            updateEmployee();
            break;
        };
      });
};

firstQuestions();

// View departments
const viewDepartments = () => {
    connection.query(queryDepartments, function(err, rows) {
      if (err) throw err;
      console.table(rows);
      firstQuestions();
    });
};

// View Roles
const viewRoles = () => {
    connection.query(queryRoles, function(err, rows) {
      if (err) throw err;
      console.table(rows);
      firstQuestions();
    });
};

// View Employees
const viewEmployees = () => {
    connection.query(queryEmployees, function(err, rows) {
      if (err) throw err;
      console.table(rows);
      firstQuestions();
    });
};


// Add a department
const addDepartment = () => {
    inquirer
    .prompt([{
        type: "input",
        name: "department",
        message: "Please enter the name of department you would like to add"
    }, ])
    .then(function(data) {
        connection.query('INSERT INTO department (department_name) VALUES (?)', [data.department], function(err, rows) {
            if (err) throw err;
            console.log("The department has beed added!");
           firstQuestions();
        });
    });
};

//Add a role
const addRole = () => {
    inquirer
    .prompt([
        {
            message: "Please enter the title of the role:",
            type: "input",
            name: "title"
        }, {
            message: "Please enter the salary of the role:",
            type: "number",
            name: "salary"
        }, {
            message: "Please enter the departement ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (data) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [data.title, data.salary, data.department_id], 
        function (err, rows) {
            if (err) throw err;
            console.log("The role has been added!");
            firstQuestions();
        });
    });
};

// Add an employee
const addEmployee =  () => {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Please enter the first name of the employee:",
          name: "First_name"
        },
        {
          type: "input",
          message: "Please enter the last name of the employee:",
          name: "Last_name"
        },
        {
          type: "input",
          message: "Please enter the role ID of the employee:",
          name: "Role_ID"
        },
        {
          type: "input",
          message: "Please enter the manager ID of the employee:",
          name: "Manager_ID"
        }
      ])
      .then(function(data) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
        [data.First_name, data.Last_name, data.Role_ID, data.Manager_ID], 
        function(err, rows) {
          if (err) throw err;
          console.log("The employee has been added!");
          firstQuestions();
        });
      });
};

//Update employee
const updateEmployee = () => {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Please enter the employee you would like to update:",
          name: "Update_employee"
        },
  
        {
          type: "input",
          message: "Please enter the role you would like to update:",
          name: "Update_role"
        }
      ])
      .then(function(data) {
        connection.query('UPDATE employee SET role_id= ? WHERE first_name= ?',
        [data.Update_role, data.Update_employee],function(err, rows) {
          if (err) throw err;
          console.log("The employee's information has been updated!")
          firstQuestions();
        });
      });
};