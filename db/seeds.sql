INSERT INTO department(name)
VALUES("Managment"), ("Engineering"), ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES("Upper Managment", 120000, 1), ("Lower Managment", 100000, 1), ("Mechanical", 85000, 2), ("Aerospace", 90000, 2), ("Marketing", 70000, 3), ("Data analitic", 70000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Sarah", "Smith", 1, NULL), ("Josh", "Jones", 2, 1), ("Caleb", "Clark", 3, 2), ("Becca", "Bloombirg", 4, 2), ("Masson", "Mathews", 5, 3), ("Ben", "Bloombirg", 6, 4);