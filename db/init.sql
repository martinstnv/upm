CREATE TABLE users (username VARCHAR (20) PRIMARY KEY NOT NULL, password VARCHAR (60) NOT NULL);
INSERT INTO users (username, password) VALUES ('admin', '$2a$12$jjU20KuWJ1UITSihWQ0Kwew09gyqvueUfXGwb6rSplQAJSUCZu2vu');

CREATE TABLE types (name VARCHAR (20) PRIMARY KEY NOT NULL, properties json NOT NULL);
INSERT INTO types (name, properties) values ('note', '{ "description": {"type":"string", "title":"Description"}} ');
INSERT INTO types (name, properties) values ('login', '{ "username": {"type":"string", "title":"Username"}, "password": {"type":"string", "title":"Password"}} ');

CREATE TABLE items (id SERIAL PRIMARY KEY, name VARCHAR (20) NOT NULL, type VARCHAR (20) NOT NULL, content json NOT NULL);
INSERT INTO items (name, type, content) values ('My note', 'note', '{ "description": "This is my first note!"} ');
INSERT INTO items (name, type, content) values ('My login', 'login', '{ "username": "admin", "password": "admin"} ');
