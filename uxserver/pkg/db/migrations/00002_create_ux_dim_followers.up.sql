-- +migrate Up
CREATE TABLE ux_dim_followers (
    follower_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    followed_on TIMESTAMP NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)
);