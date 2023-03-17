const inquirer = require('inquirer');
const connection = require('./config/connection')
const initialQuestion = require('./question')

const init = () => {inquirer.prompt(initialQuestion).then((data) => {
    console.log(data)
    switch (data.action) {
        case 'View all departments': viewAllDeparments(); break;
        case 'View all roles': viewAllRoles(); break;
        case 'View all employees': viewAllEmployees(); break;
        case 'Add a department': AddDepartment(); break;
        case 'Add a role': AddRole(); break
        case 'Add an employee': AddEmployee(); break;
        case 'Update an employee role': updateEmployee(); break;
        default: process.exit();
      };
})};

const viewAllDeparments = () => {
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        console.table(res)
        init();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT role.id AS id, role.title AS title, role.salary AS salary FROM role JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        console.table(res)
        init();
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        console.table(res)
        init();
    });
};

init();