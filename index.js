const inquirer = require('inquirer');
// const connection = require('./config/connection')
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
})}

init()