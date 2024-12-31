DROP DATABASE IF EXISTS crud_jwt;

CREATE DATABASE crud_jwt;

USE crud_jwt;

CREATE TABLE user (
	id CHAR(36) PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE task (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_user CHAR(36) NOT NULL
);

ALTER TABLE task
ADD CONSTRAINT fk_task_id_user
FOREIGN KEY (id_user) REFERENCES user(id);

INSERT INTO task (title, description, id_user) VALUES ("Tarea 3", "Realizar la tarea número 3.", "f9a5e880-ebe9-4e84-ba29-3518854b928c");

SELECT * FROM task;

SELECT * FROM user;
