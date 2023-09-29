import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the path to the migrations directory
BASE_DIR = os.path.join(script_dir, 'migrations/')

if not os.path.exists(BASE_DIR):
    os.makedirs(BASE_DIR)

def create_migration_file(seq, table_name, operation, content):
    filename = f"{BASE_DIR}{seq:05}_create_{table_name}.{operation}.sql"
    with open(filename, 'w') as f:
        f.write(content)

migrations = [
    {
        "table_name": "ux_dim_users",
        "up": """-- +migrate Up
CREATE TABLE ux_dim_users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(512) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    bio TEXT,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_users;"
    },
    {
        "table_name": "ux_dim_followers",
        "up": """-- +migrate Up
CREATE TABLE ux_dim_followers (
    follower_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    followed_on TIMESTAMP NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_followers;"
    },
    {
        "table_name": "ux_dim_following",
        "up": """-- +migrate Up
CREATE TABLE ux_dim_following (
    following_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    started_following_on TIMESTAMP NOT NULL,
    FOREIGN KEY (following_id) REFERENCES ux_dim_users(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_following;"
    },
    {
        "table_name": "ux_dim_endorsements",
        "up": """-- +migrate Up
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
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_endorsements;"
    },
   
]

# Extend the migrations list with the remaining tables
# This approach organizes tables in the order of their dependencies
migrations.extend([
    {
        "table_name": "ux_fact_showcase",
        "up": """-- +migrate Up
CREATE TABLE ux_fact_showcase (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    description TEXT,
    link VARCHAR(512),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_showcase;"
    },
    {
        "table_name": "ux_fact_projects",
        "up": """-- +migrate Up
CREATE TABLE ux_fact_projects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    project_name VARCHAR(255),
    project_description TEXT,
    link VARCHAR(512),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_projects;"
    },
    {
        "table_name": "ux_fact_media",
        "up": """-- +migrate Up
CREATE TABLE ux_fact_media (
    id BIGINT NOT NULL AUTO_INCREMENT,
    reference_id BIGINT NOT NULL,
    reference_type ENUM('showcase', 'project'),
    media_type ENUM('image', 'video', 'short_video'),
    media_link VARCHAR(512),
    media_caption TEXT,
    PRIMARY KEY(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_media;"
    },
    {
        "table_name": "ux_fact_comments",
        "up": """-- +migrate Up
CREATE TABLE ux_fact_comments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    reference_id BIGINT NOT NULL,
    reference_type ENUM('showcase', 'project'),
    user_id BIGINT NOT NULL,
    comment TEXT,
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_comments;"
    },
    {
        "table_name": "ux_fact_reactions",
        "up": """-- +migrate Up
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
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_reactions;"
    },
    {
        "table_name": "ux_fact_showcase_shares",
        "up": """-- +migrate Up
CREATE TABLE ux_fact_showcase_shares (
    id BIGINT NOT NULL AUTO_INCREMENT,
    showcase_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    shared_to_platform ENUM('facebook', 'twitter', 'linkedin', 'others'),
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (showcase_id) REFERENCES ux_fact_showcase(id),
    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),
    PRIMARY KEY(id)
);
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_showcase_shares;"
    },
    {
        "table_name": "ux_dim_vouches",
        "up": """-- +migrate Up
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
        """,
        "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_vouches;"
    }

])

# Generate the migration files
for idx, migration in enumerate(migrations, start=1):
    create_migration_file(idx, migration['table_name'], 'up', migration['up'])
    create_migration_file(idx, migration['table_name'], 'down', migration['down'])

print("Migration files created!")