-- +migrate Up
CREATE TABLE user_followers (
    user_id BIGINT NOT NULL,
    follower_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id),
    PRIMARY KEY(user_id, follower_id)
);