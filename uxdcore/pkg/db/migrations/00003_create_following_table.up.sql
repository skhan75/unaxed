-- +migrate Up
CREATE TABLE user_following (
    user_id BIGINT NOT NULL,
    following_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (following_id) REFERENCES users(id),
    PRIMARY KEY(user_id, following_id)
);