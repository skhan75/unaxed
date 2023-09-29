-- +migrate Up
CREATE TABLE ux_dim_vouches (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    vouched_by_user_id BIGINT NOT NULL,
    vouch_note TEXT,
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (vouched_by_user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        