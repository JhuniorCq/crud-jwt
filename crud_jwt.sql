DROP DATABASE IF EXISTS crud_jwt;

CREATE DATABASE crud_jwt;

USE crud_jwt;

CREATE TABLE user (
	id CHAR(36) PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

SELECT * FROM user;

CREATE TABLE task (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO task (title, description) VALUES ("Tarea 3", "Realizar la tarea número 3.");

SELECT * FROM task;

SELECT * FROM user;

