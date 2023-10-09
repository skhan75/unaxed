-- +migrate Up
CREATE TABLE ux_fact_showcase (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_url VARCHAR(512),
    tags VARCHAR(255),
    likes INT DEFAULT 0,
    views INT DEFAULT 0,
    comments INT DEFAULT 0,
    privacy ENUM('public', 'private', 'friends_only') DEFAULT 'public',
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    INDEX idx_privacy (privacy) --  queries that involve filtering or searching based on the Privacy
);

-- Create the 'ux_fact_showcase_sneak_peek_users' table to store users with sneak peek access
CREATE TABLE ux_fact_showcase_sneak_peek_users (
    showcase_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (showcase_id) REFERENCES ux_fact_showcase(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)
);

-- Create the 'ux_fact_showcase_private_users' table to store users with private access
CREATE TABLE ux_fact_showcase_private_users (
    showcase_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (showcase_id) REFERENCES ux_fact_showcase(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)
);