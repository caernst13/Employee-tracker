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
    WHERE department.id = role.department_id AND role.id = employee.role_id`;
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
            console.log('New department added!') 
            init();
        });
    })
};

const AddRole = () => {
    const depsql = 'SELECT department.name as name, department.id as id FROM department'
    connection.query(depsql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        let departmentArray = []
        res.forEach((department) => {departmentArray.push(department.name)})
        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentName',
                message: 'Which department does this new role fall under',
                choices: departmentArray
            },
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the title for this new role',
                validate: newRoleTitle => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        console.log('Please enter a name for your new department')
                        return false;
                    };
                }
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'What is the salary for this new role',
                validate: newRoleSalary => {
                    if (newRoleSalary) {
                        return true;
                    } else {
                        console.log('Please enter a name for your new department')
                        return false;
                    };
                }
            }
        ]).then((data) => {
            let departmentId = '';

            res.forEach((department) => {
                if (department.name === data.departmentName) {
                    departmentId = department.id
                };
            });

            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const roleData = [data.roleTitle, data.roleSalary, departmentId]

            connection.query(sql, roleData, (err, res) => {
                if (err) {
                    res.status(400).json({ error: err.message})
                };
                console.log('New department added!')
                init();
            });
        });
    });
};

const AddEmployee = () => {
    const depsql = 'SELECT role.title as title, role.id as id FROM role'
    connection.query(depsql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message})
        };
        let titleArray = []
        res.forEach((role) => {titleArray.push(role.title)})
        console.log(titleArray)
        inquirer.prompt([
            {
                type: 'list',
                name: 'newRole',
                message: 'What is the role of this new employee?',
                choices: titleArray
            },
            {
                type: 'input',
                name: 'firstName',
                message: 'What is this employees first name?',
                validate: newFirstNAme => {
                    if (newFirstNAme) {
                        return true;
                    } else {
                        console.log('Please enter a first name')
                        return false;
                    };
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is this employees last name?',
                validate: nnewFirstName => {
                    if (nnewFirstName) {
                        return true;
                    } else {
                        console.log('Please enter a last name')
                        return false;
                    };
                }
            }
        ]).then((data) => {
            let roleId = '';

            res.forEach((role) => {
                if (role.title === data.newRole) {
                    roleId = role.id
                };
            });

            const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
            const roleData = [data.firstName, data.lastName, roleId]

            connection.query(sql, roleData, (err, res) => {
                if (err) {
                    res.status(400).json({ error: err.message})
                };
                console.log('New employee added!')
                init();
            });
        })
    });
};

const updateEmployee = () => {
    const sql = `SELECT employee.id, role.id AS role_id FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    connection.query(sql, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message});
        };
        console.log(res)
        employeeArray=[]
        res.forEach((employee) => {employeeArray.push(employee.id)});
        console.log(employeeArray)

        const sql = `SELECT role.id, role.title FROM role`
        connection.query(sql, (err, res) => {
            if (err) {
                res.status(400).json({ error: err.message});
            };
            let roleArray = [];
            res.forEach((role) => {roleArray.push(role.title)});

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'What is the id of the employee you wish to change?',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'What role would you like them to switch to?',
                    choices: roleArray
                }
            ]).then((data) => {
                var newTitleId = '';
                
                res.forEach((role) => {
                    if (data.newRole === role.title) {
                        newTitleId = role.id;
                    }});
                
                const sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
                const updateData = [newTitleId, data.employee];
                connection.query(sql, updateData, (err, res) => {
                    if (err) {
                        res.status(400).json({ error: err.message})
                    };
                    console.log('employee updated');
                    init();
                });
                

            });
            

        });
    });
}

init();