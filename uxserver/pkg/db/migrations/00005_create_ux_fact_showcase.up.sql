-- +migrate Up
CREATE TABLE ux_fact_showcase (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    description TEXT,
    link VARCHAR(512),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        