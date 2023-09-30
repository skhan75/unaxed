-- +migrate Up
CREATE TABLE ux_fact_projects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    project_name VARCHAR(255),
    project_description TEXT,
    link VARCHAR(512),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);