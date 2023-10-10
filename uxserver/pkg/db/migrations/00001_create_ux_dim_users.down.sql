-- +migrate Down
-- Drop the user_profiles table first
DROP TABLE IF EXISTS ux_dim_user_profiles;

-- Then drop the users table
DROP TABLE IF EXISTS ux_dim_users;