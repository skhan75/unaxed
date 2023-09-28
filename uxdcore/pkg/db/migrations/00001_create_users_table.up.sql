-- +migrate Up
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(512) NOT NULL, -- This should store the hashed and salted password
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) DEFAULT NULL, -- This is optional
    last_name VARCHAR(255) NOT NULL,
    bio TEXT DEFAULT NULL, -- This is optional
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);


