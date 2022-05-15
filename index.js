const {user, password} = require("./.env");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: "employee_db"
    },
    console.log("Connected to the employees database")
)