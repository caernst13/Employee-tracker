const inquirer = require('inquirer');
const connection = require('./config/connection')
const initialQuestion = require('./question')

const init = () => {inquirer.prompt(initialQuestion).then((data) => {
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
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        console.table(res)
        init();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT * FROM role JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        console.table(res)
        init();
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 'department', role.salary
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        console.table(res)
        init();
    });
};

const AddDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of your new department?',
            validate: newDepartmentInput => {
                if (newDepartmentInput) {
                    return true;
                } else {
                    console.log('Please enter a name for your new department')
                    return false;
                };
            }
        }
    ]).then((data) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        connection.query(sql, data.newDepartment, (err, res) => {
            if (err) {
                res.status(400).json({ error: err.message})
            };
            console.log('Departments updated') 
        });
    })
};

const AddRole = () => {
    const sql = 'SELECT department.name as name FROM department'
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        let departmentArray = []
        res.forEach((department) => {departmentArray.push(department.name)})
        console.log(departmentArray)
    })
}

init();