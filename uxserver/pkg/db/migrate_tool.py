import os
import argparse

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

def create_migrations():
    # All your migration data is here
    migrations = [
        {
            "table_name": "ux_dim_users",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_dim_users (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    username VARCHAR(255) NOT NULL UNIQUE,\n"
                "    password VARCHAR(512) NOT NULL,\n"
                "    email VARCHAR(255) NOT NULL UNIQUE,\n"
                "    first_name VARCHAR(255) NOT NULL,\n"
                "    middle_name VARCHAR(255),\n"
                "    last_name VARCHAR(255) NOT NULL,\n"
                "    bio TEXT,\n"
                "    city VARCHAR(255) NOT NULL,\n"
                "    country VARCHAR(255) NOT NULL,\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_users;"
        },
        {
            "table_name": "ux_dim_followers",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_dim_followers (\n"
                "    follower_id BIGINT NOT NULL,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    followed_on TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (follower_id) REFERENCES ux_dim_users(id),\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_followers;"
        },
        {
            "table_name": "ux_dim_following",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_dim_following (\n"
                "    following_id BIGINT NOT NULL,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    started_following_on TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (following_id) REFERENCES ux_dim_users(id),\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_following;"
        },
        {
            "table_name": "ux_dim_endorsements",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_dim_endorsements (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    endorsed_by_user_id BIGINT NOT NULL,\n"
                "    skill VARCHAR(255),\n"
                "    endorsement_note TEXT,\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    PRIMARY KEY(id),\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    FOREIGN KEY (endorsed_by_user_id) REFERENCES ux_dim_users(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_endorsements;"
        },
    ]

    # Extend the migrations list with the remaining tables
    # This approach organizes tables in the order of their dependencies
    migrations.extend([
        {
            "table_name": "ux_fact_showcase",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_fact_showcase (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    description TEXT,\n"
                "    link VARCHAR(512),\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_showcase;"
        },
        {
            "table_name": "ux_fact_projects",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_fact_projects (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    project_name VARCHAR(255),\n"
                "    project_description TEXT,\n"
                "    link VARCHAR(512),\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_projects;"
        },
        {
            "table_name": "ux_fact_media",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_fact_media (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    reference_id BIGINT NOT NULL,\n"
                "    reference_type ENUM('showcase', 'project'),\n"
                "    media_type ENUM('image', 'video', 'short_video'),\n"
                "    media_link VARCHAR(512),\n"
                "    media_caption TEXT,\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_media;"
        },
        {
            "table_name": "ux_fact_comments",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_fact_comments (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    reference_id BIGINT NOT NULL,\n"
                "    reference_type ENUM('showcase', 'project'),\n"
                "    user_id BIGINT NOT NULL,\n"
                "    comment TEXT,\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_comments;"
        },
        {
            "table_name": "ux_fact_reactions",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_fact_reactions (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    reference_id BIGINT NOT NULL,\n"
                "    reference_type ENUM('showcase', 'project'),\n"
                "    user_id BIGINT NOT NULL,\n"
                "    reaction_type ENUM('like', 'love', 'wow', 'haha', 'sad', 'angry'),\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_reactions;"
        },
        {
            "table_name": "ux_fact_showcase_shares",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_fact_showcase_shares (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    showcase_id BIGINT NOT NULL,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    shared_to_platform ENUM('facebook', 'twitter', 'linkedin', 'others'),\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (showcase_id) REFERENCES ux_fact_showcase(id),\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_fact_showcase_shares;"
        },
        {
            "table_name": "ux_dim_vouches",
            "up": "-- +migrate Up\n"
                "CREATE TABLE ux_dim_vouches (\n"
                "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                "    user_id BIGINT NOT NULL,\n"
                "    vouched_by_user_id BIGINT NOT NULL,\n"
                "    vouch_note TEXT,\n"
                "    timestamp TIMESTAMP NOT NULL,\n"
                "    FOREIGN KEY (user_id) REFERENCES ux_dim_users(id),\n"
                "    FOREIGN KEY (vouched_by_user_id) REFERENCES ux_dim_users(id),\n"
                "    PRIMARY KEY(id)\n"
                ");",
            "down": "-- +migrate Down\nDROP TABLE IF EXISTS ux_dim_vouches;"
        }
    ])

    # Generate the migration files
    for idx, migration in enumerate(migrations, start=1):
        create_migration_file(idx, migration['table_name'], 'up', migration['up'])
        create_migration_file(idx, migration['table_name'], 'down', migration['down'])

    print("Migration files created!")

def update_migrations():
    # You'd put code here to handle updating existing migrations. This could be more complex.
    print("Update migrations not implemented yet!")

def delete_migrations():
    # CAUTION: This will delete all migration files!
    for file in os.listdir(BASE_DIR):
        os.remove(os.path.join(BASE_DIR, file))
    print("All migration files deleted!")

def modify_migrations():
    # Code to modify existing migrations. This might involve reading, altering, and writing files.
    print("Modify migrations not implemented yet!")

def main():
    parser = argparse.ArgumentParser(description='Database Migration CLI')
    parser.add_argument('action', type=str, choices=['create', 'update', 'delete', 'modify'],
                        help='Action to perform on migrations.')

    args = parser.parse_args()

    if args.action == 'create':
        create_migrations()
    elif args.action == 'update':
        update_migrations()
    elif args.action == 'delete':
        delete_migrations()
    elif args.action == 'modify':
        modify_migrations()

if __name__ == '__main__':
    main()
