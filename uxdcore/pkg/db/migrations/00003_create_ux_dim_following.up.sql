-- +migrate Up
CREATE TABLE ux_dim_following (
    following_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    started_following_on TIMESTAMP NOT NULL,
    FOREIGN KEY (following_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)
);
        