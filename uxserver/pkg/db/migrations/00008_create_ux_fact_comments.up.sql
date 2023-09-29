-- +migrate Up
CREATE TABLE ux_fact_comments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    reference_id BIGINT NOT NULL,
    reference_type ENUM('showcase', 'project'),
    user_id BIGINT NOT NULL,
    comment TEXT,
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        