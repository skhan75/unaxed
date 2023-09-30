-- +migrate Up
CREATE TABLE ux_fact_showcase_shares (
    id BIGINT NOT NULL AUTO_INCREMENT,
    showcase_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    shared_to_platform ENUM('facebook', 'twitter', 'linkedin', 'others'),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (showcase_id) REFERENCES ux_fact_showcase(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);