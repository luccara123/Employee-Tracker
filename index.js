const {user, password} = require("./.env");
require("dotenv").config();
const inquirer = require("inquirer");
const db = require("./db");

// Use .env
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: "employee_db"
    },
    console.log("Connected to the employees database")
)

// Prompt the questions
const FirstQuestions= () => {
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

FirstQuestions();
