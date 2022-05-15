const {user, password} = require("./.env");
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
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
)

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
          default:
            exit();
        }
      });
  }


firstQuestions();


// View departments
const viewDepartments = () => {
    connection.query(queryDepartments, function(err, rows) {
      if (err) throw err;
      console.table(rows);
      firstQuestions();
    });
}

// View Roles
const viewRoles = () => {
    connection.query(queryRoles, function(err, rows) {
      if (err) throw err;
      console.table(rows);
      firstQuestions();
    });
}

// View Employees
const viewEmployees = () => {
    connection.query(queryEmployees, function(err, rows) {
      if (err) throw err;
      console.table(rows);
      firstQuestions();
    });
}



