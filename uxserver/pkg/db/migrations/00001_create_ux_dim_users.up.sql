-- +migrate Up
CREATE TABLE ux_dim_users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(512) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE ux_dim_user_profiles (
    user_id BIGINT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    bio TEXT,
    city VARCHAR(255),
    country VARCHAR(255),
    PRIMARY KEY(user_id), 
    FOREIGN KEY(user_id) REFERENCES ux_dim_users(id) ON DELETE CASCADE -- Having ON DELETE CASCADE on the user_id foreign key means that if a user from the users table is deleted, their associated profile in the user_profiles table will also be automatically deleted, which is a good measure to maintain consistency.
);