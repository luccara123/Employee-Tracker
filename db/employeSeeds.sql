USE employees_db;

INSERT INTO department (name)
VALUES ("Finance"), ("Marketing"), ("Human Resource"), ("IT");


INSERT INTO role (title, salary, department_id)
VALUES ('Finance Manager', 82000.00, 1),
('Accountant', 55000.00, 1),
('Social Media Manager', 45000.00, 2),
('Marketing Specialist', 50000.00, 2),
('Human Resources Assistant', 30000.00, 3),
('Human Resources Manager', 42000.00, 3);
('Full Stack Developer', 85000.00, 4);
('Junior Front-end Developer', 60000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Peter', 'Silva', 1, NULL),
('John', 'Bravo', 2, 1),
('Lindsey', 'Holland', 3, NULL),
('Daniel', 'Santos', 4, 3),
('Angely', 'Alves', 5, 6),
('Robert', 'Junior', 6, NULL),
('Iris', 'Petrix', 7, NULL),
('Lucas', 'Souza', 8, 7),

