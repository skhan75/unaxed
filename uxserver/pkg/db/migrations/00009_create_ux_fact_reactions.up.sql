-- +migrate Up
CREATE TABLE ux_fact_reactions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    reference_id BIGINT NOT NULL,
    reference_type ENUM('showcase', 'project'),
    user_id BIGINT NOT NULL,
    reaction_type ENUM('like', 'love', 'wow', 'haha', 'sad', 'angry'),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        