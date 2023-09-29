-- +migrate Up
CREATE TABLE ux_dim_endorsements (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    endorsed_by_user_id BIGINT NOT NULL,
    skill VARCHAR(255),
    endorsement_note TEXT,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (endorsed_by_user_id) REFERENCES ux_dim_users(id)
);
        