package database

import (
	"database/sql"
	"fmt"
	"os"
	"time"
	"unaxed-server/pkg/secrets"
	"unaxed-server/utils"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	DB *sql.DB
}

// db singleton
var dbInstance *Database

func GetConnection(dsn string) (*Database, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(5 * time.Minute)

	return &Database{DB: db}, nil
}

func GetDB() (*Database, error) {
	if dbInstance != nil {
		return dbInstance, nil
	}

	dsn, err := GetDBDataSourceName()
	if err != nil {
		return nil, err
	}

	dbInstance, err = GetConnection(dsn)
	if err != nil {
		return nil, err
	}

	return dbInstance, nil
}

func GetDBDataSourceName() (string, error) {
	var username, password string

	// Check for localhost environment
	env := os.Getenv("UNAXED_ENV")
	if env == "localhost" || env == "local" {
		// Use local DB credentials from environment variables
		username = os.Getenv("UNAXED_DB_USERNAME")
		password = os.Getenv("UNAXED_DB_PASSWORD")

		if username == "" || password == "" {
			return "", fmt.Errorf("local DB credentials not found in environment variables")
		}

	} else {
		// Load secrets configuration to get the path for DB credentials
		secretsConfig, err := utils.LoadSecretsConfig()
		if err != nil {
			return "", fmt.Errorf("failed to load secrets config: %s", err)
		}

		// Fetch credentials and configurations from secrets manager
		dbCredentials, err := secrets.GetDBCredentials(secretsConfig.DBCredentialsPath)
		if err != nil {
			return "", fmt.Errorf("failed to get DB secrets: %s", err)
		}

		username = dbCredentials.Username
		password = dbCredentials.Password
	}

	// Load DB configuration to get host, port, etc. (common for both localhost and production)
	dbConfig, err := utils.LoadDBConfig()
	if err != nil {
		return "", fmt.Errorf("failed to load DB config: %s", err)
	}

	return BuildDBURL(username, password, dbConfig.Host, dbConfig.Port, dbConfig.Name), nil
}

// func GetDBConnection(dsn string) (*sql.DB, error) {
// 	db, err := sql.Open("mysql", dsn)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if err := db.Ping(); err != nil {
// 		return nil, err
// 	}

// 	return db, nil
// }

func BuildDBURL(username, password, host string, port int, dbName string) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s",
		username, password, host, port, dbName)
}
