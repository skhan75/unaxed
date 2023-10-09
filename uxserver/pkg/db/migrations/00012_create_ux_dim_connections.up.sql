-- +migrate Up
CREATE TABLE ux_dim_connections (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    target_id BIGINT NOT NULL,
    connection_type VARCHAR(255) NOT NULL,
    connected_at TIMESTAMP NOT NULL,
    status VARCHAR(255) NOT NULL,
    last_interaction TIMESTAMP NOT NULL,
    message_count INT NOT NULL,
    connection_notes TEXT,
    connection_settings JSON, -- Use appropriate data type for JSON in your database
    connection_strength INT NOT NULL,
    connection_visibility VARCHAR(255) NOT NULL,
    connection_end_reason VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (target_id) REFERENCES ux_dim_users(id)
);
