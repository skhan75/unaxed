-- +migrate Down

-- Drop the 'ux_fact_showcase_sneak_peek_users' table
DROP TABLE IF EXISTS ux_fact_showcase_sneak_peek_users;

-- Drop the 'ux_fact_showcase_private_users' table
DROP TABLE IF EXISTS ux_fact_showcase_private_users;

-- Drop the 'ux_fact_showcase' table
DROP TABLE IF EXISTS ux_fact_showcase;